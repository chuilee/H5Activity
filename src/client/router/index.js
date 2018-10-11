import Vue from 'vue';
import Router from 'vue-router';
import Loading from '@/client/components/loading/loading';
import Home from '@/client/components/home/home';
import Diy from '@/client/components/diy/diy';
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
      path: '/diy',
      name: 'diy',
      component: Diy,
    },
    {
      path: '/result/:percent/:type',
      name: 'result',
      component: Result,
    },
  ],
});
