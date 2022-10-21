// 公共参数
const PROTOCOL = 'http'
const HOST = '192.168.35.39'
const PORT = '3005'
const baseURL = `${PROTOCOL}://${HOST}:${PORT}`
import axios from "axios"
// post请求
export const postFunc = (url, data = {}, option = {headers: "application/x-www-form-urlencoded"}) => {
    return axios.post(`${baseURL}${url}`, data)
    .then(
        response=> {
            return response.data;
        }
    )
}
// get请求
export  const getFunc = (url, data = {}) => {
    return axios.get(`${baseURL}${url}`, {params: data})
    .then(
        response=> {
            return response.data;
        }
    )
}
// 登陆
export const loginFunc = (url, data = {}, option = {headers: "application/x-www-form-urlencoded"}) => {
    return axios.post(`${baseURL}${url}`, data, option)
    .then(
        response=> {
            return response.data;
        }
    )
}
// 注册
export  const registerFunc = (url, data = {}, option = {headers: "application/x-www-form-urlencoded"}) => {
    return axios.post(`${baseURL}${url}`, data, option)
    .then(
        response=> {
            return response.data;
        }
    )
}
// 发送验证码
export  const sendEmailFunc = (url, data = {}) => {
    return axios.get(`${baseURL}${url}`, {params: data})
    .then(
        response=> {
            return response.data;
        }
    )
}
export  const getOrder = (url, data = {}) => {
    return axios.get(`${baseURL}${url}`, {params: data})
    .then(
        response=> {
            return response.data;
        }
    )
}
