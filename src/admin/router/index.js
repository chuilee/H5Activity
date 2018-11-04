import Vue from 'vue';
import Router from 'vue-router';
import UserList from '@/admin/components/UserList';
import Material from '@/admin/components/Material';
import ActivityList from '@/admin/components/ActivityList';
import Login from '@/admin/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'activityList',
        params: {
          page: 1,
        },
      },
    },
    {
      path: '/userList',
      name: 'userList',
      component: UserList,
    },
    {
      path: '/details/:id',
      name: 'material',
      component: Material,
    },
    {
      path: '/activityList/:page',
      name: 'activityList',
      component: ActivityList,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
