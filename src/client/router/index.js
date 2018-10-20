import Vue from 'vue';
import Router from 'vue-router';
// import Loading from '@/client/components/loading/loading';
import Home from '@/client/components/home/home';
import Diy from '@/client/components/diy/diy';
import Complete from '@/client/components/complete/complete';
import Result from '@/client/components/result/result';
import Rank from '@/client/components/rank/rank';
import MyWork from '@/client/components/myWork/my-work';
import workDetails from '@/client/components/workDetails/work-details';
import Share from '@/client/components/share/share';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'loading',
    //   component: Loading,
    // },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/diy',
      name: 'diy',
      component: Diy,
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete,
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/my-work',
      name: 'my-work',
      component: MyWork,
    },
    {
      path: '/work-details/:id',
      name: 'work-details',
      component: workDetails,
    },
    {
      path: '/share/:id',
      name: 'share',
      component: Share,
    },
    {
      path: '/result/:percent/:type',
      name: 'result',
      component: Result,
    },
  ],
});
