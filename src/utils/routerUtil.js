import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'
// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: () => import('@/layouts/BasicLayout'),
  BlankLayout: () => import('@/layouts/BlankLayout'),
  RouteView: () => import('@/layouts/RouteView'),
  PageView: () => import('@/layouts/PageView'),

  // 搞手路由
  issuerHome: () => import('@/pages/Issuer/home'),
  issuerHdgl: () => import('@/pages/Issuer/activies/hdgl'),
  zzsp: () => import('@/pages/Issuer/activies/zzgl'),
  issuerMxsp: () => import('@/pages/Issuer/activies/hdgl'),
  issuerCjhd: () => import('@/pages/Issuer/activies/cjhd'),
  issuerCkhd: () => import('@/pages/Issuer/activies/details'),
  issuerMxxq: () => import('@/pages/Issuer/activies/starsdetail'),
  // 管理员路由
  adminHome: () => import('@/pages/admin/index'),
  hdsp: () => import('@/pages/admin/hdgl/hdsp'),
  hdrz: () => import('@/pages/admin/hdgl/hdrz'),
  ckhd: () => import('@/pages/admin/hdgl/ckhd'),
  gssp: () => import('@/pages/admin/khgl/gsgl'),
  gsxq: () => import('@/pages/admin/khgl/gsxq'),
  zzssp: () => import('@/pages/admin/khgl/zzsgl'),
  zzsxq: () => import('@/pages/admin/khgl/zzsxq'),
  jjrsp: () => import('@/pages/admin/khgl/jjrgl'),
  jjrxq: () => import('@/pages/admin/khgl/jjrxq'),
  mxsp: () => import('@/pages/admin/khgl/mxsp'),
  mxxq: () => import('@/pages/admin/khgl/mxxq'),
  dkjl: () => import('@/pages/admin/dkjl/dkjl'),
  dkxq: () => import('@/pages/admin/dkjl/dkxq'),
  admintzxx: () => import('@/pages/admin/tzxx'),
  // 贊助商路由
  sponsorHome: () => import('@/pages/sponsor/index'),
  wyzz: () => import('@/pages/sponsor/zzgl/wyzz'),
  wdzz: () => import('@/pages/sponsor/zzgl/wdzz'),
  zzjl: () => import('@/pages/sponsor/zzgl/zzjl'),
  // 经纪人路由
  managerHome: () => import('@/pages/manager/home'),
  mxgl: () => import('@/pages/manager/mxgl'),
  wycj: () => import('@/pages/manager/hdgl/wycj'),
  cjhd: () => import('@/pages/manager/hdgl/cjhd'),
  sqjl: () => import('@/pages/manager/sqjl'),
  // 通用路由
  tzxx: () => import('@/pages/common/notices'),
  zhxx: () => import('@/pages/common/accountInfo'),
  zhsz: () => import('@/pages/common/accountSet')
  // ...more
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

/**
 * 获取后端路由信息的 axios API
 * @returns {Promise}
 */
export const getRouterByUser = () => {
  return axios({
    url: '/vue/menu',
    method: 'post',
    data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
    /* headers: {
      'Access-Token': 'xxx'
    }
    */
  })
}

/**
 * 获取路由菜单信息
 *
 * 1. 调用 getRouterByUser() 访问后端接口获得路由结构数组
 *    @see https://github.com/sendya/ant-design-pro-vue/blob/feature/dynamic-menu/public/dynamic-menu.json
 * 2. 调用
 * @returns {Promise<any>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    // ajax
    getRouterByUser().then(res => {
      const result = res.data
      console.log(res.data)
      const routers = generator(result)
      routers.push(notFoundRouter)
      console.log(routers)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      hidden: item.hidden || false,
      component: constantRouterComponents[item.component || item.key],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: { title: item.title, icon: item.icon || undefined }
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}
