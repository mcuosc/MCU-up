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
          let courseType = ["通識", "必修", "選修", "教育"];
          for(let doc of res){
            let teachers = {main:"", sub:""};
            let sessions = "";

            for(let [index, teacher] of Object.entries(doc.teacher_list)){
              if (teacher.teacher_type === "main")
                teachers.main += `${teachers.main==="" ? '':'、'}${teacher.teacher_name}`;
              else if (teacher.teacher_type === "sub")
                teachers.sub += `${teachers.sub==="" ? '':'、'}${teacher.teacher_name}`;
            }

          if(teachers.sub!=="") teachers.sub += "<small> 實習</small> ";

            let item = `
            <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
              <div class="card focus h-100">
                <div class="card-body">
                  <a href="/courses/${doc.teacher_list[0].teacher_name}/${doc.course_name}" class="stretched-link"></a>
                  <div class="h5 card-title overflow-auto">
                    ${ doc.course_name }
                    <div class="float-end">
                      <span class="badge bg-secondary rounded-start">${doc.campus}</span>
                      <span class="badge bg-primary rounded-end">${courseType[doc.course_type]}</span>
                    </div>
                  </div>
                  <h6 class="card-subtitle mb-2">${teachers.main}</h6>
                  <h6 class="card-subtitle">${teachers.sub}</h6>
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
