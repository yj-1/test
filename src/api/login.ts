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
    // sessionStorage.clear()
    console.log(data)
    sessionStorage.setItem("Authentization", data.token)
    console.log(data)
  })
  .catch(err => err)
}

export const getProfiles = async () => {
  return req({
    method: "GET",
    url: "/profiles"
  })
}