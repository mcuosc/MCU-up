'use strict';
const url = new URL(location.href);
let params = url.searchParams;
if(!params.has("search")) params.set('search','');

const infiniteWrap = document.getElementById('js-infinite-wrap');
let count = 1;

function callback_infinite(entries) {
  Array.prototype.forEach.call(entries, entry => {
    if(entry.isIntersecting) {
      fetch('/courses/json?' + 'page=' + count + '&search=' + params.get('search'))
        .then(res => res.json())
        .then(res => {
          // 取消觀察，以免又觸發下一個 request
          observerInfinite.unobserve(infinite);

          if(res.length==0) observerInfinite.disconnect();

          // append html
          for(let doc of res){
            let teachers = "";
            for(let name of doc.任課教師){
              teachers += `<h6 class="card-subtitle mb-2">${name}</h6>`;
            }

            let sessions = "";
            for(let cell of doc.上課日期_節次){
              sessions += `<span class="badge bg-primary">${cell.d}</span>`
                          +`<span class="badge bg-secondary">${cell.t}</span>`;
            }

            let item = `
            <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
              <div class="card focus">
                <div class="card-body">
                  <a href="/courses/${doc.任課教師[0]}/${doc.科目.name}" class="stretched-link"></a>
                  <div class="h5 card-title">${ doc.科目.name }</div>
                  ${teachers}
                  ${sessions}
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
