import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from './utils/utils.js'
import VueScroller from 'vue-scroller'
import VueAxios from 'vue-axios'
import "swiper/dist/css/swiper.min.css";

Vue.use(VueScroller)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  store.commit('changeBack', {
    isBack: to.meta.hierarchy > from.meta.hierarchy
  })
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
