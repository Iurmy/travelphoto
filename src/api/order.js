import request from '../utils/utils.js'

export function fetchPrepayment (query) {
  return request({
    url: '/order/photoOrder/prepayment',
    method: 'post',
    data: query
  })
}

// 景区可使用
export function fetchScenicAreaUsableList (query) {
  return request({
    url: '/base/discountCoupon/usableList',
    method: 'get',
    params: query
  })
}

//景区不可使用
export function fetchScenicAreaDisabledList (query) {
  return request({
    url: '/base/discountCoupon/disabledList',
    method: 'get',
    params: query
  })
}

//景区可领
export function fetchScenicAreaLedList (query) {
  return request({
    url: '/base/discountCoupon/getListByOrder',
    method: 'get',
    params: query
  })
}

export function fetchOrderReducedInfo (query) {
  return request({
    url: '/base/discountCoupon/orderReducedInfo',
    method: 'get',
    params: query
  })
}

export function fetchPay (query) {
  return request({
    url: '/order/photoOrder/pay',
    method: 'get',
    params: query
  })
}


export function fetchCouponList (query) {
  return request({
    url: '/base/discountCoupon/myList',
    method: 'get',
    params: query
  })
}


export function fetchCouponLedList (query) {
  return request({
    url: '/base/discountCoupon/getList',
    method: 'get',
    params: query
  })
}


export function fetchGetOrderList (query) {
  return request({
    url: '/order/photoOrder/list',
    method: 'get',
    params: query
  })
}

export function fetchGetOrderDetail (query) {
  return request({
    url: '/order/photoOrder/detail',
    method: 'get',
    params: query
  })
}
export function fetchDeleteOrderDetail (query) {
  return request({
    url: '/order/photoOrder/delete',
    method: 'get',
    params: query
  })
}
