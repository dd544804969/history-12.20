import TD from './module/TD';
import Config from './Config';
// 加载页对象
var IndexViewController = function () {
    // 公共变量
    var _that = this;

    // 私有变量
    var _private = {};

    _private.pageEl = $('.m-index');
    _private.isInit = false;
    // 接口
    // 历史研究院接口
    _private.getPeopleNum = function () {
        TD.ajax({
            type: 'POST',
            url: '/v2/log/ping',
            data: {
                // k: 'lsyjySuppoort',
                k: 'test',
                r: 0
            }
        }, (data) => {
            _private.peopleNum = data;
            console.log('data', data);
            _private.pageEl.find('.bill-tip').fadeIn();
            _private.buildImage(_private.peopleNum);
        }, (data) => {
            _private.getPeopleNum();
        });
    };
    // 历史canvas
    _private.imageFlag = false;
    _private.imgBill = new Image();
    _private.imgBill2 = new Image();
    _private.buildImage = (num) => {
        if (_private.imageFlag) {
            document.querySelector('.bill-box').appendChild(_private.imgCanvasShow);
        }
        // 小海报
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var imgBg = Preload.buffer.imgs['share-bill'];
        var imgLeft = Preload.buffer.imgs['share-left'];
        var imgRight = Preload.buffer.imgs['share-right'];

        canvas.width = 822;
        canvas.height = 386;
        var shareImgData;
        var len = num.toString().length;
        setTimeout(() => {
            // 生成展示海报；
            ctx.drawImage(imgBg, 0, 0, canvas.width, canvas.height);
            // ctx.font = 'bolder 36px Heiti';
            ctx.font = 'bolder 38px PMingLiU';
            ctx.fillStyle = 'rgb(234,109,96)';
            ctx.textAlign = 'center';
            console.log(num);
            ctx.fillText(num, 393, 133);
            ctx.drawImage(imgLeft, 393 - 11 * len - 82, 110, 82, 23);
            ctx.drawImage(imgRight, 393 + 11 * len, 110, 141, 23);

            shareImgData = canvas.toDataURL('image/png');
            _private.imgBill.src = shareImgData;
            document.querySelector('.bill-box').appendChild(_private.imgBill);
            _private.imgBill.classList.add('imgBill');
            _private.imageFlag = true;
        }, 100);

        // 大海报
        var canvas2 = document.createElement('canvas');
        var ctx2 = canvas2.getContext('2d');

        var imgBg2 = Preload.buffer.imgs['share-bill-full'];

        canvas2.width = 1600;
        canvas2.height = 750;
        var downloadImgData;
        setTimeout(() => {
            // 生成展示海报；
            ctx2.drawImage(imgBg2, 0, 0, canvas2.width, canvas2.height);
            // ctx.font = 'bolder 36px Heiti';
            ctx2.font = 'bolder 73px PMingLiU';
            ctx2.fillStyle = 'rgb(234,109,96)';
            ctx2.textAlign = 'center';
            console.log(num);
            ctx2.fillText(num, 762, 260);
            ctx2.drawImage(imgLeft, 762 - 22 * len - 165, 210, 165, 47);
            ctx2.drawImage(imgRight, 762 + 22 * len, 210, 282, 47);
            // ctx.drawImage(imgBg2, 500 - 55 * imgBg2.width / imgBg2.height, 390, 110 * imgBg2.width / imgBg2.height, 110);
            downloadImgData = canvas2.toDataURL('image/png');
            _private.imgBill2.src = downloadImgData;
            document.querySelector('.bill-box').appendChild(_private.imgBill2);
            _private.imgBill2.classList.add('imgBill2');
        }, 100);
    };

    // 初始化，包括整体页面
    _private.init = function () {
        if (_private.isInit === true) {
            return;
        }
        // var indexBox = _private.pageEl.find('.index-box');
        console.log(Config);
        _private.isInit = true;

        // 点击按钮
        var btn = _private.pageEl.find('.index-btn').get(0);
        var mask = _private.pageEl.find('.bill-mask');
        var billBox = _private.pageEl.find('.bill-box');
        _private.bindBtnEnd = function () {
            console.log('click btn');
            btn.classList.remove('toucStart');
            TD.push(Config.plat + '用户操作', '点击按钮', '生成海报');
            mask.fadeIn();
            billBox.css('display', 'block');
            billBox.addClass('animation-rise');
            // 请求
            setTimeout(() => {
                _private.getPeopleNum();
            }, 200);
            // 假装请求
            // setTimeout(() => {
            //     _private.pageEl.find('.bill-tip').fadeIn();
            //     _private.buildImage(1213123123123);
            // }, 500);
        };

        _private.bindBtnStart = function () {
            btn.classList.add('animation-click');
            console.log('touchStart');
        };
        btn.addEventListener('touchend', _private.bindBtnEnd);

        btn.addEventListener('touchstart', _private.bindBtnStart);

        // 播放音乐
        // var music = _private.pageEl.find('.music').get(0);
        // music.loop = true;
        // music.play();
        // document.addEventListener('WeixinJSBridgeReady', function () {
        //     music.play();
        // }, false);

        // console.log('play');
        // setTimeout(() => {
        //     $('.title').fadeOut();
        //     setTimeout(() => {
        //         $('.input-box').fadeIn();
        //     }, 400);
        // }, 400);
        // /** 解决微信6.7.4 ios12 软键盘收回时页面不回弹 */
        // $('input').on('blur', () => {
        //     console.log('input blur');
        //     window.scrollTo(0, 0);
        //     $('body').scrollTop(0);
        //     $('.m-wrap').css('marginTop', '0');
        //     // confirm.click();
        // });
        // $('input').on('focus', () => {
        //     console.log('input focus');

        //     $('.warn-length').fadeOut();

        //     if (TD.browser.versions.ios) {
        //         // window.scrollTo(0, -50);
        //         $('.m-wrap').css('marginTop', '-1.5rem');
        //     }
        // });
        // var balls = _private.pageEl.find('.ball');
        // var subjects = _private.pageEl.find('.subject-start');
        // var inputBox = _private.pageEl.find('.input-box');
        // var resultBox = _private.pageEl.find('.result-box');
        // var tipMsg = _private.pageEl.find('.tip-select');
        // var inputName = _private.pageEl.find('.input').get(0);
        // var confirm = _private.pageEl.find('.btn-confirm').get(0);
        // var name;
        // var line = _private.pageEl.find('.subject-name');
        // confirm.addEventListener('click', () => {
        //     TD.push(Config.plat + '用户操作', '点击确认按钮', '确定输入完成');
        //     console.log('input 1');
        //     if (inputName.value) {
        //         // 限制长度
        //         console.log('input');
        //         if (checkStrLength(inputName.value, 20)) {
        //             if (!TD.checkWord(inputName.value)) {
        //                 TD.showHideSimpleMessage('输入的昵称包含敏感词');
        //                 return;
        //             };
        //             name = inputName.value;
        //             console.log(name);
        //             inputBox.fadeOut();
        //             resultBox.fadeIn();
        //             setTimeout(() => {
        //                 tipMsg.fadeIn();
        //             }, 1200);
        //             setTimeout(() => {
        //                 line.fadeIn();
        //             }, 1300);
        //             window.scrollTo(0, 0);
        //             document.body.scrollTop = 0;
        //             console.log('blur');
        //             let ratio = window.innerHeight / 1600;
        //             for (let i = 0; i < 9; i++) {
        //                 TweenMax.from(balls[i], 1.4, {opacity: 0, x: Config.riseList2[i].x * ratio, y: Config.riseList2[i].y * ratio, scale: 0});
        //             };
        //             for (let i = 0; i < 8; i++) {
        //                 console.log(subjects[i]);
        //                 TweenMax.from(subjects[i], 0.8, {opacity: 0, x: Config.riseList[i].x * ratio, y: Config.riseList[i].y * ratio, scale: 0, ease: Power2.easeOut});
        //                 // subjects[i].classList.add('subject-animation-rise' + (i + 1));
        //                 setTimeout(() => {
        //                     addClassOpacity(i);
        //                 }, 1200);
        //             }
        //             let msg = document.querySelector('.simple-msg');
        //             msg.style.display = 'none';
        //         } else {
        //             console.log('超出长度,请重新输入');
        //             // $('.warn-length').fadeIn();
        //             TD.showHideSimpleMessage('不得超出十个字');
        //         }
        //     }
        // });
        // // 字符长度方法
        // function checkStrLength (str, limitLength) {
        //     var n = 0; // 该变量保存字符串的长度
        //     for (var i = 0; i < str.length; i++) {
        //         // 获得每个字符的Unicode值
        //         var code = str.charCodeAt(i);
        //         if (code > 255) {
        //             n = n + 2;
        //         } else {
        //             n = n + 1;
        //         }
        //     }
        //     if (n > limitLength) { // 如果字符串的长度大于限制长度，返回false
        //         return false;
        //     }
        //     return true;
        // }
        // function removeClassScale (i) {
        //     subjects[i].classList.remove('animation-scale');
        // }
        // function addClassOpacity (i) {
        //     // subjects[i].classList.remove('subject-animation-rise' + (i + 1));
        //     subjects[i].classList.add('subject-animation-opacity' + (i + 1));
        // }
        // for (let i = 0; i < 8; i++) {
        //     subjects[i].addEventListener('click', (e) => {
        //         TD.push(Config.plat + '用户操作', '点击科目', '生成' + whatSubject[i] + '海报');
        //         console.log('remove?');
        //         subjects[i].classList.add('animation-scale');
        //         setTimeout(() => {
        //             removeClassScale(i);
        //         }, 400);
        //         _private.buildCanvas(name, i);
        //         setTimeout(() => {
        //             $('.bill').fadeIn();
        //         }, 300);
        //         console.log('click subject', i, e, this);
        //     });
        // };
        // // 关闭海报
        // $('.bill-close').get(0).addEventListener('click', () => {
        //     TD.push(Config.plat + '用户操作', '点击关闭海报按钮', '关闭海报');
        //     console.log('bill close');
        //     $('.bill').fadeOut();
        //     $('.m-index').removeClass('blur');
        // });
    };
    // 显示
    _that.show = function () {
        _private.pageEl.css('display', 'block');
        // _private.pageEl.fadeIn();
    };

    // 隐藏
    _that.hide = function () {
        _that.onhide && _that.onhide();
        _private.pageEl.hide();
    };

    _private.init();
};

module.exports = IndexViewController;
