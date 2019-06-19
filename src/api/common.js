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