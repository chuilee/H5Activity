import Vue from 'vue';
import Router from 'vue-router';
import UserList from '@/admin/components/UserList';
import Material from '@/admin/components/Material';
import ActivityList from '@/admin/components/ActivityList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userList',
      component: UserList,
    },
    {
      path: '/userList',
      name: 'userList',
      component: UserList,
    },
    {
      path: '/material',
      name: 'material',
      component: Material,
    },
    {
      path: '/activityList',
      name: 'activityList',
      component: ActivityList,
    },
  ],
});
