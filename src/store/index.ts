import { createStore } from "vuex";
import { user } from './modules/user'
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
  modules: {
    user
  }
});

export default store
