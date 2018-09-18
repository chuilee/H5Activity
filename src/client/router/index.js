import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/client/components/home/home';
import Fade from '@/client/components/fade/fade';
import Question from '@/client/components/question/question';
import Result from '@/client/components/result/result';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
      path: '/question/:id',
      name: 'question',
      component: Question,
      // beforeEnter(to, from, next) {
      // },
    },
    {
      path: '/fade',
      name: 'fade',
      component: Fade,
    },
  ],
});
