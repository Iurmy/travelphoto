import request from '../utils/utils.js'

export function fetchCarList (query) {
  return request({
    url: '/order/cart/list',
    method: 'get',
    params: query
  })
}
export function fetchHomeList (query) {
  return request({
    url: '/photo/homeList',
    method: 'get',
    params: query
  })
}

export function fetchHomeBuyList (query) {
  return request({
    url: '/photo/userPhotoList',
    method: 'get',
    params: query
  })
}

export function fetchRemoveCar (query) {
  return request({
    url: '/order/cart/remove',
    method: 'get',
    params: query
  })
}

export function fetchList (query) {
  return request({
    url: '/photo/homeList',
    method: 'post',
    data: query
  })
}

export function fetchLogin (query) {
  return request({
    url: '/base/wechat/authorize',
    method: 'get',
    params: query
  })
}