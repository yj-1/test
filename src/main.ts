import { createApp } from "vue";
// import { Form } from 'ant-design-vue';
import ElementPlus from 'element-plus'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/common/common.scss'
import locale from "element-plus/lib/locale/lang/zh-cn"
import 'element-plus/lib/theme-chalk/index.css';
import "default-passive-events"

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {locale})
  .mount("#app");
