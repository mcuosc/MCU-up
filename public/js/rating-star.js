/*$(document).on({
    mouseover: function(event) {
        $(this).find('.far').addClass('fas');
            $(this).prevAll().find('.far').addClass('fas');
    },
    mouseleave: function(event) {
        $(this).find('.far').removeClass('fas');
        $(this).prevAll().find('.far').removeClass('fas');

    }
},
'.rate');
*/

$(document).on('click', '.rate', function() {
    if (!$(this).find('.star').hasClass('rate-active')) {
        $(this).siblings().find('.star').addClass('far').removeClass('fas rate-active');
        $(this).find('.star').addClass('rate-active fas').removeClass('far star-over');
        $(this).prevAll().find('.star').addClass('fas').removeClass('far star-over');
    } else {
        // console.log('has');
    }
});


/*function submit(){
    // for(ele in $('#q1'))
    let q1cnt=0,q2cnt=0,q3cnt=0;
    for(var i=0;i<5;i++){
        var q1arr = $('#q1 label i')[i].className.split(/\s+/)
        var q2arr = $('#q2 label i')[i].className.split(/\s+/)
        var q3arr = $('#q3 label i')[i].className.split(/\s+/)
        if(q1arr.find(element => (element === "fas")))
            q1cnt++;
        if(q2arr.find(element => (element === "fas")))
            q2cnt++;
            if(q3arr.find(element => (element === "fas")))
            q3cnt++;
    }
    console.log('評分1 = ',q1cnt,'  評分2 = ',q2cnt,'  評分3 = ',q3cnt);
}*/
