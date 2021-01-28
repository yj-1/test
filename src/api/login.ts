import { AxiosResponse } from 'axios'
import req from './api'

export const Register = async (data) => {
  return req({
    method: "POST",
    url: '/register',
    data
  })
  .then(data => {
    console.log(data)
  })
}
type tsLogin = {
  token: string;
  [name: string]: any;
}
export const Login = async (data) => {
  return req({
    method: "POST",
    url: "/login",
    data
  })
    .then((data:any) => {
    sessionStorage.clear()
    console.log(data, "测试")
    sessionStorage.setItem("Authorization", data.token)
    return Promise.resolve()
  })
  .catch(err => err)
}

export const getProfiles = async () => {
  return req({
    method: "GET",
    url: "/profiles"
  })
}

export const addProfile = async (data) => {
  return req({
    method: "POST",
    url: "/profiles/add",
    data
  })
}

export const delProfile = async (id) => {
  return req({
    method: "POST",
    url: `/profiles/delete/${id}`
  })
}