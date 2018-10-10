<template>
  <div class="page">
    <div id="svg-container" style="width: 200px"></div>
    <!-- <object id="shoes-1" type="image/svg+xml" :data="shoes_1" style="display:block;width:330px;height:240px" >
      <param name="src" :value="shoes_1">
    </object> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

const shoes_1 = require('./images/shoes1.svg');

export default {
  name: 'fade',
  data() {
    return {
      shoes_1
    };
  },
  mounted() {
    // var svg = document.querySelector('#shoes-1').contentDocument;
    // console.log(svg)
    // svg.querySelectorAll('.cls-3').forEach((item, index) => {
    //   console.log(item)
    //   item.style.fill='red';
    // })

    this.$http['get'](this.shoes_1)
      .then((response) => {
        console.log(document.querySelector('#svg-container'));
        document.querySelector('#svg-container').innerHTML = response.body;
        document.querySelectorAll('.part2').forEach((item, index) => {
          console.log(item)
          item.style.fill='red';
        })
      }, (error) => {

      })
  },
  methods: {
   
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
