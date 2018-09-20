<template>
  <div class="question">
    <img :src="logo" class="logo" alt="">
    <img :src="bottom" class="bottom" alt="">
    <div class="question-content">
      <img :src="bg" class="bg" alt="">
      <!-- <button class="btn" @click=""><img :src="btn" alt=""></button> -->
      <transition :name="transitionName">
        <component :is="view"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Question1 from './question1';
import Question2 from './question2';
import Question3 from './question3';

const jrQrcode = require('jr-qrcode');
const bg = require('./images/bg.png');
const logo = require('./images/logo.png');
const btn = require('./images/btn.png');
const bottom = require('./images/bottom.png');


export default {
  name: 'question',
  data() {
    return {
      bg,
      logo,
      btn,
      bottom,
      question1value: '',
      question2value: '',
      question3value: '',
      view: 'question1',
      transitionName: 'slide-left',
    };
  },
  created() {
    this.changeView();
    this.$bus.on('selectQuestion1', (value) => {
      this.question1value = value;
      this.next();
    })
    this.$bus.on('selectQuestion2', (value) => {
      this.question2value = value;
      this.next();
    })
    this.$bus.on('selectQuestion3', (value) => {
      this.question3value = value;

      if (this.question2value && this.question1value && this.question3value) {
        let arr = [];
        switch(this.question2value) {
          case 'a':
            arr[0] = 4;
            break;
          case 'b':
            arr[0] = 7;
            break;
          case 'c':
            arr[0] = 3;
            break;
          case 'd':
            arr[0] = 5;
            break;
          default:;
        }
        switch(this.question3value) {
          case 'a':
            arr[1] = 1;
            break;
          case 'b':
            arr[1] = 6;
            break;
          case 'c':
            arr[1] = 8;
            break;
          case 'd':
            arr[1] = 2;
            break;
          default:;
        }
        this.$router.push({
          name: 'result',
          params: {
            percent: this.question1value,
            type: arr[Math.ceil(Math.random() * 2)-1],
          },
        })
      }
    })
  },
  components: {
    Question1,
    Question2,
    Question3,
  },
  methods: {
    changeView(){
      switch(parseInt(this.$route.params.id, 10)) {
        case 1:
          this.view = 'question1';
          break;
        case 2:
          this.view = 'question2';
          break;
        case 3:
          this.view = 'question3';
          break;
        default:;
      }
    },
    next() {
      let currentId = parseInt(this.$route.params.id, 10);
      let passed = false
      switch(currentId) {
        case 1:
          this.question1value ? passed = true : passed = false;
          break;
        case 2:
          this.question2value ? passed = true : passed = false;
          break;
        case 3:
          this.question3value ? passed = true : passed = false;
          break;
        default:
          passed = false;
      }
      if (passed) {
        if (currentId < 3 ) {
          this.$router.push({
            name: 'question',
            params: {
              id: parseInt(currentId, 10) + 1,
            },
          })
        } else {

        }
      } else {
        Toast('请选择一个选项')
      }
    }
  },
  watch: {
    question1value(v, o) {
      console.log(v)
    },
    '$route' (to, from) {
      this.changeView();
      // debugger;
      const toDepth = parseInt(to.params.id, 10);
      const fromDepth = parseInt(from.params.id, 10);
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = parseInt(to.params.id, 10);
    const fromDepth = parseInt(from.params.id, 10);
    if (toDepth < fromDepth) {
      next(false);
    } else {
      next();
    }
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
