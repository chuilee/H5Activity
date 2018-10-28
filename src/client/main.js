// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueBus from 'vue-bus';

import MintUI from 'mint-ui';
import {
  VueHammer,
} from 'vue2-hammer';

import App from './App';
import router from './router';

Vue.config.productionTip = false;
VueHammer.config.pinch = {
  threshold: 0,
};
Vue.use(VueResource);
Vue.use(VueBus);
Vue.use(MintUI);
Vue.use(VueHammer);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App />',
});
