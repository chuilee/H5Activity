import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/client/components/home/home';
import Start from '@/client/components/start/start';
import Poster from '@/client/components/poster/poster';
import Share from '@/client/components/share/share';

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
      path: '/start',
      name: 'start',
      component: Start,
    },
    {
      path: '/poster/:pic/:id',
      name: 'poster',
      component: Poster,
    },
    {
      path: '/share/:id',
      name: 'share',
      component: Share,
    },
  ],
});
