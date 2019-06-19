import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'
//const baseUrl = 'server'
//赞助详情
export function getSponsor(parameter) {
    return axios({
        url:'/vue/organize/searchCampSponsor',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 活动推广信息详情
export function getExtension(parameter) {
    return axios({
        url:'/vue/organize/searchCampGeneralize',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 查看活动详情
export function getCheckActivitiesDetail(parameter) {
    return axios({
        url:'/vue/organize/searchCampDetails',
        method: 'post',
        data: qs.stringify(
            parameter
        )
    })
}
// 搞手活动基本信息
export function getActivitySearchCamp(parameter) {
    return axios({
        url:'/vue/organize/searchCampInformation',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 查询活动基本信息
export function getActivityInformation(parameter) {
    return axios({
        url:'/vue/organize/searchCampBasicInformation',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 查询推广信息接口
export function getCheckInformation(parameter) {
    return axios({
        url:'/vue/organize/searchFeatureDisc',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 搞手赞助审批列表接口
export function getApprovalList(parameter) {
    return axios({
        url: '/vue/organize/searchCampSponsorForOrganize',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 搞手赞助审批
export function getApproval(parameter) {
    return axios({
        url:'/vue/admin/sponsorApproval',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 搞手审批明星列表
export function getStarList(parameter) {
    return axios({
        url:'/vue/organize/searchCampStarForOrgainize',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 搞手明星通过
export function getStarCheck(parameter) {
    return axios({
        url:'/vue/organize/starApproval',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 参加明星
export function getJoinStar(parameter) {
    return axios({
        url:'/vue/organize/searchCampJoinStar',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 明星详情
export function getStarInfo(parameter) {
    return axios({
        url: '/api/vue/agent/starUserInfo',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 我的赞助列表
export function getMineSupport(parameter) {
    return axios({
        url:'/vue/organize/searchCampMySponsorForOrganize',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//搞手活动管理列表
export function getHandActivities(parameter) {
    return axios({
        url:'/vue/organize/searchCampListForOrganize',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//赞助数据详情
export function getSponsorshipdetails(parameter) {
    return axios({
        url:'/vue/organize/brandSponsorAmount',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 我的消息(5)
export function getMyFiveNews(parameter) {
    return axios({
        url:'/vue/information/listFive',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 我的消息(全部)
export function getMyAllNews(parameter) {
    return axios({
        url:'/vue/information/list',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 修改账户信息
export function getChangeInformation(parameter) {
    return axios({
        url: '/vue/organize/userInfoUpdate',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//赞助消息接口
export function getSponsoredTweets(parameter) {
    return axios({
        url:'/vue/organize/searchCampSponsor',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//搞手用户信息
export function getUserInformation(parameter) {
    return axios({
        url:'/vue/organize/userInfo',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 校验修改还是新增
export function getActivityTest(parameter) {
    return axios({
        url:'/vue/organize/validateUnique',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//活动基本信息修改确定
export function getActivityModification(parameter) {
    return axios({
        url:'/vue/organize/updateCampBasicInformation',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//活动详情修改确定
export function getDetailsActivity(parameter) {
    return axios({
        url: '/vue/organize/updateCampDetails',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 活动推广
export function getActivityPromotion(parameter) {
    return axios({
        url: '/vue/organize/updateCampGeneralize',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 活动赞助
export function getEventSponsorship(parameter) {
    return axios({
        url: '/vue/organize/updateCampSponsor',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//上传图片
export function getUpload(parameter) {
    return axios({
        url: '/vue/organize/upload',
        method: 'post',
        headers: { "Content-Type": "multipart/form-data" },
        data: parameter
    })
}
//提交审核并且创建
export function getSubmitAudit(parameter) {
    return axios({
        url: '/vue/organize/commitCamp',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//活动地点
export function getPlace(parameter) {
    return axios({
        url:'/vue/organize/area',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//活动分类
export function getClassify(parameter) {
    return axios({
        url:'/vue/organize/getCampType',
        method: 'post',
        data: qs.stringify(parameter)
    })
}