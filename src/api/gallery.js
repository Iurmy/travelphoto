import request from '../utils/utils.js'

export function fetchAddCar (query) {
  return request({
    url: '/order/cart/add',
    method: 'post',
    data: query
  })
}

export function fetchTotalCount (query) {
  return request({
    url: '/order/cart/totalCount',
    method: 'get',
    params: query
  })
}

export function fetchImgInfo (query) {
  return request({
    url: '/photo/info',
    method: 'get',
    params: query
  })
}

export function fetchDeleteImg (query) {
  return request({
    url: '/photo/deleteById',
    method: 'get',
    params: query
  })
}
