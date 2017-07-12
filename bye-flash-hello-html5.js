// ==UserScript==
// @name        bye-flash-hello-html5 | 再见flash 你好html5
// @namespace   https://greasyfork.org/en/users/131965-levinit
// @author      levinit
// @description 某些网站啊，明明有html5视频播放，就是不提供给你用呢，mac就可以是几个意思？对，说的就是你！flash?手动再见!支持优酷-乐视-爱奇艺等
// @include     *://*le.com/*
// @include     *://*iqiyi.com/*
// @include     *://*youku.com/*
// @include     *://*cctv.com/*
// @include     *://*mgtv.com/*
// @include     *://*icourse163.org/*
// @include     *://*open.163.com/movie*
// @include     *://*study.163.com/course/*
// @run-at      document-start
// @version     1
// @grant       none
// ==/UserScript==
//'use strict';
var siteNow = location.host; //获取当前的主机名
var ua = null; //user-agent
var isPhone = false; //是否使用移动ua
//更改ua的方法
function changeUA(ua) {
  Object.defineProperty(navigator, 'userAgent', {
    value: ua,
    writable: false,
    configurable: false,
    enumerable: true
  });
}

(function () {
  //如果是这些页面，禁止使用移动ua
  var http = location.protocol + '//'; //http/https
  var homeUrl = location.href.replace(http, '');
  if (homeUrl === 'www.mgtv.com/') {
    console.log('此页面不使用移动UA');
  } else {
    var phone = [
      'cctv',
      '.163',
      'mgtv'
    ];
    for (var i = 0; i < phone.length; i++) {
      if (siteNow.indexOf(phone[i]) >= 0) {
        isPhone = true;
        console.log('将使用Android UA')
        return;
      }
    }
  }
}) ();
if (siteNow.indexOf('youku') >= 0) { //优酷youku
  console.log('HTML5播放');
  (function () {
    window.sessionStorage.setItem('P_l_h5', true);
  }) ();
} else if (isPhone) { //使用移动ua 默认用android
  console.log('使用Android的UA进行HTML5播放'); //cctv使用IOS播放会有问题
  ua = 'Mozilla/5.0 (Linux; U; Android 4.0.4; GT-I9300 Build/IMM76D) AppleWebKit/601.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/601.1.46';
  changeUA(ua);
} else { //使用chrome、mac、safari等ua
  console.log('使用html5播放');
  if (siteNow.indexOf('le.com') >= 0) { //le.com乐视网对mac+safari情有独钟
    ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7';
  } else { //使用mac ua
    ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/601.2.7';
  }
  changeUA(ua);
}
