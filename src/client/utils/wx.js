/* eslint-disable */
export default {
  //注册
  config(data, showmenu, fun) {
    // alert("appid"+data.appid+"----timestamp"+data.timestamp+"-----nonceStr"+data.noncestr+"----signature"+data.signature);
    wx.config({
      debug: false,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.noncestr,
      signature: data.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
    });
    console.log(data)
    var that = this;
    //var weixinShare = window.store.activityConfig.weixinShare;
    // 默认隐藏右上角
    wx.ready(function () {
      if (fun) {
        fun();
      }
      if (!showmenu) {
        wx.showOptionMenu();
      } else {
        wx.hideOptionMenu();
      }
    });
  },
  //隐藏分享
  hideShare() {
    wx.hideOptionMenu();
  },
  showShare() {
    wx.showOptionMenu();
  },
  //分享
  share(title, desc, link, imgurl, fun) {
    // 显示右上角
    wx.showOptionMenu();
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgurl,
        success: function (res) {
          // alert('已分享');
          if (fun)
            fun('ShareTimeline', 'success')
        },
        cancel: function (res) {
          // alert('已取消');
          if (fun)
            fun('ShareTimeline', 'cancel')
        },
        fail: function (res) {
          // alert('已取消');
          if (fun)
            fun('ShareTimeline', 'fail')
        },
        complete: function () {
          //						wx.hideOptionMenu();
          if (fun)
            fun('ShareTimeline', 'complete')
        }
      });

      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgurl,
        success: function (res) {
          // alert('已分享');
          if (fun)
            fun('ShareAppMessage', 'success')
        },
        cancel: function (res) {
          // alert('已取消');
          if (fun)
            fun('ShareAppMessage', 'cancel')
        },
        fail: function (res) {
          // alert('已取消');
          if (fun)
            fun('ShareAppMessage', 'fail')
        },
        complete: function () {
          //						wx.hideOptionMenu();
          //						if(fun)
          //							fun('ShareAppMessage', 'complete')
        }
      });
    });
  },
  chooseImages(fun){
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          if (fun)
            fun('success', localIds)
        },
        cancel: function (res) {
          // alert('已取消');
          if (fun)
            fun('cancel')
        },
        complete: function (res) {
          // alert(JSON.stringify(res));
        }
    });
  }

}
// export var wxapi = wx;
