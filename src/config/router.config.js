// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
export const asyncRouterMap = [
         {
           path: '/',
           name: 'index',
           component: BasicLayout,
           meta: { title: '首页' },
           redirect: '/home',
           children: [
             // 搞手
             {
               path: '/home',
               name: 'home',
               component: () => import('@/pages/Issuer/home'),
               meta: { title: '首页', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/notices',
               name: 'notices',
               component: () => import('@/pages/Issuer/notices'),
               meta: { title: '消息通知', keepAlive: true, icon: 'profile', permission: ['dashboard'] }
             },
             {
               path: '/accountInfo',
               name: 'accountInfo',
               component: () => import('@/pages/Issuer/accountInfo'),
               meta: { title: '账户信息', keepAlive: true, icon: 'form', permission: ['dashboard'] }
             },
             {
               path: '/accountSet',
               name: 'accountSet',
               hidden: true,
               component: () => import('@/pages/Issuer/accountSet'),
               meta: { title: '账户设置', keepAlive: true, icon: 'tool', permission: ['dashboard'] }
             },
             // 我的活动

             {
               path: '/ihdgl',
               name: 'hdgl',
               component: () => import('@/pages/Issuer/activies/hdgl'),
               meta: { title: '活动管理', keepAlive: false, icon: 'tool', permission: ['dashboard'] }
             },
             {
               path: '/zzgl',
               name: 'zzgl',
               hidden: true,
               component: () => import('@/pages/Issuer/activies/zzgl'),
               meta: { title: '赞助管理', keepAlive: false, permission: ['dashboard'] }
             },

             {
               path: '/mxgl',
               name: 'mxgl',
               hidden: true,
               component: () => import('@/pages/Issuer/activies/mxgl'),
               meta: { title: '明星管理', keepAlive: false, permission: ['dashboard'] }
             },
             {
               path: '/cjhd',
               name: 'cjhd',
               hidden: true,
               component: () => import('@/pages/Issuer/activies/cjhd'),
               meta: { title: '创建活动', keepAlive: true, permission: ['dashboard'] }
             },
             {
               path: '/details',
               name: 'details',
               hidden: true,
               component: () => import('@/pages/Issuer/activies/details'),
               meta: { title: '查看活动', keepAlive: true, permission: ['dashboard'] }
             },
             {
               path: '/starsdetail',
               name: 'starsdetail',
               hidden: true,
               component: () => import('@/pages/Issuer/activies/starsdetail'),
               meta: { title: '详情', keepAlive: false, permission: ['dashboard'] }
             },

             // 管理員
             {
               path: '/index',
               name: 'aindex',
               component: () => import('@/pages/admin/index'),
               meta: { title: '首页', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/ahdgl',
               name: 'ahdgl',
               redirect: '/khgl/gsgl',
               component: PageView,
               meta: { title: '活动管理', keepAlive: true, icon: 'team', permission: ['dashboard'] },
               children: [
                 {
                   path: '/ahdgl/hdsp',
                   name: 'hdsp',
                   component: () => import('@/pages/admin/hdgl/hdsp'),
                   meta: { title: '活动审批', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/ahdgl/hdrz',
                   name: 'hdrz',
                   component: () => import('@/pages/admin/hdgl/hdrz'),
                   meta: { title: '活动认证', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/ahdgl/ckhd',
                   name: 'ckhd',
                   component: () => import('@/pages/admin/hdgl/ckhd'),
                   hidden: true,
                   meta: { title: '查看活动', keepAlive: false, permission: ['dashboard'] }
                 }
               ]
             },
             {
               path: '/khgl',
               name: 'khgl',
               redirect: '/khgl/gsgl',
               component: PageView,
               meta: { title: '客户管理', keepAlive: true, icon: 'team', permission: ['dashboard'] },
               children: [
                 {
                   path: '/khgl/gsgl',
                   name: 'gsgl',
                   component: () => import('@/pages/admin/khgl/gsgl'),
                   meta: { title: '搞手审批', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/gsxq',
                   name: 'gsxq',
                   hidden: true,
                   component: () => import('@/pages/admin/khgl/gsxq'),
                   meta: { title: '详情', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/zzsgl',
                   name: 'zzsgl',
                   component: () => import('@/pages/admin/khgl/zzsgl'),
                   meta: { title: '赞助商审批', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/zzsxq',
                   name: 'zzsxq',
                   hidden: true,
                   component: () => import('@/pages/admin/khgl/zzsxq'),
                   meta: { title: '详情', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/jjrgl',
                   name: 'jjrgl',
                   component: () => import('@/pages/admin/khgl/jjrgl'),
                   meta: { title: '经纪人审批', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/jjrxq',
                   name: 'jjrxq',
                   hidden: true,
                   component: () => import('@/pages/admin/khgl/jjrxq'),
                   meta: { title: '详情', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/mxsp',
                   name: 'mxsp',
                   component: () => import('@/pages/admin/khgl/mxsp'),
                   meta: { title: '明星审批', keepAlive: false, permission: ['dashboard'] }
                 },
                 {
                   path: '/khgl/mxxq',
                   name: 'mxxq',
                   hidden: true,
                   component: () => import('@/pages/admin/khgl/mxxq'),
                   meta: { title: '详情', keepAlive: false, permission: ['dashboard'] }
                 }
               ]
             },
             {
               path: '/dkjl',
               name: 'dkjl',
               component: () => import('@/pages/admin/dkjl/dkjl'),
               meta: { title: '打款记录', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/dkjl/dkxq',
               name: 'dkxq',
               component: () => import('@/pages/admin/dkjl/dkxq'),
               hidden: true,
               meta: { title: '打款详情', keepAlive: true, permission: ['form'] }
             },
             {
               path: '/tzxx',
               name: 'tzxx',
               component: () => import('@/pages/admin/tzxx'),

               meta: { title: '通知消息', keepAlive: true, icon: bxAnaalyse, permission: ['form'] }
             },
             // 赞助商
             {
               path: '/myindex',
               name: 'myindex',
               component: () => import('@/pages/sponsor/index'),
               meta: { title: '首页', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/zzgl',
               name: 'szzgl',
               redirect: '/zzgl/wyzz',
               component: PageView,
               meta: { title: '赞助管理', icon: 'team', permission: ['dashboard'] },
               children: [
                 {
                   path: '/zzgl/wyzz',
                   name: 'wyzz',
                   component: () => import('@/pages/sponsor/zzgl/wyzz'),
                   meta: { title: '我要赞助', keepAlive: true, permission: ['form'] }
                 },
                 {
                   path: '/zzgl/wdzz',
                   name: 'wdzz',
                   component: () => import('@/pages/sponsor/zzgl/wdzz'),
                   meta: { title: '我的赞助', keepAlive: true, permission: ['form'] }
                 },
                 {
                   path: '/zzgl/zzjl',
                   name: 'zzjl',
                   component: () => import('@/pages/sponsor/zzgl/zzjl'),
                   meta: { title: '赞助记录', keepAlive: true, permission: ['form'] }
                 }
               ]
             },
             {
               path: '/message',
               name: 'message',
               component: () => import('@/pages/sponsor/message'),
               meta: { title: '通知消息', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/zhxx',
               name: 'zhxx',
               component: () => import('@/pages/sponsor/zhxx'),
               meta: { title: '账户信息', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/zhsz',
               name: 'zhsz',
               hidden: true,
               component: () => import('@/pages/sponsor/zhsz'),
               meta: { title: '账户设置', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             // 经纪人
             {
               path: '/myhome',
               name: 'myhome',
               component: () => import('@/pages/manager/home'),
               meta: { title: '首页', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/jjrmxgl',
               name: 'jjrmxgl',
               component: () => import('@/pages/manager/mxgl'),
               meta: { title: '明星管理', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/hdgl',
               name: 'cjhdgl',
               redirect: '/hdgl/wycj',
               component: PageView,
               meta: { title: '参加活动管理', keepAlive: true, icon: 'team', permission: ['dashboard'] },
               children: [
                 {
                   path: '/hdgl/wycj',
                   name: 'wycj',
                   component: () => import('@/pages/manager/hdgl/wycj'),
                   meta: { title: '我要参加', keepAlive: true, permission: ['index'] }
                 },
                 {
                   path: '/hdgl/cjdhd',
                   name: 'cjdhd',
                   component: () => import('@/pages/manager/hdgl/cjhd'),
                   meta: { title: '我参加的活动', keepAlive: true, permission: ['index'] }
                 },
                 {
                   path: '/sqjl',
                   name: 'sqjl',
                   component: () => import('@/pages/manager/sqjl'),
                   meta: { title: '申请记录', keepAlive: true, permission: ['index'] }
                 }
               ]
             },

             {
               path: '/xxtz',
               name: 'xxtz',
               component: () => import('@/pages/manager/xxtz'),
               meta: { title: '通知消息', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/accountxx',
               name: 'accountxx',
               component: () => import('@/pages/manager/zhxx'),
               meta: { title: '账户信息', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             },
             {
               path: '/accountsz',
               name: 'accountsz',
               hidden: true,
               component: () => import('@/pages/manager/zhsz'),
               meta: { title: '账户设置', keepAlive: true, icon: bxAnaalyse, permission: ['index'] }
             }
             //原有
             //  {
             //    path: '/dashboard',
             //    name: 'dashboard',
             //    redirect: '/dashboard/workplace',
             //    component: RouteView,
             //    meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
             //    children: [
             //      {
             //        path: '/dashboard/analysis',
             //        name: 'Analysis',
             //        component: () => import('@/views/dashboard/Analysis'),
             //        meta: { title: '分析页', keepAlive: false, permission: ['dashboard'] }
             //      },
             //      // 外部链接
             //      {
             //        path: 'https://www.baidu.com/',
             //        name: 'Monitor',
             //        meta: { title: '监控页（外部）', target: '_blank' }
             //      },
             //      {
             //        path: '/dashboard/workplace',
             //        name: 'Workplace',
             //        component: () => import('@/views/dashboard/Workplace'),
             //        meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
             //      }
             //    ]
             //  },
             //  // forms
             //  {
             //    path: '/form',
             //    redirect: '/form/base-form',
             //    component: PageView,
             //    meta: { title: '表单页', icon: 'form', permission: ['form'] },
             //    children: [
             //      {
             //        path: '/form/base-form',
             //        name: 'BaseForm',
             //        component: () => import('@/views/form/BasicForm'),
             //        meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
             //      },
             //      {
             //        path: '/form/step-form',
             //        name: 'StepForm',
             //        component: () => import('@/views/form/stepForm/StepForm'),
             //        meta: { title: '分步表单', keepAlive: true, permission: ['form'] }
             //      },
             //      {
             //        path: '/form/advanced-form',
             //        name: 'AdvanceForm',
             //        component: () => import('@/views/form/advancedForm/AdvancedForm'),
             //        meta: { title: '高级表单', keepAlive: true, permission: ['form'] }
             //      }
             //    ]
             //  },

             //  // list
             //  {
             //    path: '/list',
             //    name: 'list',
             //    component: PageView,
             //    redirect: '/list/table-list',
             //    meta: { title: '列表页', icon: 'table', permission: ['table'] },
             //    children: [
             //      {
             //        path: '/list/table-list',
             //        name: 'TableListWrapper',
             //        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
             //        component: () => import('@/views/list/TableList'),
             //        meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
             //      },
             //      {
             //        path: '/list/basic-list',
             //        name: 'BasicList',
             //        component: () => import('@/views/list/StandardList'),
             //        meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
             //      },
             //      {
             //        path: '/list/card',
             //        name: 'CardList',
             //        component: () => import('@/views/list/CardList'),
             //        meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
             //      },
             //      {
             //        path: '/list/search',
             //        name: 'SearchList',
             //        component: () => import('@/views/list/search/SearchLayout'),
             //        redirect: '/list/search/article',
             //        meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
             //        children: [
             //          {
             //            path: '/list/search/article',
             //            name: 'SearchArticles',
             //            component: () => import('../views/list/search/Article'),
             //            meta: { title: '搜索列表（文章）', permission: ['table'] }
             //          },
             //          {
             //            path: '/list/search/project',
             //            name: 'SearchProjects',
             //            component: () => import('../views/list/search/Projects'),
             //            meta: { title: '搜索列表（项目）', permission: ['table'] }
             //          },
             //          {
             //            path: '/list/search/application',
             //            name: 'SearchApplications',
             //            component: () => import('../views/list/TableList'),
             //            meta: { title: '搜索列表（应用）', permission: ['table'] }
             //          }
             //        ]
             //      }
             //    ]
             //  },
             //  // profile
             //  {
             //    path: '/profile',
             //    name: 'profile',
             //    component: RouteView,
             //    redirect: '/profile/basic',
             //    meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
             //    children: [
             //      {
             //        path: '/profile/basic',
             //        name: 'ProfileBasic',
             //        component: () => import('@/views/profile/basic/Index'),
             //        meta: { title: '基础详情页', permission: ['profile'] }
             //      },
             //      {
             //        path: '/profile/advanced',
             //        name: 'ProfileAdvanced',
             //        component: () => import('@/views/profile/advanced/Advanced'),
             //        meta: { title: '高级详情页', permission: ['profile'] }
             //      }
             //    ]
             //  },

             //  // result
             //  {
             //    path: '/result',
             //    name: 'result',
             //    component: PageView,
             //    redirect: '/result/success',
             //    meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
             //    children: [
             //      {
             //        path: '/result/success',
             //        name: 'ResultSuccess',
             //        component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
             //        meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
             //      },
             //      {
             //        path: '/result/fail',
             //        name: 'ResultFail',
             //        component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
             //        meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
             //      }
             //    ]
             //  },

             //  // Exception
             //  {
             //    path: '/exception',
             //    name: 'exception',
             //    component: RouteView,
             //    redirect: '/exception/403',
             //    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
             //    children: [
             //      {
             //        path: '/exception/403',
             //        name: 'Exception403',
             //        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
             //        meta: { title: '403', permission: ['exception'] }
             //      },
             //      {
             //        path: '/exception/404',
             //        name: 'Exception404',
             //        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
             //        meta: { title: '404', permission: ['exception'] }
             //      },
             //      {
             //        path: '/exception/500',
             //        name: 'Exception500',
             //        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
             //        meta: { title: '500', permission: ['exception'] }
             //      }
             //    ]
             //  },

             //  // account
             //  {
             //    path: '/account',
             //    component: RouteView,
             //    redirect: '/account/center',
             //    name: 'account',
             //    meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
             //    children: [
             //      {
             //        path: '/account/center',
             //        name: 'center',
             //        component: () => import('@/views/account/center/Index'),
             //        meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
             //      },
             //      {
             //        path: '/account/settings',
             //        name: 'settings',
             //        component: () => import('@/views/account/settings/Index'),
             //        meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
             //        redirect: '/account/settings/base',
             //        hideChildrenInMenu: true,
             //        children: [
             //          {
             //            path: '/account/settings/base',
             //            name: 'BaseSettings',
             //            component: () => import('@/views/account/settings/BaseSetting'),
             //            meta: { title: '基本设置', hidden: true, permission: ['user'] }
             //          },
             //          {
             //            path: '/account/settings/security',
             //            name: 'SecuritySettings',
             //            component: () => import('@/views/account/settings/Security'),
             //            meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
             //          },
             //          {
             //            path: '/account/settings/custom',
             //            name: 'CustomSettings',
             //            component: () => import('@/views/account/settings/Custom'),
             //            meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
             //          },
             //          {
             //            path: '/account/settings/binding',
             //            name: 'BindingSettings',
             //            component: () => import('@/views/account/settings/Binding'),
             //            meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
             //          },
             //          {
             //            path: '/account/settings/notification',
             //            name: 'NotificationSettings',
             //            component: () => import('@/views/account/settings/Notification'),
             //            meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
             //          }
             //        ]
             //      }
             //    ]
             //  },

             //  // other
             //  {
             //    path: '/other',
             //    name: 'otherPage',
             //    component: PageView,
             //    meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
             //    redirect: '/other/icon-selector',
             //    children: [
             //      {
             //        path: '/other/icon-selector',
             //        name: 'TestIconSelect',
             //        component: () => import('@/views/other/IconSelectorView'),
             //        meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
             //      },
             //      {
             //        path: '/other/list',
             //        component: RouteView,
             //        meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
             //        redirect: '/other/list/tree-list',
             //        children: [
             //          {
             //            path: '/other/list/tree-list',
             //            name: 'TreeList',
             //            component: () => import('@/views/other/TreeList'),
             //            meta: { title: '树目录表格', keepAlive: true }
             //          },
             //          {
             //            path: '/other/list/edit-table',
             //            name: 'EditList',
             //            component: () => import('@/views/other/TableInnerEditList'),
             //            meta: { title: '内联编辑表格', keepAlive: true }
             //          },
             //          {
             //            path: '/other/list/user-list',
             //            name: 'UserList',
             //            component: () => import('@/views/other/UserList'),
             //            meta: { title: '用户列表', keepAlive: true }
             //          },
             //          {
             //            path: '/other/list/role-list',
             //            name: 'RoleList',
             //            component: () => import('@/views/other/RoleList'),
             //            meta: { title: '角色列表', keepAlive: true }
             //          },
             //          {
             //            path: '/other/list/system-role',
             //            name: 'SystemRole',
             //            component: () => import('@/views/role/RoleList'),
             //            meta: { title: '角色列表2', keepAlive: true }
             //          },
             //          {
             //            path: '/other/list/permission-list',
             //            name: 'PermissionList',
             //            component: () => import('@/views/other/PermissionList'),
             //            meta: { title: '权限列表', keepAlive: true }
             //          }
             //        ]
             //      }
             //    ]
             //  }
           ]
         },
         {
           path: '*',
           redirect: '/404',
           hidden: true
         }
       ]

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
           path: '/test',
           component: BlankLayout,
           redirect: '/test/home',
           children: [
             {
               path: 'home',
               name: 'TestHome',
               component: () => import('@/views/Home')
             }
           ]
         },

         {
           path: '/404',
           component: () => import(/* webpackChunkName: "fail" */ '@/pages/404')
         }
       ]
