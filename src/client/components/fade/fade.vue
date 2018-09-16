<template>
  <div class="page">
    <img id="bg" :src="bg" class="bg" alt="">
    <!-- <img :src="eye" class="eye" alt=""> -->
    <img :src="bottom" class="bottom" alt="">
    <button class="start" @click="startFn()"><img :src="start" alt=""></button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

const bg = require('./images/bg.jpg');
const eye = require('./images/eye.gif');
const start = require('./images/start.png');
const bottom = require('./images/bottom.png');

export default {
  name: 'fade',
  data() {
    return {
      bg,
      eye,
      start,
      bottom,
      loaded: false
    };
  },
  mounted() {
    
  },
  methods: {
    startFn() {
      this.$router.push({
        name: 'question',
        params: {
          id: '1',
        },
      })
    }
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
