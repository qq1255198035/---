import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'
//const baseUrl = 'server'
// 明星管理列表
export function starsList(status,name, offset) {
      return axios({
        url: '/vue/agent/searchCampStarForAgent',
        method: 'post',
        data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), status:status, name: name, limit: 8, offset: offset })
      })
}
// 经纪人职业（演员）下拉选
export function getProfession(parames) {
      return axios({
        url: '/vue/agent/getProfession',
        method: 'post',
        data: qs.stringify(parames)
      })
}
// 经纪人国家下拉选
export function getCountry(parames) {
  return axios({
    url: '/vue/agent/getCountry',
    method: 'post',
    data: qs.stringify(parames)
  })
}
// 经纪人修改明星时获取的信息接口
export function searchStarInfo(athleteId) {
  return axios({
    url: '/vue/agent/searchStarInfo',
    method: 'post',
    data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), athleteId: athleteId, internationalization : localStorage.lang})
  })
}
// 图片上传地址
export function getUpload(parameter) {
  return axios({
      url: '/vue/organize/upload',
      method: 'post',
      headers: { "Content-Type": "multipart/form-data" },
      data: parameter
  })
}
// 经纪人修改明星提交接口
export function starUpdate(params) {
          var a = Object.assign({},{token: Vue.ls.get(ACCESS_TOKEN)},params);
          return axios({
            url: '/vue/agent/starUpdate',
            method: 'post',
            data: qs.stringify(a)
    })
}
// 经纪人删除明星
export function starDel(athleteId) {
  return axios({
    url: '/vue/agent/starDel',
    method: 'post',
    data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), athleteId: athleteId })
  })
}
// 获取我要参加列表
export function searchCampList(startime, endtime, offset){
    return axios({
      url: '/vue/agent/searchCampListForAgent',
      method: 'post',
      data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN),internationalization: localStorage.lang, starttime: starttime, endtime: endtime, limit: 4, offset: offset })
    })
}
// 选择明星接口
export function chooseStar() {
  return axios({
    url: '/vue/agent/chooseStar',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN)
    })
  })
}
// 我要参加提交接口
export function wantJoin(campId, athleteId, cost, details) {
  return axios({
    url: '/vue/agent/wantJoin',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      campId: campId,
      athleteId: athleteId,
      cost: cost,
      details: details
    })
  })
}
// 申请记录列表
export function applicationList(startime, endtime, condition, offset) {
  return axios({
    url: '/vue/agent/searchApplicationRecord',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      starttime: startime,
      endtime: endtime,
      condition: condition,
      limit: 10,
      offset: offset
    })
  })
}
// 参加的活动
export async function joinCampAll(year, month) {
  return axios({
    url: '/vue/agent/searchMyJoinCampAll',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      year: year,
      month: month
    })
  })
}
// 参加的活动
export async function joinCampAllYear(year) {
  return axios({
    url: '/vue/agent/searchMyJoinCampAllForYear',
    method: 'post',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      year: year,
    })
  })
}
// 查看明星参加活动详细
export async function searchDetail(campId) {
return axios({
  url: '/vue/agent/searchMyJoinCampDetail',
  method: 'post',
  data: qs.stringify({
    token: Vue.ls.get(ACCESS_TOKEN),
    campId: campId,
    internationalization: localStorage.lang
    
  })
})
}