'use strict';
$.get(location.href + '/json')
    .done((datas) => {
        let ratings = datas.rating[0];
        //console.log(datas.rating[0]);
        for (const [key, val] of Object.entries(ratings)) {
            //console.log(key, val);
            if (val) {
                var circle = new ProgressBar.Circle(`#${key}`, {
                    strokeWidth: 5,
                    color: (key == 'homework') ? '#787878' : '#ed6a5a',
                    duration: 1500,
                    easing: 'easeInOut',
                    trailColor: '#ddd',
                    trailWidth: 1.5,
                    step: function(state, circle) { // 繪製圓圈時變動數字
                        let value = circle.value() * 5;
                        if (value === 0) {
                            circle.setText('');
                        } else {
                            circle.setText(value.toFixed(1));
                        }

                    }
                });
                let progress = val / 5;
                circle.text.style.color = '#000';
                //circle.text.style.fontSize = '2em';
                circle.animate(progress);
            }
        }

    });