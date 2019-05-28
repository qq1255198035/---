import Vue from 'vue'
import { login, getInfo, logout, getProjects } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { loadLanguageAsync } from '@/lang'
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    tel: '',
    notice: [],
    lang: 'zh-TW'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_TEL: (state, tel) => {
      state.tel = tel
    },
    SET_NOTICE: (state, notice) => {
      state.notice = notice
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.result
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetNotice({ commit }, api) {
      return new Promise((resolve, reject) => {
        getProjects(api)
          .then(res => {
            if (res.status == 200) {
              commit('SET_NOTICE', res.data)
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const result = response.result
            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)
            commit('SET_TEL', result.telephone)
            //dispatch('SetLang', result.lang)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    },
    SetLang({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default user
