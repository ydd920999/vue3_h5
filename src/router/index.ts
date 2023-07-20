import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  Router,
} from 'vue-router';
import type { App } from 'vue';
import routes from './routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

function routerGuards(router: Router) {
  //白名单列表
  const APP_WHITE_LIST = [
    // 'Login',
    'Home',
    // 'NotFound',
    // 'Policy',
    // 'PolicyDetail',
    // 'Company',
    // 'Position',
    // 'ConversationDetail',
    // 'CampusRecruitingDetail',
    // 'CampusRecruiting',
    // 'JobFairs',
    // 'JobFairsDetail',
    // 'HotCompany',
    // 'HotJobs',
  ];
  const defaultRoutePath = '/';
  router.beforeEach(async (to, from, next) => {
    try {
      if (APP_WHITE_LIST.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next();
        return;
      }
      next({ path: defaultRoutePath, replace: true });
    } catch (error) {
      if (to.name === 'NotFound') {
        next();
      } else {
        next({ name: 'NotFound' });
      }
    }
  });

  router.afterEach((to, from, failure) => {
    if (to?.meta?.title) {
      document.title = `${to.meta.title}`;
    }
    if (isNavigationFailure(failure)) {
      console.log('failed navigation', failure);
    }
  });

  router.onError(error => {
    console.log(error, '路由错误');
  });
}

export default router;
export function setupRouter(app: App) {
  app.use(router);
  // 路由导航函数
  routerGuards(router);
}

// import {
//   createRouter,
//   createWebHistory,
//   isNavigationFailure,
//   Router,
// } from 'vue-router';
// import type { App } from 'vue';
// import routes from './routes';
// import { useUserStore } from '@/pinia/user';
// import UserService from '@/api/user';
// import { setCurrentStep } from '@/views/register/util';

// export const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
//   scrollBehavior(_to, _from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition;
//     } else {
//       return { top: 0, left: 0 };
//     }
//   },
// });

// function routerGuards(router: Router) {
//   //白名单列表
//   const APP_WHITE_LIST = [
//     'Login',
//     'Home',
//     'NotFound',
//     'Policy',
//     'PolicyDetail',
//     'Company',
//     'Position',
//     'ConversationDetail',
//     'CampusRecruitingDetail',
//     'CampusRecruiting',
//     'JobFairs',
//     'JobFairsDetail',
//     'HotCompany',
//     'HotJobs',
//   ];
//   const defaultRoutePath = '/';
//   router.beforeEach(async (to, from, next) => {
//     const userStore = useUserStore();
//     const token = userStore.token;
//     const callback = () => {
//       if (to.name === 'Login') {
//         next({ path: defaultRoutePath });
//       } else {
//         const hasRoute = router.hasRoute(to.name!);
//         if (!hasRoute) {
//           next({ name: 'NotFound' });
//         } else {
//           next();
//         }
//       }
//     };

//     const registerCallback = (index: number) => {
//       setCurrentStep(index);
//       if (to.path === '/register') next();
//       else next({ path: '/register', replace: true });
//     };

//     try {
//       if (token) {
//         if (!userStore.hasUserInfo) {
//           // 没有用户信息
//           const resp = await UserService.selectSeekerImprove<any>();
//           if (resp.code === 200) {
//             const data = resp.data;
//             userStore.setUserInfo(data);
//             // 根据返回的信息，跳转到不同的注册步骤
//             // 1. 是否有求职意向，如果没有则进入注册 步骤1 (索引为0，索引递增)
//             // 2. 没有真实姓名，则进入注册 步骤2
//             // 3. 判断教育经历是否存在，不存在则进入 步骤3
//             // 4. 判断工作经历是否存在，不存在则进入 步骤4 （这个步骤可以跳过）
//             if (!data?.seekerPurposeBo) {
//               registerCallback(0);
//             } else if (!data?.seekerBO?.name) {
//               registerCallback(1);
//             } else if (!data?.educationExperienceBo) {
//               registerCallback(2);
//             }
//             // else if (!data?.workExperienceBo) {
//             //   registerCallback(3);
//             // }
//             else {
//               if (to.path === '/register') {
//                 next('/');
//               } else {
//                 next();
//               }
//             }
//           } else if (resp.code === 401) {
//             // 如果从 login 来，就跳转过去，如果从register来，就返回到注册
//             if (to.name === 'Register') next();
//             else next({ path: '/register' });
//           } else {
//             // 没有用户信息，跳转到登录
//             next({
//               path: '/login',
//               // query: { redirect: to.name === 'Register' ? '/' : to.fullPath },
//               replace: true,
//             });
//           }
//         } else {
//           // 有用户信息，但是去的时候注册页
//           if (to.name === 'Register') next({ path: '/', replace: true });
//           else callback();
//         }
//       } else {
//         if (APP_WHITE_LIST.includes(to.name as string)) {
//           // 在免登录名单，直接进入
//           next();
//           return;
//         }
//         next({
//           path: '/login',
//           // query: { redirect: to.fullPath },
//           replace: true,
//         });
//       }
//     } catch (error) {
//       if (to.name === 'NotFound') {
//         next();
//       } else {
//         next({ name: 'NotFound' });
//       }
//     }
//   });

//   router.afterEach((to, from, failure) => {
//     if (to?.meta?.title) {
//       // document.title = to.meta.title + `-点点速聘 | 重新定义你的招聘方式`;
//       document.title = `${to.meta.title}`;
//     }
//     if (isNavigationFailure(failure)) {
//       console.log('failed navigation', failure);
//     }
//   });

//   router.onError(error => {
//     console.log(error, '路由错误');
//   });
// }

// export default router;
// export function setupRouter(app: App) {
//   app.use(router);
//   // 路由导航函数
//   routerGuards(router);
// }
