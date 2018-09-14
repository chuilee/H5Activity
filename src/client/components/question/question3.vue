<template>
  <div class="question-item">
    <img :src="index" class="index" alt="">
    <h2 class="title">   衣橱里有这几款衣服，<br> 你会选择哪一款呢?</h2>
    <div class="options">
      <div
        v-for="(option, key) in options"
        v-bind:key="key"
        @click="select(option.value)"
        :class="value == option.value ? 'img-item active' : 'img-item'">
        <img :src="option.img" alt="">
        <p>{{option.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  const index = require('./images/q3.png');
  const img1 = require('./images/q3_img1.jpg');
  const img2 = require('./images/q3_img2.jpg');
  const img3 = require('./images/q3_img3.jpg');
  const img4 = require('./images/q3_img4.jpg');
  export default {
    data() {
      return {
        index,
        options: [{
          title: '亮片（炫彩）',
          value: 'a',
          img: img1,
        },{
          title: '毛绒（粉红）',
          value: 'b',
          img: img2,
        },{
          title: '满印（运动）',
          value: 'c',
          img: img3,
        },{
          title: '破洞（潮酷）',
          value: 'd',
          img: img4,
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
<style lang="scss" scoped>
.options {
  overflow: hidden;
}
 .img-item {
  float: left;
  width: 50%;
  padding: 0 10px 10px;
  box-sizing: border-box;

  &.active {
    img {
      border: 2px solid #b720ec;
    }
  }

  img {
    width: 100%;
    box-sizing: border-box;
    border: 2px solid transparent;
  }

  p {
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>
