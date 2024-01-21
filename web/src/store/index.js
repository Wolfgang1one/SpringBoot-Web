import { createStore } from 'vuex'

import { reactive } from 'vue'
//组件间共享，刷新后不能保存值
export const store = reactive({
  count: 5
})



const state={
	user:{},
	isLogin:false
}

const mutations = {
  LoginStatus(state,flag) {
    state.isLogin=flag
  }
}

const actions={
	setLoginStatus:({commit},flag)=>commit("LoginStatus",flag)
}

export default createStore({
  state,
  actions,
  mutations
})