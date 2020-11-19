//进行远程调用
import axios from 'axios'
//包装param参数
import qs from 'qs'
// 声明基础访问地址
axios.defaults.baseURL = 'http://localhost:9012/system-demo'

// axios.post(url, qs.stringify(params), {
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//   }).then(res => res.data)
   
  //如果想传过去的参数是对象就是这用形式
//   axios.post(url, qs.parse(qs.stringify(params)), {
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//   }).then(res => res.data)

//声明一个调用方法
// export const requestLogin = params => {
    
//     return axios.post('/user/login',qs.stringify(params)).then(res => res.data)}
export const requestLogin = params => {
    
    return axios.post('/user/login', qs.parse(qs.stringify(params)), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then(res => res.data)}