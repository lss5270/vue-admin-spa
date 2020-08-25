import axios from 'axios'
//import Cookies from 'js-cookie'
/*import { store } from '../application'*/
import { getToken } from './auth'
import tools from './index'
const { uuid } = tools

// create an axios instance
const service = axios.create({
  baseURL: '', //process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // headers:{
  //   'Content-Type':'application/json;charset=UTF-8'
  // },
  timeout: 60000 // request timeout default 60s
})

// request interceptor
service.interceptors.request.use(
  config => {
    const requestId = uuid(32, 12)
    //const appId = Cookies.get('tax-app-id')
    const appId = sessionStorage['appId']
    /*if(!appId) alert('appId 为空，请检查程序是否正确初始化。')*/
    /*if(/\?/.test(config.url)){
      config.url += `&appId=${appId}`
    }else{
      config.url += `?appId=${appId}`
    }
    config.url += `&requestId=${requestId}`*/
    // do something before request is sent
    /*if (store.getters.tax_token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.url += `&token=${getToken()}`
      config.headers['X-Token'] = getToken()
    }*/
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data.head
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.errorCode !== "0") {
//       Message({
//         message: res.errorMsg || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 100100000018: 登陆超时; 50012: Other clients logged in; 50014: Token expired;
//       if (res.errorCode === "100100000018" || res.errorCode === 50012 || res.errorCode === 50014) {
//         // to re-login
//         MessageBox.confirm(res.errorMsg, '登录确认', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('tax_user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.errorMsg || 'Error'))
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export function post(url, data = {}, config = {}) {
  return service({
    url,
    method: 'post',
    data: { ...data },
    ...config
  })
}

export function get(url, data = {}, config = {}) {
  return service({
    url,
    method: 'get',
    data: { ...data },
    ...config
  })
}

export async function postAwait(url, data = {}, config = {}){
  return await service.post(url, data, config)
}
export async function getAwait(url, data = {}, config = {}){
  // let queryStr = JSON.stringify(data)
  // queryStr = queryStr.replace(/:/g, '=')
  // queryStr = queryStr.replace(/"/g, '')
  // queryStr = queryStr.replace(/,/, '&')
  // queryStr = queryStr.match(/\{([^)]*)\}/)
  let dataStr = ""; // 数据拼接字符串
  Object.keys(data).forEach(key => {
    if (typeof data[key] == "string") {
      data[key] = data[key].trim();
    }
    dataStr += key + "=" + data[key] + "&";
  });
  dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
  return await service.get(url+"?"+dataStr, JSON.stringify(data), config)
}

export default service
