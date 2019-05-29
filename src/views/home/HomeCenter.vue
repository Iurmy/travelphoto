<template>
  <div class="center">
    <div class="container">
      <div class="bannerWrap">
        <div class="toolBarWrap">
          <img
            src="../../assets/img/icon_service@2x.png"
            class="customerIcon"
            bindtap="enterCustomer"
          >
          <img src="../../assets/img/icon_setup@2x.png" class="setUpIcon" @click="modeChange" bindtap="enterSetUp">
        </div>
        <div class="userPhoto">
          <!-- <open-data type="userAvatarUrl"></open-data> -->
        </div>
        <div class="userName">
          <!-- <open-data type="userNickName"></open-data> -->
        </div>
        <img src="../../assets/img/userAvatarBg.jpg" class="bannerImg" mode="widthFix">
      </div>
      <div class="contentWrap">
        <div class="functionList">
          <div class="functionItem" @click="enterMyOrder">
            <div class="orderItem">
              <img class="itemIcon" src="../../assets/img/icon_order@2x.png">
              <span class="functionItemText">我的订单</span>
            </div>
          </div>

          <div class="functionItem" @click="enterMyCoupon">
            <div class="orderItem">
              <img class="itemIcon couponIcon" src="../../assets/img/icon_coupon@2x.png">
              <span class="functionItemText">优惠卷</span>
            </div>
          </div>

          <div class="functionItem" @click="enterQRcode">
            <div class="orderItem">
              <img class="itemIcon qrcodeIcon" src="../../assets/img/icon_qrcode@2x.png">
              <span class="functionItemText">二维码</span>
            </div>
          </div>

          <div class="functionItem" @click="enterScan">
            <div class="orderItem">
              <img class="itemIcon scanIcon" src="../../assets/img/icon_scan@2x.png">
              <span class="functionItemText">扫一扫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="maskWrap" v-if="maskState" bindtap="modeChange"></div>
    <div class="maskContent customerContent" v-if="customerState">
      <div class="titleWrap customerTitleWrap">
        <text>客服</text>
        <img
          src="../../assets/img/icon-close@2x.png"
          class="closeIcon customerClose"
        >
      </div>
      <div class="toolContent">
        <div class="toolLeft">
          <div class="wechat">
            <button class="cs_button" open-type="contact" session-from="weapp" plain="true"></button>
          </div>
          <img src="../../assets/img/icon_consultation@2x.png" class="onLineIcon">
          <text>在线咨询</text>
          <div class="info">常见问题解答</div>
        </div>
        <div class="toolCenter"></div>
        <div class="toolLeft toolRigth" catchtap="ringUp">
          <img src="../../assets/img/icon_telephone@2x.png" class="onLineIcon">
          <text>客服在线</text>
          <div class="info infoRight">服务时间：9:00-18:00</div>
        </div>
      </div>
    </div>
    <div class="maskContent rqContent" v-if="qrState">
      <div class="titleWrap">
        <div class="closeIconWrap" bindtap="modeChange">
          <img src="../../assets/img/icon-close@2x.png" class="closeIcon">
        </div>
        <div class="qrImgWrap">
          <img :src="qrcode" class="qrImg">
        </div>
        <div class="qrTextWrap">
          <div class="circleLeft"></div>
          <div class="circleRight"></div>
          <div class="qrText">向摄影师展示个人二维码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { fetchLogin } from "../../api/home.js";
export default {
  name: "HomeCenter",
  components: {},
  data() {
    return {
      iconList: {
        customerIcon: "../../assets/img/icon_service@2x.png",
        setUpIcon: "../../assets/img/icon_setup@2x.png",
        orderIcon: "../../assets/img/icon_order@2x.png",
        couponIcon: "../../assets/img/icon_coupon@2x.png",
        qrcodeIcon: "../../assets/img/icon_qrcode@2x.png",
        scanIcon: "../../assets/img/icon_scan@2x.png",
        closeIcon: "../../assets/img/icon-close@2x.png",
        onLineIcon: "../../assets/img/icon_consultation@2x.png",
        phoneIcon: "../../assets/img/icon_telephone@2x.png",
        bg: "../../assets/img/userAvatarBg.jpg"
      },
      qrImg: "../../assets/img/QRcode.jpg",
      customerState: false,
      maskState: false,
      qrState: false,
      callNum: "18066856763",
      qrText: "",
      qrcode: "",
      userId: ""
    };
  },
  methods: {
    modeChange() {
      fetchLogin().then(res => {
        console.log(res);
      });
    },
    enterMyOrder() {
      this.$router.push({
        path: "/purchase"
      });
    },
    enterMyCoupon() {
      this.$router.push({
        path: "/coupon"
      });
    },
    enterQRcode() {},
    enterScan() {}
  }
};
</script>

<style lang="less">
.center {
  /* @import "../../com/nav/nav.wxss"; */
  image {
    margin: 0;
    padding: 0;
  }
  .cs_button {
    width: 2.6rem;
    height: 1rem;
    background: pink;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0;
  }
  .cs_button::after {
    border-radius: 0;
  }
  .cs_button[plain] {
    border: none;
  }
  .bannerWrap {
    width: 7.5rem;
    height: 2.98rem;
    background-size: 100% 100%;
  }
  .toolBarWrap {
    width: auto;
    height: auto;
    float: right;
  }
  .toolBarWrap image {
    width: 0.4rem;
    height: 0.36rem;
  }
  .customerIcon,
  .setUpIcon {
    margin: 0.4rem 0.28rem;
  }
  .userPhoto {
    position: absolute;
    border-radius: 50%;
    border: 0.05rem solid #fff;
    overflow: hidden;
    width: 1.08rem;
    height: 1.08rem;
    display: flex;
    top: 0.94rem;
    left: 0.38rem;
  }
  .userName {
    position: absolute;
    top: 1.2rem;
    left: 1.82rem;
    font-size: 0.4rem;
    color: #fff;
  }
  .contentWrap {
    width: 100%;
    height: auto;
    margin-top: 0.22rem;
  }
  .functionList {
    margin-left: 0.33rem;
  }
  .functionItem {
    width: 3.25rem;
    height: 3.28rem;
    background: #fff;
    box-shadow: 0rem 0.1rem 0.4rem 0.02rem rgba(25, 47, 181, 0.08);
    float: left;
    margin-right: 0.33rem;
    margin-top: 0.32rem;
  }
  .orderItem {
    width: 1.2rem;
    height: auto;
    margin: 0 auto;
    font-size: 0.3rem;
    color: #c2c2c2;
    text-align: center;
    margin-top: 1.04rem;
  }
  .itemIcon {
    width: 0.48rem;
    height: 0.58rem;
    display: block;
    margin: 0 auto;
    margin-bottom: 0.2rem;
  }
  .couponIcon {
    width: 0.58rem;
    height: 0.58rem;
  }
  .qrcodeIcon,
  .scanIcon {
    width: 0.56rem;
    height: 0.56rem;
  }
  .maskWrap {
    width: 100%;
    height: 100%;
    background: #000000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0.6;
    overflow: hidden;
  }

  .maskContent {
    width: 5.42rem;
    height: 3.22rem;
    background: #fff;
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, 6%);
    z-index: 3;
  }
  .customerContent {
    width: 6.56rem;
  }
  .titleWrap {
    width: 5.42rem;
    /* margin-left:46rem; */
    font-size: 0.44rem;
    color: #353535;
    position: absolute;
  }
  .customerTitleWrap {
    width: 6.56rem;
    margin-left: 0.46rem;
  }
  .closeIconWrap {
    width: 0.9rem;
    height: 0.7rem;
    float: right;
  }
  .closeIcon {
    width: 0.24rem;
    height: 0.24rem;
    display: inline-block;
    margin: 0.32rem;
    text-align: center;
  }
  .customerClose {
    margin-left: 4.7rem;
  }
  .toolContent {
    width: auto;
    position: absolute;
    top: 1.52rem;
    left: 0.56rem;
    display: flex;
    flex-direction: row;
  }
  .toolLeft {
    width: 50%;
    height: 1.5rem;
    line-height: 0.5rem;
  }
  .toolRigth {
    margin-left: 0.9rem;
  }
  .onLineIcon {
    width: 0.3rem;
    height: 0.32rem;
    float: left;
    display: inline-block;
  }
  .toolLeft text {
    color: #353535;
    font-size: 0.32rem;
    display: block;
    float: left;
    margin-top: -0.12rem;
    margin-left: 0.12rem;
  }
  .toolCenter {
    width: 0.02rem;
    height: 0.6rem;
    margin-top: 0.1rem;
    background: #f0f0f0;
    position: absolute;
    margin-left: 2.7rem;
  }
  .info {
    width: 100%;
    float: left;
    color: #9b9b9b;
    font-size: 0.24rem;
    padding-left: 0.12rem;
    margin-top: 0.04rem;
  }
  .infoRight {
    margin-left: -0.22rem;
  }
  .rqContent {
    height: 6.82rem;
    transform: translate(-50%, -10%);
    border-radius: 0.06rem;
  }
  .qrImgWrap {
    width: 4.2rem;
    /* height:420rem; */
    margin: 0 0.6rem;
    margin-bottom: 0.42rem;
  }
  .qrImg {
    width: 4.2rem;
    height: 4.2rem;
  }
  .qrTextWrap {
    width: 100%;
    line-height: 0.62rem;
    border-top: 0.02rem dashed #979797;
    text-align: center;
    position: absolute;
  }
  .circleLeft,
  .circleRight {
    width: 0.2rem;
    height: 0.2rem;
    background: #626264;
    position: relative;
    border-radius: 50%;
    left: -0.08rem;
    top: -0.1rem;
  }
  .circleRight {
    left: 5.3rem;
    top: -0.28rem;
  }
  .qrText {
    font-size: 0.28rem;
  }
  .bannerImg {
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
