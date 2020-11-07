'use strict'

// import modals from '../modals'

/**
 * 用户信息
 * @type {{mutations: {saveLoginInfo(*=, *=): void, changeLoginState(*, *): void}, state: {isLogin: number, user: {name: string, userId: number, account: string}}, getters: {}, actions: {saveLoginInfo({commit: *}, *=): void, changeLoginState({commit: *}): void}}}
 */
const user = {
  state: {
    user: {
      userId: 0,
      //账号
      account: '',
      //姓名
      name: '',
      roleId: '',
      roleBtns:''
    }
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    /**
     * 保存用户信息
     * @param state
     * @param userInfo
     */
    saveLoginInfo (state, userInfo) {
      state.user.userId = userInfo.userId
      state.user.account = userInfo.account
      state.user.name = userInfo.name
      state.user.roleId = userInfo.roleId
      state.user.roleBtns = userInfo.roleBtns
    }
  },
  actions: {
    saveLoginInfo ({commit}, userInfo) {
      commit('saveLoginInfo', userInfo)
    }
  }
}

export default user
