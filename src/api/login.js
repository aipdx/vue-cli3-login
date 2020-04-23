import request from '../request/request.js'

/*登录*/
export function login(username,password) {
  return request({
    url:'/user/login',
    method:'post',
    data: {
      username,
      password
    }
  })
}

/*退出*/
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/*注册*/
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data:data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    token
  })
}

export function getClassify(){
  return request({
    url: '/getcate',
    method: 'get'
  })
}
