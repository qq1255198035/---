import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'

//管理员活动审批页活动待审批，已审批，总计数据
export function approvalNumber() {
      return axios({
            url: '/vue/admin/approvalNumber',
            method: 'post',
            data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
      })
}
// 管理员活动审批列表
export function searchCampList(content, offset, status) {
      return axios({
            url: '/vue/admin/searchCampList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  content: content,
                  offset: offset,
                  limit: 8,
                  status: status
            })
      })
}
// 审批活动接口
export function campApproval(campId, reject, agreement) {
      return axios({
            url: '/vue/admin/campApproval',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId,
                  reject: reject,
                  agreement: agreement
            })
      })
}
// 管理员活动审批页活动待认证，已认证，总计数据
export function authenNumber() {
      return axios({
            url: '/vue/admin/authenticationNumber',
            method: 'post',
            data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
      })
}
// 管理员活动认证列表
export function searchAuthenCampList(content, offset,status) {
      return axios({
            url: '/vue/admin/searchAuthenticationCampList',
            method: 'post',
            data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), content: content, offset: offset, limit: 8,status: status })
      })
}
// 认证活动接口
export function campAuthen(campId, reject, agreement) {
      return axios({
            url: '/vue/admin/campAuthentication',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId,
                  reject: reject,
                  agreement: agreement
            })
      })
}
// 查看活动信息
export function campInformation(campId) {
      return axios({
            url: '/vue/admin/searchCampInformation',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId
            })
      })
}
// 查看贊助信息
export function searchCampSponsor(campId) {
      return axios({
            url: '/vue/admin/searchCampSponsor',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId
            })
      })
}
// 查看明星
export function searchCampStar(campId) {
      return axios({
            url: '/vue/admin/searchCampStar',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId
            })
      })
}
// 查看活动头部信息
export function campHeadInfo(campId) {
      return axios({
            url: '/vue/admin/campHeadInfo',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId
            })
      })
}
// 搞手审批列表
export function gsspList(condition, offset, starttime, endtime) {
      return axios({
            url: '/vue/admin/organizeExamineList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  condition: condition,
                  stutus: 9,
                  limit: 8,
                  offset: offset,
                  starttime: starttime,
                  endtime: endtime
            })
      })
}
// 经纪人审批列表
export function jjrspList(condition, offset, starttime, endtime) {
      return axios({
            url: '/vue/admin/agentExamineList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  condition: condition,
                  stutus: 9,
                  limit: 8,
                  offset: offset,
                  starttime: starttime,
                  endtime: endtime
            })
      })
}
// 赞助商审批列表
export function zzsspList(condition, offset, starttime, endtime) {
      return axios({
            url: '/vue/admin/sponsorExamineList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  condition: condition,
                  stutus: 9,
                  limit: 8,
                  offset: offset,
                  starttime: starttime,
                  endtime: endtime
            })
      })
}
// 明星审批列表
export function mxspList(condition, offset, starttime, endtime) {
      return axios({
            url: '/vue/admin/starExamineList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  condition: condition,
                  stutus: 9,
                  limit: 8,
                  offset: offset,
                  starttime: starttime,
                  endtime: endtime
            })
      })
}
// 搞手审批接口
export function organizeApproval(orgId, reject, agreement) {
      return axios({
           url: '/vue/admin/organizeApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  orgId: orgId,
                  reject: reject,
                  agreement: agreement
           })
      })
}
//经纪人审批接口
export function agentApproval(agentId, reject, agreement) {
      return axios({
           url: '/vue/admin/agentApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  agentId: agentId,
                  reject: reject,
                  agreement: agreement
           })
      })
}
//经纪人审批接口
export function sponsorApproval(brandId, reject, agreement) {
         return axios({
           url: '/vue/admin/sponsorApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  brandId: brandId,
                  reject: reject,
                  agreement: agreement
           })
      })
}
//明星审批接口
export function starApproval(athleteId, reject, agreement) {
      return axios({
           url: '/vue/admin/starApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  athleteId: athleteId,
                  reject: reject,
                  agreement: agreement
           })
      })
}
// 选择发送人接口
export function selectActor(){
      return axios({
            url: '/vue/admin/getUserList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
            })
      })
}
// 发送消息接口
export function sendMessage(title, content, recipients) {
      return axios({
            url: '/vue/admin/sendMessage',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  title: title,
                  content: content,
                  recipients: recipients,
           })
      })
}