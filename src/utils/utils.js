import axios from 'axios'
import store from '../store/store'

axios.defaults.timeout = 30000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  // console.log(config)
  // const isToken = (config.data || {}).isToken === false
  // if (store.getters.access_token && !isToken) {
  //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  // const TENANT_ID = getStore({name: 'tenantId'})
  // if (TENANT_ID) {
  //   config.headers['TENANT_ID'] = TENANT_ID // 租户ID
  // }
  // // headers中配置serialize为true开启序列化
  // if (config.methods === 'post' && config.headers.serialize) {
  //   config.data = serialize(config.data)
  //   delete config.data.serialize 
  // }
  store.commit('showLoading', {
    showLoading: true
  })
  
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(res => {
  store.commit('showLoading', {
    showLoading: false
  })
  // const status = Number(res.status) || 200
  // const message = res.data.msg || errorCode[status] || errorCode['default']
  // console.log(res)
  // if (res.data.code === 1) {
  //   return Promise.reject(new Error(message))
  // }
  // if (status === 401) {
  // }
  // if (status !== 200) {
  //   return Promise.reject(new Error(message))
  // }

  return res
}, error => {
  return Promise.reject(new Error(error))
})

export default axios
