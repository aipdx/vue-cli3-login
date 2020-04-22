import axios from 'axios'
import _get from 'lodash.get'
import {Message, Loading } from 'element-ui'
import store from '../store'

/*创建axios实例*/
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,//设置超时时间
  withCredentials: true,//允许携带cookie
  headers: {//解决ie浏览器会自动缓存
    'cache-control': 'no-cache',
    'Pragma': 'no-cache'
  }
})

server.interceptors.response.use(res => {
  const code = _get(res, 'data.code')
  const msg = _get(res, 'data.msg')
  if (code === 50014) { //登录超时
    store.commit('turnOnShowLoginBox') //显示弹窗登录
    return
  }
  if (code !== 1 && code !== 200 & msg) {
    Message.error(msg) //请求错误弹窗错误信息
    return Promise.reject(msg)
  }
  return res.data
},error => {
  return Promise.reject(error)
})
export default server
