import { createApp } from "vue";
// import { Form } from 'ant-design-vue';
import ElementPlus from 'element-plus'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-plus/lib/theme-chalk/index.css';

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
