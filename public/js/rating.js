'use strict';
const url = new URL(location.href);
var pathArray = String(url.pathname).split('/');

// fetch user's comment at course page
$.post(`/courses/${pathArray[2]}/${pathArray[3]}/find`)
  .done( (datas)=>{
    if(datas.data.length){
      /*$('#leaveRating').attr('data-bs-target','#editModal');
      $('#leaveRating').attr('name','editComment');
      $('#leaveRating').attr('href',`/courses/${pathArray[2]}/${pathArray[3]}`);*/
      $('#leaveRating').text("我已評分")
      .attr('disabled', true);
    }
    else{
      $('#leaveRating').attr('data-bs-target', '#myModal');
      $('#leaveRating').text("我要評分");
    }
  })
  .fail( ()=>{
    $('#leaveRating').attr('onclick','location.href="/auth/login"');
  });


// $('#deleteComment').click(()=>{
//   Swal.fire({
//     title: '確定要刪除？',
//     confirmButtonText: `是`,
//     showCancelButton: true,
//     cancelButtonText: '取消'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       $.post(`/courses/${pathArray[2]}/${pathArray[3]}/delete`/*,{userID: $('#userID').val()}*/)
//         .done(()=>{
//           Swal.fire({
//             title:'已刪除！',
//             icon: 'success',
//             showConfirmButton: false,
//             timer: 2000
//           }).then(()=>{
//             location.reload();
//           });
//         })
//       .fail(()=>{
//         Swal.fire('錯誤','請稍候再試','error');
//       });
//     }
//   })
// });

// $('#editModal').on('shown.bs.modal',()=>{
//   $.post(`/courses/${pathArray[2]}/${pathArray[3]}/find`/*,{userID: $('#userID').val()}*/) // post with userID is abandoned
//     .done((datas)=>{
//       //console.log(datas);console.log(datas.data[0]);
//       $(`select[name="name"] > option[value=${datas.data[0].name}]`).attr('selected',true);;
//       $(`input[name="作業量"][value=${datas.data[0].rateHomework}]`).attr('checked',true);
//       $(`input[name="豐富度"][value=${datas.data[0].rateLearning}]`).attr('checked',true);
//       $(`input[name="推薦度"][value=${datas.data[0].rateRecommendation}]`).attr('checked',true);
//       $('#commentText').val(datas.data[0].content);
//     })
//     .fail(()=>{
//       console.log("資料獲取失敗，採用空白編輯模式。");
//     });
// })

$('#myModal').on('shown.bs.modal',()=>{
    $('#newForm').attr('action',`/courses/${pathArray[2]}/${pathArray[3]}`);
})

$('button[name="editComment"]').click((event)=>{
  let link = $(event.target).attr('href');
  $.post(`${link}/find`/*,{userID: $('#userID').val()}*/) // post with userID is abandoned
    .done((datas) => {
      console.log(datas);console.log(datas.data[0]);
      $('#editForm').attr('action',`${link}/edit`);
      $(`select[name="name"] > option[value=${datas.data[0].name}]`).attr('selected', true);
      $(`input[name="作業量"][value=${datas.data[0].rateHomework}]`).attr('checked', true);
      $(`input[name="豐富度"][value=${datas.data[0].rateLearning}]`).attr('checked', true);
      $(`input[name="推薦度"][value=${datas.data[0].rateRecommendation}]`).attr('checked', true);
      $('#commentText').val(datas.data[0].content);
    })
    .fail(() => {
      console.log("資料獲取失敗，採用空白編輯模式。");
      Swal.fire('錯誤', '資料獲取失敗，請稍候再試', 'error');
    });
});

$('button[name="deleteComment"]').click((event) => {
  let link = $(event.target).attr('href');
  console.log(link);
  Swal.fire({
    title: '確定要刪除？',
    confirmButtonText: `是`,
    showCancelButton: true,
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      $.post( link/*,{userID: $('#userID').val()}*/)
        .done(() => {
          Swal.fire({
            title: '已刪除！',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            location.reload();
          });
        })
        .fail(() => {
          Swal.fire('錯誤', '請稍候再試', 'error');
        });
    }
  });
});
