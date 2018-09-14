import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/client/components/home/home';
import Start from '@/client/components/start/start';
import Question from '@/client/components/question/question';
import Share from '@/client/components/share/share';
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
      path: '/result/:percent',
      name: 'result',
      component: Result,
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question,
    },
    {
      path: '/share/:id',
      name: 'share',
      component: Share,
    },
  ],
});
