import Vue from 'vue'
import Vuex from 'vuex'
import _get from 'lodash.get'
import cookie from 'js-cookie'
import { login,logout } from '../api/login'
import router from '../router'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showTimeoutLogin:false,
    user:{},
    token:'',
    isFirstLogin:false
  },
  mutations: {
    turnOnShowLoginBox(state) {
      state.showTimeoutLogin = true
    },
    turnOffShowLoginBox(state) {
      state.showTimeoutLogin = false
    },
    setToken(state,payload) {
      state.token = payload || ''
    },
    unsetToken(state) {
      state.token = ''
    },
    setUser(state,payload) {
      state.user = payload || {}
    },
    unsetUser(state) {
      state.user = {}
    },
    setFirstLogin(state, payload) {
      state.isFirstLogin = payload
    },
  },
  actions: {
    /*登录*/
    async login(store,payload) {
      await store.dispatch('relogin',payload)
      if (store.rootState.token) { //如果token存在，跳转到首页
        router.push('/')
        store.commit('setFirstLogin',true) //是否第一次登录
      }
    },
    /*退出*/
    async loginout(store) {
      await logout()
      store.dispatch('clearSessionAndBack')
    },
    /*重新登录*/
    async relogin(store,paylad) {//弹窗登录--重新登录
      try {
        const username = _get(paylad,'username')
        const password = _get(paylad,'password')
        const res = await login(username,password)
        if (_get(res,'code') !== 1) {
          return
        }
        const token = _get(res, 'data.token')
        cookie.set(process.env.VUE_APP_SESSION_KEY, token)
        store.commit('setToken',token)
        const user = { username }
        store.commit('setUser',user)
        store.commit('turnOffShowLoginBox')
      }catch (e) {
        console.log(e)
      }
    },
    /*重新登录弹窗点击退出*/
    clearSessionAndBack(store) {
      cookie.remove(process.env.VUE_APP_SESSION_KEY)
      store.commit('unsetToken')
      store.commit('unsetUser')
      router.push('/login')
    }
  },
  plugins: [
    createPersistedState({ reducer: (s) => ({ user: s.user }) }),
  ],
})
