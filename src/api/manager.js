import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'

// 明星管理列表
export function starsList(name, offset) {
      return axios({
        url: '/vue/agent/searchCampStarForAgent',
        method: 'post',
        data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), name: name, limit: 8, offset: offset })
      })
}
// 经纪人职业（演员）下拉选
export function getProfession() {
      return axios({
        url: '/vue/agent/getProfession',
        method: 'post'
      })
}
// 经纪人国家下拉选
export function getCountry() {
  return axios({
    url: '/vue/agent/getCountry',
    method: 'post'
  })
}
// 经纪人修改明星时获取的信息接口
export function searchStarInfo(athleteId) {
  return axios({
    url: '/vue/agent/searchStarInfo',
    method: 'post',
    data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), athleteId: athleteId })
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
export function starUpdate(
         surname,
         monicker,
         catalog,
         nationality,
         birth,
         height,
         weight,
         addr,
         introduction,
         sex,
         avatar,
         imgs,
         credential,
         athleteId
       ) {
         return axios({
           url: '/vue/agent/starUpdate',
           method: 'post',
           data: qs.stringify({
             token: Vue.ls.get(ACCESS_TOKEN),
             surname: surname,
             monicker: monicker,
             catalog: catalog,
             nationality: nationality,
             birth: birth,
             height: height,
             weight: weight,
             addr: addr,
             introduction: introduction,
             sex: sex,
             avatar: avatar,
             imgs: imgs,
             credential: credential,
             athleteId: athleteId
           })
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
      data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), startime: startime, endtime: endtime, limit: 4, offset: offset })
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
      startime: startime,
      endtime: endtime,
      condition: condition,
      limit: 10,
      offset: offset
    })
  })
}
// 申请记录
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
// 查看明星参加活动详细
export async function searchDetail(campId) {
return axios({
  url: '/vue/agent/searchMyJoinCampDetail',
  method: 'post',
  data: qs.stringify({
    token: Vue.ls.get(ACCESS_TOKEN),
    campId: campId,
    
  })
})
}