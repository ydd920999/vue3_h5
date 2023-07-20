export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  // {
  //   path: '/home/:jobId',
  //   name: 'Position',
  //   component: () => import('@/views/home/components/detail.vue'),
  //   meta: {
  //     title: '详情',
  //   },
  // },
];
