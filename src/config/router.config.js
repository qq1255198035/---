// eslint-disable-next-line
import { UserLayout, BlankLayout } from '@/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
         {
           path: '/user',
           component: UserLayout,
           redirect: '/user/login',
           hidden: true,
           children: [
             {
               path: 'login',
               name: 'login',
               component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Login')
             },
             {
               path: 'register',
               name: 'register',
               component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Register')
             },
             {
               path: 'register-result',
               name: 'registerResult',
               component: () => import(/* webpackChunkName: "user" */ '@/pages/user/RegisterResult')
             }
           ]
         },
         {
           path: '/404',
           component: () => import(/* webpackChunkName: "fail" */ '@/pages/404')
         }
       ]
