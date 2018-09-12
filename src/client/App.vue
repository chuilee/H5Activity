<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import utils from '@/client/utils';
import api from './api';
import wx from '@/client/utils/wx.js'
import Statistics from './statistics.js';

export default {
  name: 'App',
  created() {
    api.wmObtainJssdk(this, {
      jsurl: location.href.replace(location.hash, ''),
    }, (back) => {
      if (back.body.resCode == '0') {
        const that = this,
        weixinShare = {
          title: '母亲节 | 我的妈呀，你听我说！',
          description: '这可能是妈妈最想要的礼物',
          imgUrl: 'http://huodong.10155.com/dtu/src/images/mother_share.jpg',
        };
        wx.config(back.body.repBody, '', () => {
          wx.share(weixinShare.title,
          weixinShare.description,
          "http://huodong.10155.com/dtu/login.jsp?aid=8899&channel=wx#/",
          weixinShare.imgUrl, (type) => {
            if (type === "success") {
              try {
                Statistics.share_btn('homePageSuccess');
              } catch (err) {
                throw(err);
              }
              return;
            }

            if (type === "fail") {
              try {
                Statistics.share_btn('homePageFail');
              } catch (err) {
                throw(err);
              }
              return;
            }

            if (type === "cancel") {
              try {
                Statistics.share_btn('homePageCancel');
              } catch (err) {
                throw(err);
              }
              return;
            }
          });
        });
      }
    });
    if(utils.getQueryStringByName('shareid')) { // 来自分享
      window.location.href = `http://${window.location.host}/dtu/index.jsp#/share/${utils.getQueryStringByName('shareid')}`
    }
  },
};
</script>

<style lang="scss" src="./assets/style/public.scss"></style>

