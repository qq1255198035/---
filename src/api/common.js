import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'
//const baseUrl = 'server'
//消息未读
export function unread(){
      return axios({
        url:'/vue/information/listCount',
        method: 'post',
        data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
      })
}

//头部消息列表
export function headMsg() {
  return axios({
    url:'/vue/information/listFive',
    method: 'post',
    data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
  })
}

// 信息列表页
export function infoList(condition, offset) {
  return axios({
    url:'/vue/information/list',
    method: 'post',
    data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), condition: condition, limit: 5, offset: offset})
  })
}

// 查看已审批角色信息
export function userInfo(userId) {
return axios({
    url: '/vue/organize/userInfo',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      userId: userId
    })
  })
}
// 查看活动进度
export function campSchedule(campId) {
return axios({
  url: '/vue/admin/campSchedule',
  method: 'post',
  data: qs.stringify({
    token: Vue.ls.get(ACCESS_TOKEN),
    campId: campId
  })
})
}
// 饼图数据接口
export function piesData() {
         return axios({
           url: '/vue/pieData',
           method: 'post',
           data: qs.stringify({
             token: Vue.ls.get(ACCESS_TOKEN),
             
           })
         })
       }
       // 是否通过审批
export function judge() {
  return axios({
    url: '/vue/judge',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
    })
  })
}