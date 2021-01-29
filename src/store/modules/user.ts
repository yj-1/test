import { createStore, Store } from 'vuex'
type tsUser = {
  name: string,
  rules: string,
  [name: string]: any
}
export const user = {
  state: {
    name: '',
    rules: ''
  },
  getters: {},
  mutations: {
    setState(store, load: {type: string, value: string}) {
      console.log(load)
      store[load.type] = load.value
    }
  },
  actions: {
    setState(store, load: { type: string, value: string }) {
      console.log(load)
      store[load.type] = load.value
    }
  },
}

