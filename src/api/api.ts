import axios, { AxiosInstance } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import router, { routerPush } from '@/router/index'

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
  const token = sessionStorage.getItem('Authorization')
  cfg.headers['Authorization'] = token
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
  console.log(err.request,234)
  const { request: { status, statusText } } = err
  let msg = ""
  let fn:Function|undefined = undefined;
  switch (status) {
    case 401:
      msg = "丢失token权限或token已过期！"
      fn = () => router.push('/login');break;
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
    type: "error",
    duration: 1000
  })
  fn && fn()
  return Promise.reject(err)
})

export default req