<template>
  <div class="question-item page-view">
    <img :src="index" class="index" alt="">
    <h2 class="title">派对马上开始，你会pick哪款造型，闪亮登场？</h2>
    <div class="options">
      <button
        v-for="(option, index) in options"
        v-bind:key="index"
        @click="select(option.value)"
        :class="value == option.value ? 'option active' : 'option'">{{option.title}}</button>
    </div>
  </div>
</template>
<script>
  const index = require('./images/q3.png')
  export default {
    data() {
      return {
        index,
        options: [{
          title: 'A. 闪亮拖尾裙',
          value: 'a'
        },{
          title: 'B. 酷黑机车服',
          value: 'b'
        },{
          title: 'C. 少女蓬蓬裙',
          value: 'c'
        },{
          title: 'D. 不刻意打扮，我就是我',
          value: 'd'
        }],
        selectOption: '',
        value: '',
      }
    },
    methods: {
      select(value) {
        // console.log(value)
        this.value = value;
        this.$bus.emit('selectQuestion3', value);
      }
    }
  }
</script>
