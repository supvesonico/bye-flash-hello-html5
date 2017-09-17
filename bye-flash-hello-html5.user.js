// ==UserScript==
// @name        bye-flash-hello-html5 | 再见flash 你好html5
// @namespace   https://greasyfork.org/en/users/131965-levinit
// @author      levinit
// @description 国内主流视频网站的HTML5播放
// @include     *://*.le.com/*
// @include     *://*.iqiyi.com/*html*
// @include     *://v.qq.com/*
// @include     *://*.cctv.com/*
// @include     *://www.mgtv.com/*/*.html*
// @include     *://zt.mgtv.com/act/*
// @include     *://www.mgtv.com/news
// @include     *://www.mgtv.com/live
// @include     *://live.mgtv.com*
// @include     *://*.icourse163.org/*
// @include     *://open.163.com/movie*
// @include     *://study.163.com/course/courseLearn*
// @include     *://mooc.study.163.com/learn/*
// @include     *://live.bilibili.com/*
// @run-at      document-start
// @version     1.7
// @grant       none
// ==/UserScript==
//'use strict';
var ua = null;  //user-agent取值
var isPhone = false;  //是否使用移动ua
var ele = function (element) {  //获取元素对象的函数
    return document.querySelector(element);
};
var changeUA = function (ua) { //更改ua的函数
    Object.defineProperty(navigator, 'userAgent', {
        value: ua,
        writable: false,
        configurable: false,
        enumerable: true
    });
};

(function () {  //判断移动ua相关信息
    var phone = [  //这些网站使用移动ua
        'cctv',
        '.163',
        'mgtv',
        'iqiyi'
    ];

    if (location.host.indexOf('iqiyi') >= 0 && navigator.userAgent.indexOf('Firefox') === -1) {
        isPhone = false;  //爱奇艺的html5不支持firefox
    } else {
        for (var i = 0; i < phone.length; i++) {
            if (location.host.indexOf(phone[i]) >= 0) {
                isPhone = true;
            }
        }
    }
})();

if (isPhone) {  //移动ua的网站
    ua = 'Mozilla/5.0 (Linux; U; Android 4.0.4; GT-I9300 Build/IMM76D) AppleWebKit/601.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/601.1.46';
    changeUA(ua);
} else {  //使用chrome、mac、safari等ua
    if ((location.host === 'v.qq.com' || location.host === 'live.bilibil.com') && navigator.userAgent.indexOf('Edge') === -1) {
        console.log('支持html5');  //Edge的腾讯视频和b站直播不支持html5
    } else if (location.href.indexOf('iqiyi') >= 0) {
        console.log('支持html5');
    } else if (location.host.indexOf('le.com') >= 0) {  //le.com对mac+safari情有独钟
        ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8';
        changeUA(ua);
    } else {  //chrome ua
        ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/603.3.8';
        changeUA(ua);
    }
}

if (location.href.search('open.163') >= 0) {  //网易公开课
    setTimeout(function () {
        var v = ele('.video-wrapper video');
        ele('body').style.backgroundColor = '#e4f0eb';
        if (!!v === true) {  //设置视频播放区域的高度
            v.setAttribute('style', 'height:100%');
        }
    }, 2333);
}

window.onload = function () {
    if (isPhone === true && (location.href.search('study.163') >= 0 || location.href.search('iqiyi.com') >= 0)) {
        var videoElement = ele('video');  //视频元素
        if (!!videoElement === true) {
            videoElement.setAttribute('controls', 'controls');  //显示播放控制条
            if (location.href.search('iqiyi.com') >= 0) {
                iqiyi();
            }
        }
    }
    function iqiyi() {  //爱奇艺的相关调整
        var defaultProcess = ele('.process-response');  //爱奇艺默认的进度条
        var control2 = ele('.bottom');  //播放下一个视频和调整画质的控制条
        if (!!control2 === true) {
            control2.style.bottom = '25px';  //播放下一个视频和调整画质的控制条往上放
            if (!!defaultProcess === true) {
                defaultProcess.style.display = 'none';  //让默认进度条消失
            }
        }
    }
};
