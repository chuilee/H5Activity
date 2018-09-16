<template>
  <div class="question-item page-view">
    <img :src="index" class="index" alt="">
    <h2 class="title">这些事情，你敢挑战哪个?</h2>
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
  const index = require('./images/q1.png')
  export default {
    data() {
      return {
        index,
        options: [{
          title: 'A. 在裸体沙滩晒太阳',
          value: 'a'
        },{
          title: 'B. 爱一个人一辈子',
          value: 'b'
        },{
          title: 'C. 关机一周',
          value: 'c'
        },{
          title: 'D. 换一个城市生活',
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
        this.$bus.emit('selectQuestion1', value);
      }
    }
  }
</script>
