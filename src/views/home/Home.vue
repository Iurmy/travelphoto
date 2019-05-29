<template>
  <div class="home">
    <router-view/>
    <tabbar class="tabbar">
      <tabbar-item :selected="routeIndex == '/home/index'" link="/home/index">
        <img class="tabbar-item-icon" slot="icon" src="../../assets/img/icon_home@2x.png">
        <img
          class="tabbar-item-icon"
          slot="icon-active"
          src="../../assets/img/icon_home_selection@2x.png"
        >
        <span class="tabbar-item-label" slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="routeIndex == '/home/car'" link="/home/car">
        <img class="tabbar-item-icon" slot="icon" src="../../assets/img/icon_shopping cart@2x.png">
        <img
          class="tabbar-item-icon"
          slot="icon-active"
          src="../../assets/img/icon_shopping cart_selection@2x.png"
        >
        <span class="tabbar-item-label" slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item :selected="routeIndex == '/home/center'" link="/home/center">
        <img
          class="tabbar-item-icon"
          slot="icon"
          src="../../assets/img/icon_personal center@2x.png"
        >
        <img
          class="tabbar-item-icon"
          slot="icon-active"
          src="../../assets/img/icon_personal center_selection@2x.png"
        >
        <span class="tabbar-item-label" slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { Tabbar, TabbarItem } from "vux";

export default {
  name: "home",
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      routeIndex: ""
    };
  },
  created() {
    this.routeIndex = this.$route.path;
  },
  beforeRouteUpdate (to, from, next) {
    this.routeIndex = to.path;
    next()
  }
};
</script>

<style lang="less">
.home {
  .tabbar {
    position: fixed;
    height: 1rem;
    background: #fff;
    .weui-tabbar__label {
      margin-top: 0;
      span {
        font-size: 0.24rem;
      }
    }
    .weui-bar__item_on {
      .weui-tabbar__label {
        color: #ff980c;
      }
    }
    .weui-tabbar__item {
      padding: 0.1rem 0 0;
    }
    .weui-tabbar__icon {
      width: 0.54rem;
      height: 0.54rem;
    }
  }
}
</style>
