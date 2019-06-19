import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'
//const baseUrl = 'server'
// 我要赞助列表
export function searchCampList(startime, endtime, offset) {
      return axios({
            url:'/vue/sponsor/searchCampListForSponsor',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  startime: startime,
                  endtime: endtime,
                  limit: 4,
                  offset: offset
            })
      })
}
// 提交赞助
export function saveMySponsor(ssId, price, productName, productNum, productVal, tolMoney, bz) {
      return axios({
           url:'/vue/sponsor/saveMySponsor',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  ssId: ssId,
                  price: price,
                  productName: productName,
                  productNum: productNum,
                  productVal: productVal,
                  tolMoney: tolMoney,
                  bz: bz
           })
      })
}
// 我的赞助
export function searchMySponsor(startime, endtime, offset) {
      return axios({
            url:'/vue/sponsor/searchMySponsor',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  startime: startime,
                  endtime: endtime,
                  limit: 4,
                  offset: offset
            })
      })
}
// 赞助记录列表
export function searchSponsor(name,startime, endtime, offset) {
      return axios({
            url:'/vue/sponsor/searchSponsorRecord',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  name:name,
                  startime: startime,
                  endtime: endtime,
                  limit: 10,
                  offset: offset
            })
      })
}