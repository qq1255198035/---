import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */


//注册

export function register(api, parameter) {
  return axios({
    url: api,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

//登录

export function login (parameter) {
  return axios({
    url: '/vue/login',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

//获取验证码
export function getSmsCaptcha (parameter) {
  return axios({
    url: 'vue/code',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// export function logout () {
//   return axios({
//     url: '/auth/logout',
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
