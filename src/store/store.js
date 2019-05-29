import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromBuy: 0,
    userId:'bebe00e2c7a548698e0583ef0bd1b10f',
    isBack:false,
    showLoading:false,
    tabBar:'/home/index'
  },
  mutations: {
    increment(state,payload) {
      state.fromBuy += payload.fromBuy
    },
    changeBack(state,payload) {
      state.isBack = payload.isBack
    },
    showLoading(state,payload) {
      state.showLoading = payload.showLoading
    },
    tabBar(state,payload) {
      state.tabBar = payload.tabBar
    },
  },
  actions: {

  }
})
