'use strict';
const url = new URL(location.href);
let params = url.searchParams;
if(!params.has("search")) params.set('search','');
if(!params.has("campus")) params.set('campus','["台北","桃園","成功","基河","金門"]');

const infiniteWrap = document.getElementById('js-infinite-wrap');
let count = 1;

function callback_infinite(entries) {
  Array.prototype.forEach.call(entries, entry => {
    if(entry.isIntersecting) {
      fetch('/courses/json?' + 'page=' + count + '&search=' + params.get('search') + `&campus=${params.get('campus')}`)
        .then(res => res.json())
        .then(res => {
          // 取消觀察，以免又觸發下一個 request
          observerInfinite.unobserve(infinite);

          if(res.length==0) observerInfinite.disconnect();

          // append html
          for(let doc of res){
            let teachers = "";
            let sessions = "";

            for(let [index, name] of Object.entries(doc.任課教師.正課)){
              sessions = `<div class="float-end">`
                            +`<span class="badge rounded-start bg-primary">${doc.上課日期_節次[index].d}</span>`
                            +`<span class="badge rounded-end bg-secondary">${doc.上課日期_節次[index].t}</span>`
                            +`</div>`;
              teachers += `<h6 class="card-subtitle mb-2">${name}${sessions}</h6>`;
            }

            if(doc.任課教師.實習.length > 0){
                for(let [index, name] of Object.entries(doc.任課教師.實習)){
                  sessions = `<div class="float-end">`
                                +`<span class="badge rounded-start bg-primary">${doc.上課日期_節次[index].d}</span>`
                                +`<span class="badge rounded-end bg-secondary">${doc.上課日期_節次[index].t}</span>`
                                +`</div>`;
                  teachers += `<h6 class="card-subtitle mb-2">${name} <small>實習</small>${sessions}</h6>`;
                }
            }


            let item = `
            <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
              <div class="card focus h-100">
                <div class="card-body">
                  <a href="/courses/${doc.任課教師.正課[0]}/${doc.科目.name}" class="stretched-link"></a>
                  <h6 class="card-subtitle mb-2 text-muted">${doc.學校.校區}</h6>
                  <div class="h5 card-title">${ doc.科目.name }</div>
                  ${teachers}
                </div>
              </div>
            </div>`;
            infiniteWrap.insertAdjacentHTML('beforebegin', item);

          }

          count++;
          observerInfinite.observe(infinite);

        })
    }
  })
}

// infinite IO option
let option_infinite = {
  root: null,
  rootMargin: '0px',
  threshold: [0]
};

// infinite create IO
let observerInfinite = new IntersectionObserver(callback_infinite, option_infinite);

// animated observe #js-infinite
const infinite = document.getElementById('js-detective');
observerInfinite.observe(infinite);
