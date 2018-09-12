<template>
  <div class="qrcode-section" v-if="show">
    <img :src="qrcode" alt="">
  </div>
</template>

<script>
import utils from '@/client/utils';

const qrcode = require('./images/qrcode.png')

export default {
  props: ['show'],
  data() {
    return {
      qrcode,
    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>
<style lang="scss" src='./style.scss'></style>
