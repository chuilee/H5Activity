<template>
  <div class="page">
    <h1>首页</h1>
    <button class="start" @click="startFn()"><img :src="start" alt=""></button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

const start = require('./images/start.png');

export default {
  name: 'home',
  data() {
    return {
      start
    };
  },
  mounted() {

  },
  methods: {
    startFn() {
      this.$router.push({
        name: 'diy',
      })
    }
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
