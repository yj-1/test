import { createStore } from "vuex";

const store = createStore({
  state: {
    RouterView: false,
  },
  mutations: {
    setRouterView(state, val) {
      state.RouterView = val
    } // 修改路由视图
  },
  actions: {},
  modules: {}
});

export default store
