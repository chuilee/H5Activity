import Vue from 'vue';
import Router from 'vue-router';
import Loading from '@/client/components/loading/loading';
import Home from '@/client/components/home/home';
import Fade from '@/client/components/fade/fade';
import Result from '@/client/components/result/result';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: Loading,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/result/:percent/:type',
      name: 'result',
      component: Result,
    },
    {
      path: '/fade',
      name: 'fade',
      component: Fade,
    },
  ],
});
