<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import wx from 'weixin-js-sdk';
import axios from 'axios';

// function getSignature() {
//   axios.get('/api/weixin/getSignature', { url: window.location.href }, res => {
//     if (res.code == 'SUCCESS') {
//       this.wxstart(res.data);
//     }
//   });
// }
function wxstart(data: any) {
  const url = window.location.href;
  const imgurl = process.env.API_URL + '/static/images/logo.png';
  const title = '';
  const desc = '';
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名，见附录1
    jsApiList: [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
    ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(function () {
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgurl, // 分享图标
      success: function () {
        // 设置成功
        console.log(11111);
      },
    });
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgurl, // 分享图标
      success: function () {
        // 设置成功
      },
    });
    // 分享到QQ
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接
      imgUrl: imgurl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      },
    });
  });
}
</script>
