import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'

//消息未读
export function unread(){
      return axios({
        url: '/vue/information/listCount',
        method: 'post',
        data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
      })
}
