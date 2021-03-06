import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
import qs from 'qs'
//const baseUrl = 'server'
//管理员活动审批页活动待审批，已审批，总计数据
export function approvalNumber() {
      return axios({
            url:'/vue/admin/approvalNumber',
            method: 'post',
            data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
      })
}
// 管理员活动审批列表
export function searchCampList(content, offset, status) {
      return axios({
            url:'/vue/admin/searchCampList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  content: content,
                  offset: offset,
                  limit: 8,
                  status: status,
                  internationalization: localStorage.lang
            })
      })
}
// 审批活动接口
export function campApproval(campId, reject, agreement) {
      return axios({
            url:'/vue/admin/campApproval',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId,
                  reject: reject,
                  agreement: agreement,
                  internationalization: localStorage.lang
            })
      })
}
// 管理员活动审批页活动待认证，已认证，总计数据
export function authenNumber() {
      return axios({
            url:'/vue/admin/authenticationNumber',
            method: 'post',
            data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN) })
      })
}
// 管理员活动认证列表
export function searchAuthenCampList(content, offset,status) {
      return axios({
            url: '/vue/admin/searchAuthenticationCampList',
            method: 'post',
            data: qs.stringify({ token: Vue.ls.get(ACCESS_TOKEN), content: content, offset: offset, limit: 8,status: status, internationalization: localStorage.lang })
      })
}
// 认证活动接口
export function campAuthen(campId, reject, agreement) {
      return axios({
            url:'/vue/admin/campAuthentication',
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
            url:'/vue/admin/searchCampInformation',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId,
                  internationalization: localStorage.lang
            })
      })
}
// 查看贊助信息
export function searchCampSponsor(campId) {
      return axios({
            url:'/vue/admin/searchCampSponsor',
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
            url:'/vue/admin/campHeadInfo',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  campId: campId,
                  internationalization: localStorage.lang
            })
      })
}
// 搞手审批列表
export function gsspList(condition, status, offset, starttime, endtime) {
      return axios({
        url: '/vue/admin/organizeExamineList',
        method: 'post',
        data: qs.stringify({
          token: Vue.ls.get(ACCESS_TOKEN),
            limit: 8,
          condition: condition,
          status: status,
          offset: offset,
          starttime: starttime,
          endtime: endtime
        })
      })
}
// 经纪人审批列表
export function jjrspList(condition, status, offset, starttime, endtime) {
      return axios({
        url: '/vue/admin/agentExamineList',
        method: 'post',
        data: qs.stringify({
          token: Vue.ls.get(ACCESS_TOKEN),
          condition: condition,
          status: status,
          limit: 8,
          offset: offset,
          starttime: starttime,
          endtime: endtime
        })
      })
}
// 赞助商审批列表
export function zzsspList(condition, status, offset, starttime, endtime) {
      return axios({
        url: '/vue/admin/sponsorExamineList',
        method: 'post',
        data: qs.stringify({
          token: Vue.ls.get(ACCESS_TOKEN),
          condition: condition,
          status: status,
          limit: 8,
          offset: offset,
          starttime: starttime,
          endtime: endtime
        })
      })
}
// 明星审批列表
export function mxspList(condition, status, offset, starttime, endtime) {
      return axios({
        url: '/vue/admin/starExamineList',
        method: 'post',
        data: qs.stringify({
          token: Vue.ls.get(ACCESS_TOKEN),
          condition: condition,
          status: status,
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
           url:'/vue/admin/organizeApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  orgId: orgId,
                  reject: reject,
                  agreement: agreement,
                  internationalization: localStorage.lang
           })
      })
}
//经纪人审批接口
export function agentApproval(agentId, reject, agreement) {
      return axios({
           url:'/vue/admin/agentApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  agentId: agentId,
                  reject: reject,
                  agreement: agreement,
                  internationalization: localStorage.lang
           })
      })
}
//经纪人审批接口
export function sponsorApproval(brandId, reject, agreement) {
         return axios({
           url:'/vue/admin/sponsorApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  brandId: brandId,
                  reject: reject,
                  agreement: agreement,
                  internationalization: localStorage.lang
           })
      })
}
//明星审批接口
export function starApproval(athleteId, reject, agreement) {
      return axios({
           url:'/vue/admin/starApproval',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  athleteId: athleteId,
                  reject: reject,
                  agreement: agreement,
                  internationalization: localStorage.lang
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
            url:'/vue/admin/sendMessage',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  title: title,
                  content: content,
                  recipients: recipients,
           })
      })
}
// 打款记录列表
export function transferMoneyList(condition, offset, starttime, endtime) {
      return axios({
            url:'/vue/admin/transferMoneyList',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  condition: condition,
                  status: 9,
                  limit: 10,
                  offset: offset,
                  starttime: starttime,
                  endtime: endtime
            })
      })
}
// 打款记录选择活动接口
export function allCamp() {
      return axios({
            url: '/vue/admin/getAllCamp',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
            })
      })
}
// 选择汇款方式
export function allCampway(campId) {
      return axios({
        url:'/vue/admin/getAllPurpose',
        method: 'post',
        data: qs.stringify({
          token: Vue.ls.get(ACCESS_TOKEN),
          campId: campId
        })
      })
}
// 新增打款记录接口
export function addTransferMoney(payCompany, receiveCompany, payment, balance, payAccount, bz, receiveAccount, receiveBank, serviceCharge, campId, type, recordId) {
         return axios({
           url:'/vue/admin/addTransferMoney',
           method: 'post',
           data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN),
                  payCompany: payCompany,
                  receiveCompany: receiveCompany,
                  payment: payment,
                  balance: balance,
                  payAccount: payAccount,
                  receiveAccount: receiveAccount,
                  bz: bz,
                  receiveBank: receiveBank,
                  serviceCharge: serviceCharge,
                  campId: campId,
                  type: type,
                  recordId: recordId
            })
      })
}
// 获取头部未审批数据
export function rightInfo() {
      return axios({
            url: '/vue/rightInfo',
            method: 'post',
            data: qs.stringify({
                  token: Vue.ls.get(ACCESS_TOKEN), 
            })
      })
}