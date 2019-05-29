<template>
  <div class="coupon">
    <div class="container">
      <div class="tabWrap">
        <div :class="currentData == 0 ? 'tab tabActText' : 'tab'" @click="checkCurrent(0)">
          已领取
          <span :class="currentData == 0 ? 'tabAct' : ''"></span>
        </div>
        <div :class="currentData == 1 ? 'tab tabActText' : 'tab'" @click="checkCurrent(1)">
          待领取
          <span :class="currentData == 1 ? 'tabAct' : ''"></span>
        </div>
      </div>
      <div class="titleWrap fl fl-jc-between fl-ai-ctr">
        <div class="inputWrap">
          <input
            placeholder="输入您的兑换码"
            class="inputBox"
            :value="redeemCode"
            placeholder-class="placeholderStyle"
          >
          <div class="scanWrap fl fl-jc-ctr fl-ai-ctr" bindtap="scanChange">
            <img src="../../assets/img/icon_scan1@2x.png" class="scanIcon">
          </div>
        </div>
        <div class="exchange" bindtap="bindExchange">兑换</div>
      </div>

      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <div v-if="havReceiveList.length != 0">
            <div class="couponWrap" id="couponWrap">
              <div class="couponItem" v-for="(item,index) in havReceiveList" :key="index">
                <div class="couponTitle">
                  <span>{{item.title}}</span>
                </div>
                <img src="../../assets/img/icon_havereceived@2x.png" class="haveReceivedIcon">
                <div class="whiteWrap">
                  <div class="whiteLeft"></div>
                  <div class="whiteRight"></div>
                </div>
                <div class="couponContent">
                  <span>￥</span>
                  <div class="amount">{{item.price/100}}</div>
                  <span class="amountInfo">{{item.description}}</span>
                </div>
                <div class="couponData">
                  <span>有效期：{{item.createDate}}至{{item.pastDate}}</span>
                  <div class="text" bindtap="ruleChange">使用规则
                    <div class="triangle_border_down" v-if="item.open == true"></div>
                    <div class="triangle_border_up" v-if="item.open == false"></div>
                  </div>
                </div>
                <div class="couponRule" v-if="item.open === true">
                  <span>{{item.rule}}</span>
                </div>
                <img src="../../assets/img/coupon.png" class="couponBgImg">
              </div>
            </div>
          </div>
          <div class="orderEmptyWrap" v-else>
            <img src="../../assets/img/airCoupon@2x.png" class="orderEmptyImg">
            <div class="infoText">暂无优惠卷</div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div v-if="cantUsedList.length != 0">
            <div class="couponWrap" v-for="(item,index) in cantUsedList" :key="index">
              <div class="couponItem">
                <div class="couponTitle">
                  <span>{{item.title}}</span>
                </div>
                <div class="whiteWrap">
                  <div class="whiteLeft"></div>
                  <div class="whiteRight"></div>
                </div>
                <div class="couponContent">
                  <span>￥</span>
                  <div class="amount">{{item.price}}</div>
                  <span class="amountInfo">{{item.description}}</span>
                </div>
                <div class="couponData">
                  <span>有效期：{{item.createDate}}至{{item.pastDate}}</span>
                  <div class="text" bindtap="ruleChange(index)">使用规则
                    <div class="triangle_border_down" v-if="item.open == true"></div>
                    <div class="triangle_border_up" v-if="item.open == true"></div>
                  </div>
                </div>
                <div class="couponRule" v-if="item.open === true">
                  <span>{{item.rule}}</span>
                </div>

                <img src="../../assets/img/coupon.png" class="couponBgImg">
              </div>
            </div>
          </div>
           <div class="orderEmptyWrap" v-else>
            <img src="../../assets/img/airCoupon@2x.png" class="orderEmptyImg">
            <div class="infoText">暂无优惠卷</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="maskWrap" v-if="maskState == true" bindtap="modeChange" catchtouchmove="ture"></div>
    <div class="maskContent" v-if="maskState == true">
      <div class="closeIconWrap" bindtap="modeChange">
        <img :src="closeIcon" class="closeIcon">
      </div>
      <img :src="successIcon" class="successIcon">
      <span class="maskInfo">兑换成功</span>
      <span class="maskDetail">优惠卷已存放在您的优惠卷列表中</span>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { fetchCouponList, fetchCouponLedList } from "@/api/order.js";
let that = null;
export default {
  name: "Coupon",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        initialSlide: 0,
        on: {
          slideChangeTransitionEnd: function() {
            that.imgChange(this.activeIndex);
          }
        },
        autoHeight: true,
        speed: 500
      },
      currentData: 0,
      maskState: false,
      ruleState: false,
      couponEmptyState: false,
      pageNo: 1,
      userId: "",
      cantUsedList: [],
      redeemCode: "",
      havReceiveList: []
    };
  },

  created() {
    that = this;
  },
  mounted() {
    this.loadHavReceive();
  },
  methods: {
    checkCurrent(index) {
      this.currentData = index;
      this.$refs.mySwiper.swiper.slideTo(index, 500, true);
    },
    imgChange(index) {
      this.currentData = index;
      if (index == 0) {
        this.loadHavReceive();
      } else if (index == 1) {
        this.getUncollected();
      }
    },
    loadHavReceive() {
      let req = {
        userId: this.$store.state.userId,
        pageNo: 1,
        pageSize: 100
      };
      fetchCouponList(req).then(res => {
        res.data.result.records.forEach(v => {
          v.open = false;
        });
        this.havReceiveList = res.data.result.records;
        // this.havReceiveList = [1, 1, 1];
      });
    },
    getUncollected() {
      let req = {
        userId: this.$store.state.userId,
        pageNo: 1,
        pageSize: 100
      };
      fetchCouponLedList(req).then(res => {
        if (res.data.code == 200) {
          res.data.result.records.forEach(function(v) {
            v.open = false;
          });
          this.uncollectedList = res.data.result.records;
        }
      });
    }
  }
};
</script>

<style lang="less">
/* pages/gallery/gallery.wxss */

.coupon {
  .orderEmptyWrap {
    background: #fff;
  }
  .orderEmptyImg {
    margin-top: 1.8rem;
    width: 3.5rem;
    height: 3.5rem;
  }
  .infoText {
    width: 100%;
    text-align: center;
    margin-top: 0.64rem;
    color: #646464;
    font-size: 0.32rem;
  }
  checkbox .wx-checkbox-input {
    border-radius: 50%;
    height: 0.36rem;
    width: 0.36rem;
    background-color: #ffa100;
    border: none;
  }
  checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
    border-radius: 50%;
    background-color: #ffa100;
    border: 0.06rem solid #ffa100;
    color: #ffcf18;
  }
  .titleWrap {
    padding: 0.24rem 0.32rem;
    margin-top: 1.14rem;
  }
  .inputWrap {
    width: 4.68rem;
    height: 0.9rem;
    border: 0.02rem solid #f2f2f2;
    border-radius: 0.04rem;
    position: relative;
  }
  .section {
    width: 4.68rem;
    height: 0.9rem;
    border: none;
  }
  .inputBox {
    width: 4.38rem;
    height: 0.8rem;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: #c2c2c2;
    padding-left: 0.2rem;
    position: absolute;
    top: 0.02rem;
    left: 0;
    border: none;
  }
  .placeholderStyle {
    color: #c2c2c2;
  }
  .scanWrap {
    width: 1rem;
    height: 0.9rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 88;
    background: #fff;
  }
  .scanIcon {
    width: 0.32rem;
    height: 0.32rem;
  }
  .exchange {
    width: 1.98rem;
    height: 0.9rem;
    background: #ffe57f;
    /* margin-left:-30rem; */
    text-align: center;
    line-height: 0.9rem;
    color: #353535;
    font-size: 0.32rem;
    border-radius: 0.04rem;
    margin-left: 0.2rem;
  }
  .couponWrap {
    width: 100%;
    height: auto;
    margin: 0 0.32rem;
    margin-top: 0.1rem;
  }
  .couponItem {
    width: 6.86rem;
    height: auto;
    background: #ffcc00;
    position: relative;
    margin-bottom: 0.2rem;
    overflow: hidden;
  }
  .couponTitle {
    height: 0.78rem;
    padding: 0 0.2rem;
    line-height: 0.78rem;
    justify-content: space-between;
    border-bottom: 0.02rem dashed #353535;
    display: flex;
  }
  .couponTitle {
    font-size: 0.24rem;
    color: #646464;
    position: relative;
    z-index: 9;
  }
  .whiteWrap {
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
  }
  .whiteLeft,
  .whiteRight {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: #fff;
    position: relative;
    right: 0.36rem;
    top: -0.16rem;
    z-index: 99;
  }
  .whiteRight {
    right: -0.36rem;
  }
  .couponContent {
    padding: 0 0.2rem;
    display: flex;
    flex-direction: row;
  }
  .amount {
    font-size: 0.96rem;
    padding: 0 0.2rem;
    color: #000000;
    line-height: 0.9rem;
    padding: 0 0.1rem;
  }
  .amountInfo {
    font-size: 0.32rem;
    color: #353535;
    height: 1.2rem;
    vertical-align: center;
    line-height: 1.2rem;
    overflow: hidden;
  }
  .couponData {
    display: flex;
    justify-content: space-between;
    /* margin-bottom:20rem; */
    padding: 0 0.2rem;
    height: 0.5rem;
  }
  .couponData span,
  .text {
    font-size: 0.24rem;
    color: #646464;
  }
  .text {
    position: relative;
    z-index: 9;
  }
  .couponRule {
    padding: 0 0.2rem;
    border-top: 0.02rem dashed #deb71e;
    font-size: 0.2rem;
    line-height: 0.5rem;
    color: #646464;
  }
  .lineTextWrap {
    display: flex;
    justify-content: center;
    margin: 0.2rem 0;
  }
  .lineText {
    width: 2.3rem;
    text-align: center;
    font-size: 0.28rem;
    color: #646464;
  }
  .line {
    width: 1rem;
    height: 0.02rem;
    background: #f0f0f0;
    margin-top: 0.18rem;
  }
  .used {
    background: #e8e8e8;
  }
  .lineUsed {
    border-top: 0.02rem dashed #a2a2a2;
  }
  .maskWrap {
    width: 100%;
    height: 100%;
    background: #000000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    opacity: 0.6;
    overflow: hidden;
  }
  .maskContent {
    width: 5.08rem;
    height: 3.52rem;
    background: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    z-index: 9999;
  }

  .closeIconWrap {
    width: 1rem;
    height: 0.6rem;
    float: right;
    margin-top: 0.18rem;
  }
  .closeIcon {
    width: 0.24rem;
    height: 0.24rem;
    display: inline-div;
    margin: 0 auto;
    margin-left: 40%;
  }
  .successIcon {
    width: 1rem;
    height: 1rem;
    display: inline-div;
    margin-left: 2.04rem;
    margin-top: 0.64rem;
  }
  .maskContent span {
    display: div;
    width: 100%;
    text-align: center;
    margin: 0.2rem 0;
  }
  .maskInfo {
    color: #353535;
    font-size: 0.32rem;
  }
  .maskDetail {
    color: #646464;
    font-size: 0.24rem;
  }
  .triangle_border_down {
    width: 0;
    height: 0;
    border-width: 0.1rem 0.1rem 0;
    border-style: solid;
    border-color: #646464 transparent transparent;
    margin: 0.1rem;
    position: relative;
    float: right;
  }
  .triangle_border_up {
    display: div;
    width: 0;
    height: 0;
    border-width: 0 0.1rem 0.1rem;
    border-style: solid;
    border-color: transparent transparent #646464;
    position: relative;
    margin: 0.1rem;
    float: right;
  }
  .couponBgImg {
    width: 0.64rem;
    height: 3.34rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    overflow: hidden;
  }
  .tabWrap {
    width: 100%;
    height: 0.9rem;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    z-index: 22;
    background: #fff;
  }
  .tab {
    width: 50%;
    height: 0.9rem;
    text-align: center;
    color: #9b9b9b;
    font-size: 0.32rem;
    line-height: 0.86rem;
    border-bottom: 0.16rem solid #f2f2f2;
  }
  .tab span {
    width: 0.28rem;
    height: 0.04rem;
    // display: div;
    margin: 0 auto;
  }
  .tabAct {
    background: #ff0d00;
    height: 0.04rem;
    width: 0.28rem;
    display: block;
    margin: 0 auto;
  }
  .tabActText {
    color: #353535;
  }
  .haveReceivedIcon {
    width: 1.3rem;
    height: 1.06rem;
    position: absolute;
    top: 0;
    right: 0.28rem;
  }
  .checkboxGroup {
    position: absolute;
    top: 0.94rem;
    right: 0.3rem;
    z-index: 99;
  }
  .receiveCoupon {
    width: 1.38rem;
    height: 0.36rem;
    line-height: 0.36rem;
    position: absolute;
    top: 0.24rem;
    right: 0.3rem;
    font-size: 0.24rem;
    color: #fff;
    background: #191402;
    text-align: center;
    border-radius: 0.2rem;
    z-index: 9;
  }
}
</style>
