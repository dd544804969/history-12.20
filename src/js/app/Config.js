import Preload from './module/Preload.js';

var Config = {};

// ajax请求链接
Config.requireUrl = '';

// 图片路径前缀
// 如kf文件里图片不使用require时 img地址：Config.imgPath
Config.imgPath = process.env.NODE_ENV === 'handover' ? process.env.PATH : process.env.PATH + 'img/';

// 默认分享语
Config.defShare = {
    title: '以手传心，托起这簇历史的薪火',
    desc: '千古风华，泱泱华夏',
    link: location.href,
    // 分享配图
    img: 'https://qrtss.treedom.cn/history/img/share1.png',
    // 项目名，数据查询时候用
    proj: 'streetgame',
    // 填写公众号绑定的appid
    // appid: 'wx12380ea254191f1b',
    appid: 'wx045f59bcba3061c4',
    cnzz: '1278531143'
};

Config.Preload = Preload;
window.Preload = Preload;

// 预加载的图片
Config.pageImgs = {
    imgs: [
        {
            name: 'loading_bg',
            url: require('../../img/loading_bg.jpg')
        },
        {
            name: 'm-loading-btn',
            url: require('../../img/m-loading-btn.png')
        },
        {
            name: 'silence',
            url: require('../../img/silence.png')
        },
        {
            name: 'open',
            url: require('../../img/open.png')
        },
        {
            name: 'index-bg',
            url: require('../../img/index-bg.jpg')
        },
        {
            name: 'index-btn',
            url: require('../../img/index-btn.png')
        },
        {
            name: 'skip',
            url: require('../../img/skip.png')
        },
        {
            name: 'bill-box',
            url: require('../../img/bill-box.png')
        },
        {
            name: 'share-bill',
            url: require('../../img/share-bill.jpg')
        },
        {
            name: 'bill-mask',
            url: require('../../img/bill-mask.png')
        },
        {
            name: 'bill-tip',
            url: require('../../img/bill-tip.png')
        },
        {
            name: 'share-bill-full',
            url: require('../../img/share-bill-full.jpg')
        },
        {
            name: 'share-left',
            url: require('../../img/share-left.png')
        },
        {
            name: 'share-right',
            url: require('../../img/share-right.png')
        }
    ],
    sprites: [
        /*
        {
            el: $('.m-game .kf-game-video'),
            pathPrefix: Config.imgPath,
            postfix: 'jpg'
        }
        */
    ],
    keyimgs: [
        /*
        {
            el: $('.m-game .kf-game-video'),
            pathPrefix: Config.imgPath,
            postfix: 'jpg'
        }
        */
    ]
};
module.exports = Config;
