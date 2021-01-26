import axios, { AxiosInstance } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)
const req: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})
let Loading;

req.interceptors.request.use(cfg => {
  Loading = ElLoading.service({
    text: "加载中···",
    fullscreen: true
  })
  const token = sessionStorage.getItem('Authentization')
  cfg.headers['Authentization'] = token
  // if (!sessionStorage.getItem('Authentization')) {
  //   location.href = '/login'
  // } else {

  // }
  console.log(cfg)
  return cfg
})



req.interceptors.response.use(cfg => {
  setTimeout(() => {
    Loading.close()
  }, 300)
  const { status, statusText, data } = cfg
  if (status === 200) {
    console.log(data)
    if (data?.result) {
      return Promise.resolve(data)
    } else {
      ElMessage({
        showClose: true,
        message: "暂时无数据！",
        type: "error"
      })
      return Promise.reject({ msg: '暂时无数据！' })
    }
  } else {
    ElMessage({
      showClose: true,
      message: "statusText",
      type: "error"
    })
    return Promise.reject({ statusText })
  }
}, err => {
  setTimeout(() => {
    Loading.close()
  }, 300)
  console.log(err.request)
  const { request: { status, statusText } } = err
  let msg = ""
  switch (status) {
    case 404:
    case 403:
    case 402:
    case 500:
    case 502:
      msg = statusText; break;
  }
  ElMessage({
    showClose: true,
    message: msg,
    type: "error"
  })
  return Promise.reject(err)
})

export default req