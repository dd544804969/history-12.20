import Preload from './module/Preload.js';

var Config = {};

// ajax请求链接
Config.requireUrl = '';

// 图片路径前缀
// 如kf文件里图片不使用require时 img地址：Config.imgPath
Config.imgPath = process.env.NODE_ENV === 'handover' ? process.env.PATH : process.env.PATH + 'img/';

// 默认分享语
Config.defShare = {
    title: '你期待知识的另一种打开方式吗？',
    desc: '在抖音，见证知识创造美好',
    link: location.href,
    // 分享配图
    img: 'https://qrtss.treedom.cn/douzhikepu/img/share.jpg',
    // 项目名，数据查询时候用
    proj: 'streetgame',
    // 填写公众号绑定的appid
    // appid: 'wx12380ea254191f1b',
    appid: 'wxd9c36d6cbc5d53f3',
    cnzz: '1278291595'
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

Config.riseList = [{
    // jianzhu
    x: 280,
    y: 442
},
{
    x: -320,
    y: 442
},
{
    x: 140,
    y: 332
},
{
    x: -170,
    y: 272
},
{
    x: 310,
    y: 92
},
{
    x: -288,
    y: 99
},
{
    x: 240,
    y: -258
},
{
    x: -180,
    y: -188
}
];
Config.riseList2 = [{
    // ball1
    x: -100,
    y: 372
},
{
    x: -470,
    y: 212
},
{
    x: 110,
    y: -670
},
{
    x: -240,
    y: -468
},
{
    x: 460,
    y: 472
},
{
    x: 370,
    y: -488
},
{
    x: -350,
    y: -628
},
{
    x: 210,
    y: -888
},
{
    x: -200,
    y: 712
}
];
module.exports = Config;
