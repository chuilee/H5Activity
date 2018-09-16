<template>
  <div class="question-item page-view">
    <img :src="index" class="index" alt="">
    <h2 class="title">你会选择什么样的发型呢?</h2>
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
  const index = require('./images/q2.png')
  export default {
    data() {
      return {
        index,
        options: [{
          title: 'A. 可爱别致丸子头',
          value: 'a'
        },{
          title: 'B. 披肩大波浪卷发',
          value: 'b'
        },{
          title: 'C. 鱼骨辫/脏辫',
          value: 'c'
        },{
          title: 'D. 双马尾',
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
        this.$bus.emit('selectQuestion2', value);
      }
    }
  }
</script>
