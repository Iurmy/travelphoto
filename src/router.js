import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'


const HomeIndex = () => import('./views/home/HomeIndex.vue')
const HomeCar = () => import('./views/home/HomeCar.vue')
const HomeCenter = () => import('./views/home/HomeCenter.vue')
const Order = () => import('./views/order/Order.vue')
const Coupon = () => import('./views/order/Coupon.vue')
const Gallery = () => import('./views/gallery/Gallery.vue')
const GalleryIs = () => import('./views/gallery/GalleryIs.vue')
const OrderList = () => import('./views/order/List.vue')
const OrderDetail = () => import('./views/order/Detail.vue')

// Router.prototype.go = function () {
//   this.isBack = true
//   window.history.go(-1)
// }

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    {
      path: '/home',
      redirect: '/home/index'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          component: HomeIndex,
          meta: {
            hierarchy: 0
          }
        },
        {
          path: 'car',
          component: HomeCar,
          meta: {
            hierarchy: 0
          }
        },
        {
          path: 'center',
          component: HomeCenter,
          meta: {
            hierarchy: 0
          }
        }
      ]
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
      meta: {
        hierarchy: 1
      }
    }, {
      path: '/gallerys',
      name: 'GalleryIs',
      component: GalleryIs,
      meta: {
        hierarchy: 1
      }
    },
    {
      path: '/preview',
      name: 'order',
      component: Order,
      meta: {
        hierarchy: 1
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        hierarchy: 1
      }
    },
    {
      path: '/purchase',
      name: 'orderlist',
      component: OrderList,
      meta: {
        hierarchy: 1
      }
    },
    {
      path: '/purchasedetail/:id',
      name: 'orderdetail',
      component: OrderDetail,
      meta: {
        hierarchy: 1
      }
    }
  ]
})
