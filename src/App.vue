<template>
  <div id="app">
    <transition :name="back">
      <keep-alive include="HomeIndex,home">
        <router-view class="child-view"/>
      </keep-alive>
    </transition>
    <loading :show="showLoading" text></loading>
  </div>
</template>
<script>
import { Loading } from "vux";

export default {
  data() {
    return {};
  },
  components: {
    Loading
  },
  computed: {
    back() {
      return this.$store.state.isBack ? "slide-left" : "slide-right";
    },
    showLoading() {
      return this.$store.state.showLoading;
    }
  },
  methods: {}
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  // height: 100%;
  // overflow: auto;
  // margin: 0;
  // -webkit-transform: translate3d(0, 0, 0);
  // transform: translate3d(0, 0, 0);
  a {
    text-decoration: none;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .vux-toast {
    .weui-toast {
      width: 3rem !important;
      .weui-toast__content {
        font-size: 0.26rem;
      }
    }
  }
  .vux-loading-no-text .weui-toast {
    width: 2rem;
    height: 2rem;
    min-height: 2rem;
    margin: 0 auto;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.child-view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.4s ease-out;
  position: absolute;
}
.slide-right-enter {
  // opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  // opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

a,
input,
label,
.vux-check-icon {
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0) !important;
}

input:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
}

input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}

.fl {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.fl-col {
  flex-direction: column;
}

.fl-1 {
  flex: 1;
}

.fl-wrap {
  flex-wrap: wrap;
}

.fl-jc-ctr {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.fl-jc-str {
  -webkit-box-pack: flex-start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: flex-start;
  justify-content: flex-start;
}

.fl-jc-end {
  -webkit-box-pack: flex-end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
}

.fl-jc-btn {
  -webkit-box-pack: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
  justify-content: space-between;
}

.fl-ai-ctr {
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
