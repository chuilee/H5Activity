<template>
  <transition :name="transitionName">
    <router-view  class="page-view"></router-view>
  </transition>
</template>

<script>
import utils from '@/client/utils';
import wx from './utils/wx';

export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right',
    }
  },
  created() {
    this.$http['get']('http://lb.yi-shang.cn/index/getShare')
      .then((response) => {
        let data = response.body.data
        wx.config(data.signPackage, true, () => {
          wx.share(data.share.title, data.share.desc, data.share.url, data.share.img);
        })
      }, (error) => {

      })
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
};
</script>

<style lang="scss" src="./assets/style/public.scss"></style>
