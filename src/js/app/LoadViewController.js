import TD from './module/TD.js';
import Config from './Config.js';

// 项目初始化的一些函数
var initProject = function () {
    // cnzz统计代码 强制HTTPS，防劫持
    (function () {
        var cnzzID = Config.defShare.cnzz;
        document.write(unescape('%3Cspan id="cnzz_stat_icon_' + cnzzID + '"%3E%3C/span%3E%3Cscript src="' + 'https://s4.cnzz.com/z_stat.php%3Fid%3D' + cnzzID + '" type="text/javascript"%3E%3C/script%3E'));
        $('#cnzz_stat_icon_' + cnzzID).hide();
    })();

    // 初始化微信接口
    TD.initWxApi(Config.defShare);

    // 阻止微信下拉；原生js绑定覆盖zepto的默认绑定
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, {passive: false});
};

// 加载页对象
var LoadViewController = function () {
    console.log('loadview');
    // 公共变量
    var _that = this;

    // 私有变量
    var _private = {};

    _private.pageEl = $('.m-loading');

    _private.isInit = false;

    var videoBox = _private.pageEl.find('.video-box');
    var video = videoBox.find('.loading-video').get(0);
    var videoMute = _private.pageEl.find('.video-mute');

    // 初始化，包括整体页面
    _private.init = function () {
        if (_private.isInit === true) {
            return;
        }
        initProject();
        console.log('loading-init');
        // let ratio = window.innerHeight / 1600;
        // $('.loading_fire').css('transform', 'scale(' + ratio + ')');
        // $('.loading_fire').css('webkitTransform', 'scale(' + ratio + ')');
        // let fireSprite = new Image();
        // fireSprite.src = require('../../img/css_sprites_350.png');
        // fireSprite.onload = () => {
        //     $('.loading_fire').addClass('light');
        // };

        // 加载体现在页面上
        _private.processLineEl = _private.pageEl.find('.loadProcess');
        _private.btn = _private.pageEl.find('.m-loading-btn');

        _private.gload = new Config.Preload(Config.pageImgs);
        _private.gload.onloading = function (p) {
            console.log(p);
            _private.processLineEl.text(p + '%');
        };
        _private.videoClickFn = (e) => {
            // 按钮动画
            _private.btn.addClass('animation-click');

            _private.pageEl.find('.loadingProcess').fadeOut();
            _private.btn.fadeOut();
            _private.pageEl.find('.m-loading-circle').fadeIn();

            video.play();
            video.addEventListener('timeupdate', _private.currentFn);
            _private.pageEl.off('click', _private.videoClickFn);
            TD.push('用户操作', '点击开始按钮', '播放视频');
        };
        _private.currentFn = (e) => {
            video.muted = true;
            console.log(video.currentTime);
            if (video.currentTime > 0.3) {
                video.currentTime = 0;
                video.muted = false;
                video.removeEventListener('timeupdate', _private.currentFn);
                videoBox.fadeIn();
            };
        };

        _private.gload.onload = function () {
            _private.processLineEl.fadeOut();
            _private.btn.fadeIn();

            setTimeout(() => {
                _private.pageEl.find('.loading_text').fadeIn();
            }, 300);

            _private.btn.on('click', _private.videoClickFn);
            // _that.hide();
        };

        _private.gload.onfail = function (msg) {
            console.log(msg);
        };

        videoMute.on('click', () => {
            if (videoMute.hasClass('muted')) {
                videoMute.removeClass('muted');
                TD.push('用户操作', '点击静音按钮', '播放');
                video.muted = false;
                // document.querySelector('audio').muted = false;
            } else {
                TD.push('用户操作', '点击静音按钮', '静音');
                videoMute.addClass('muted');
                video.muted = true;
                // document.querySelector('audio').muted = true;
            }
        });

        _private.pageEl.find('.video-skip').on('click', () => {
            video.pause();
            TD.push('用户操作', '点击跳过按钮', '跳过视频');
            _that.hide();
        });

        video.addEventListener('ended', () => {
            _that.hide();
        });
        _private.isInit = true;
    };

    // 显示
    _that.show = function () {
        _private.pageEl.fadeIn();
        // var timeFn = () => {
        //     // videoBox.fadeIn();
        //     video.removeEventListener('timeupdate', timeFn);
        // };
        // video.addEventListener('timeupdate', timeFn);
    };

    // 隐藏
    _that.hide = function () {
        _that.onhide && _that.onhide();
        _private.pageEl.fadeOut();
    };

    // 执行加载
    _that.load = function () {
        _private.gload.load();
    };

/* 此代码解决横竖屏切换时iso上触发多次的bug
    var rotateELSize = function (e) {
        var winWidth = document.documentElement.clientWidth;
        var winHeight = document.documentElement.clientHeight;

        if (e && winWidth / winHeight < 1.2 && winWidth / winHeight > 0.8) {
            return false;
        }

        // do something

        window.addEventListener('resize', rotateELSize);
    };
*/
    _private.init();
};

module.exports = LoadViewController;
