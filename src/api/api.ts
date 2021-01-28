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
      if(data.msg) {
        ElMessage({
          showClose: true,
          message: data.msg,
          type: "success"
        })
      }

      return Promise.resolve(data.result)
    } else if(data?.status === 200) {
      ElMessage({
        showClose: true,
        message: data.msg || data.statusText,
        type: "error"
      })
      return Promise.reject({ msg: "暂无数据！" })
    } else {
      ElMessage({
        showClose: true,
        message: data.msg || data.statusText || "未知错误！",
        type: "error"
      })
      return Promise.reject({ msg: '未知！' })
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