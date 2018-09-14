<template>
  <transition :name="transitionName">
    <router-view  class="page-view"></router-view>
  </transition>
</template>

<script>
import utils from '@/client/utils';
import api from './api';

export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right',
    }
  },
  created() {
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
