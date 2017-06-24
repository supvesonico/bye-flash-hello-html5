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
//使用andorid/ios的UA      
var siteNow = location.host; //获取当前的主机名
var ua = null;
var isAndroid = false; //是否使用andorid ua
var isIOS = false; //是否ios ua
function changeUA(ua) {
  Object.defineProperty(navigator, 'userAgent', {
    value: ua,
    writable: false,
    configurable: false,
    enumerable: true
  });
}
console.log('检测当前网站');
(function () {
  //如果是这些网站的首页，禁止使用移动ua渲染 --这些网站不好进行匹配……
  var http = location.protocol + '//';
  var homeUrl = location.href.replace(http, '');
  if (homeUrl === 'www.mgtv.com/') {
    console.log('网站首页不使用移动UA');
  } else {
    var android = [
      'cctv',
      '.163',
      'mgtv'
    ]; //cctv只看好Android？
    var ios = [
    ]
    for (var i = 0; i < android.length; i++) {
      if (siteNow.indexOf(android[i]) >= 0) {
        isAndroid = true;
        console.log('将使用Android UA')
        return;
      }
    }
    for (var i = 0; i < ios.length; i++) {
      if (siteNow.indexOf(ios[i]) >= 0) {
        isIOS = true;
        console.log('将使用IOS UA')
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
} else if (isAndroid || isIOS) {
  if (isAndroid) {
    ua = 'Mozilla/5.0 (Linux; U; Android 4.0.4; GT-I9300 Build/IMM76D) AppleWebKit/601.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/601.1.46';
    console.log('使用Android的UA进行HTML5播放');
  } else {
    ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/47.0.2526.70 Mobile/13C71 Safari/601.1.46';
    console.log('使用IOS的UA进行HTML5播放');
  }
  changeUA(ua);
} else {
  console.log('已使用html5播放');
  if (siteNow.indexOf('le.com') >= 0) { //le.com乐视网对mac+safari情有独钟
    ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7';
    //ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36';
  } else {
    ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/601.2.7';
  }
  changeUA(ua);
}

