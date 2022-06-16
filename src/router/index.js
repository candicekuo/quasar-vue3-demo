import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// const checkPermission = (to, from, next) => {
// const token = Cookies.get('_ida');
// const idameta = JSON.parse(LocalStorage.getItem('_idameta'));
// const permissions = idameta?.permissions;
// const expireAt = idameta?.expire_at;
// const accountId = token ? jwt_decode(token)?.account_id : null;
// const role = parseInt(accountId) === -1 ? 'supermario' : 'kinopio';
// const { name = '', meta = null } = to;
// if ((!token || !permissions) && name !== 'login') {
//   next('/login');
// } else if (token && permissions) {
//   if (expireAt && dayjs(expireAt).valueOf() <= dayjs().valueOf()) {
//     LocalStorage.remove('_idameta', { path: '/' });
//     Cookies.remove('_ida', { path: '/' });
//     next('/login');
//   } else {
//     if (name === 'login') {
//       next('/');
//     } else {
//       switch (role) {
//         case 'supermario':
//           next();
//           break;
//         case 'kinopio':
//         default:
//           if (permissions.indexOf(meta.permissions) !== -1 || !meta.permissions) {
//             next();
//           } else {
//             Notify.create({
//               position: 'top',
//               timeout: 3000,
//               textColor: 'white',
//               color: 'negative',
//               message: t('Permission Denied'),
//             });
//             next({ name: 'Dashboard' });
//           }
//           break;
//       }
//     }
//   }
// } else {
//   next();
// }
// };

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [
      {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        // beforeEnter: (to, from, next) => checkPermission(to, from, next),
        redirect: { name: 'overview' },
        children: [...routes],
      },
      {
        path: '/login',
        // beforeEnter: (to, from, next) => checkPermission(to, from, next),
        component: () => import('pages/Login'),

      },
      // Always leave this as last one, but you can also remove it
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      }
    ],


    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  return Router
})
