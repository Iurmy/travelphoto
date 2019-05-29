<template>
  <div class="order">
    <!-- pages/order/order.wxml -->
    <div v-for="(item,index) in orderData" :key="index" class="spot fl fl-col">
      <div class="spot-name">{{item.scenicAreaName}}</div>
      <div v-for="(itm,idx) in item.list" :key="idx" class="spot-info fl fl-jc-btn fl-ai-ctr">
        <div style="text-align:left" class="fl fl-col">
          <div class="spot-po-name">{{itm.scenicAreaName}}·{{itm.scenicSpotName}}</div>
          <div class="spot-po-type fl fl-jc-str fl-ai-ctr">
            <div class="spot-po-tip">摄影师·{{itm.grapherName}}</div>
            <div class="spot-po-tip spot-po-tip-img">{{itm.repairType == 2 ? '精修+原图' : '原图'}}</div>
          </div>
          <div class="spot-po-time fl fl-jc-str fl-ai-ctr">
            <div class="spot-po-tip">拍摄时间：{{itm.photoDateStr}}</div>
          </div>
          <div class="spot-po-money">￥{{itm.price/100}}</div>
        </div>
        <div class="spot-po-img" :style="{background:'url(' + itm.photoUrl + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'cover'}"></div>
        <!-- <img bindtap="prediv"  :src="itm.photoUrl"> -->
      </div>
      <div class="total fl fl-jc-btn fl-ai-ctr">
        <div>共{{item.list.length}}张照片</div>
        <div>
          小计：
          <span style="color:#FF0D00">￥{{item.price/100}}</span>
        </div>
      </div>
    </div>
    <div @click="chooseCoupon" class="coupon fl fl-jc-btn fl-ai-ctr">
      <div>优惠劵</div>
      <div class="fl fl-jc-end fl-ai-ctr">
        {{reducedPrice == "" ? reducedInfo : '￥' + reducedPrice/100}}
        <img
          class="icon-into"
          src="../../assets/img/icon_into@2x.png"
        >
      </div>
    </div>
    <div class="discount-total fl fl-col">
      <div class="discount-total-item fl fl-jc-btn fl-ai-ctr">
        <div>总金额</div>
        <div>￥{{payPrice/100}}</div>
      </div>
      <div
        v-for="(item,index) in coupons"
        :key="index"
        class="discount-total-item fl fl-jc-btn fl-ai-ctr"
      >
        <div>{{item.scenicAreaName}}</div>
        <div>-￥{{item.price/100}}</div>
      </div>
    </div>
    <div class="agreement fl fl-jc-str fl-ai-ctr">
      <!-- <checkbox-group class="choose" bindchange="onAgreement">
        <label class="checkbox">
          <checkbox class="checkbox1" style value="1" checked="{{agreement}}"/>
          <text>我已同意</text>
          <text>《旅拍通服务协议》</text>
        </label>
      </checkbox-group>-->
    </div>
    <div style="height:1rem"></div>
    <div class="order-bottom fl fl-jc-btn fl-ai-ctr">
      <div class="must">
        应付：
        <span style="color:#FF0D00">￥{{copePrice/100}}</span>
      </div>
      <div @click="payOrder" class="order-btn">提交订单</div>
    </div>

    <popup
      v-model="showPopup"
      @on-hide="popHide"
      position="bottom"
      height="65%"
      should-scroll-top-on-show
    >
      <div class="orderCoupon-cnt">
        <div class="container">
          <div class="tabWrap">
            <div :class="currentData == 0 ? 'tab tabActText' : 'tab'" @click="checkCurrent(0)">可使用
              <div :class="currentData == 0 ? 'tabAct' : ''"></div>
            </div>
            <div :class="currentData == 1 ? 'tab tabActText' : 'tab'" @click="checkCurrent(1)">不可使用
              <div :class="currentData == 1 ? 'tabAct' : ''"></div>
            </div>
            <div :class="currentData == 2 ? 'tab tabActText' : 'tab'" @click="checkCurrent(2)">待领取
              <div :class="currentData == 2 ? 'tabAct' : ''"></div>
            </div>
          </div>
          <div style="width:100%;height:0.16rem;background:#F2F2F2;float:left;margin-top:0.46rem;"></div>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <div
                style="min-height:8.28rem;"
                v-if="scenicAreaUsableList.platformUsableList.length>0 || scenicAreaUsableList.scenicAreaUsableList.length>0"
              >
                <div
                  class="order-title"
                  v-if="scenicAreaUsableList.platformUsableList.length>0"
                >平台可用</div>
                <div v-if="scenicAreaUsableList.platformUsableList.length>0">
                  <div
                    class="couponWrap"
                    v-for="(item,bindex) in scenicAreaUsableList.platformUsableList"
                    :key="bindex"
                  >
                    <div class="couponItem">
                      <div class="couponTitle">
                        <div>{{item.title}}</div>
                      </div>
                      <div class="checkboxGroup" v-if="source != 'personal'">
                        <!-- <checkbox-group
                          data-type="0"
                          data-idx="{{bindex}}"
                          bindchange="checkboxChange"
                        >
                          <label class="checkbox">
                            <checkbox
                              class="checkbox2"
                              value="{{item.id}}"
                              checked="{{item.checked}}"
                            />
                          </label>
                        </checkbox-group>-->
                      </div>
                      <img :src="haveReceived" v-if="source == 'personal'" class="haveReceivedIcon">
                      <div class="whiteWrap">
                        <div class="whiteLeft"></div>
                        <div class="whiteRight"></div>
                      </div>
                      <div class="couponContent">
                        <text>￥</text>
                        <div class="amount">{{item.price/100}}</div>
                        <text class="amountInfo">{{item.description}}</text>
                      </div>
                      <div class="couponData">
                        <text>有效期：{{item.createDate}}至{{item.pastDate}}</text>
                        <div class="text" data-type="0" bindtap="ruleChange1">使用规则
                          <div
                            :class="item.open ? 'triangle_border_down active' : 'triangle_border_down'"
                          ></div>
                        </div>
                      </div>
                      <div :class="item.open ? 'couponRule active' : 'couponRule'">
                        <text>{{item.rule}}</text>
                      </div>
                      <img :src="couponBgImg" class="couponBgImg">
                    </div>
                  </div>
                </div>

                <div
                  class="order-title"
                  v-if="scenicAreaUsableList.scenicAreaUsableList.length>0"
                >景区可用</div>
                <div v-if="scenicAreaUsableList.scenicAreaUsableList.length>0">
                  <div
                    class="couponWrap"
                    v-for="(item,bindex) in scenicAreaUsableList.scenicAreaUsableList"
                    :key="bindex"
                  >
                    <div class="couponItem">
                      <div class="couponTitle">
                        <text>{{item.title}}</text>
                      </div>
                      <div class="checkboxGroup" v-if="source != 'personal'">
                        <!-- <checkbox-group
                          data-type="1"
                          bindchange="checkboxChange"
                        >
                          <label class="checkbox">
                            <checkbox
                              class="checkbox2"
                              value="{{item.id}}"
                              checked="{{item.checked}}"
                            />
                          </label>
                        </checkbox-group>-->
                      </div>
                      <img :src="haveReceived" v-if="source == 'personal'" class="haveReceivedIcon">
                      <div class="whiteWrap">
                        <div class="whiteLeft"></div>
                        <div class="whiteRight"></div>
                      </div>
                      <div class="couponContent">
                        <text>￥</text>
                        <div class="amount">{{item.price/100}}</div>
                        <text class="amountInfo">{{item.description}}</text>
                      </div>
                      <div class="couponData">
                        <text>有效期：{{item.createDate}}至{{item.pastDate}}</text>
                        <div class="text" data-type="1" bindtap="ruleChange1">使用规则
                          <div
                            :class="item.open ? 'triangle_border_down active' : 'triangle_border_down'"
                          ></div>
                        </div>
                      </div>
                      <div :class="item.open ? 'couponRule active' : 'couponRule'">
                        <text>{{item.rule}}</text>
                      </div>
                      <img :src="couponBgImg" class="couponBgImg">
                    </div>
                  </div>
                </div>

                <div style="height:0.5rem"></div>
              </div>
              <div class="fl fl-col fl-ai-ctr" v-else>
                <img class="air-coupon-img" src="../../assets/img/airCoupon@2x.png">
                <div class="air-coupon-text">暂无优惠劵</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div style="min-height:8.28rem;" v-if="scenicAreaDisabledList.length>0">
                <div class="couponWrap" v-for="(item,index) in scenicAreaDisabledList" :key="index">
                  <div class="couponItem used">
                    <div class="couponTitle">
                      <text>{{item.title}}</text>
                    </div>
                    <div class="whiteWrap">
                      <div class="whiteLeft"></div>
                      <div class="whiteRight"></div>
                    </div>
                    <div class="couponContent">
                      <text>￥</text>
                      <div class="amount">{{item.price/100}}</div>
                      <text class="amountInfo">{{item.description}}</text>
                    </div>
                    <div class="couponData">
                      <text>有效期：{{item.createDate}}至{{item.pastDate}}</text>
                      <div class="text" bindtap="ruleChange2">使用规则
                        <div
                          :class="item.open ? 'triangle_border_down active' : 'triangle_border_down'"
                        ></div>
                      </div>
                    </div>
                    <div :class="item.open ? 'couponRule active' : 'couponRule'">
                      <text>{{item.rule}}</text>
                    </div>
                    <img :src="couponBgImg" class="couponBgImg">
                  </div>
                </div>
                <div style="height:0.5rem"></div>
              </div>
              <div class="fl fl-col fl-ai-ctr" v-else>
                <img class="air-coupon-img" src="../../assets/img/airCoupon@2x.png">
                <div class="air-coupon-text">暂无优惠劵</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div
                style="min-height:8.28rem;"
                v-if="scenicAreaLedList.platformGetList.length>0 || scenicAreaLedList.scenicAreaGetList.length>0"
              >
                <div class="order-title" v-if="scenicAreaLedList.platformGetList.length>0">平台可用</div>
                <div v-if="scenicAreaLedList.platformGetList.length>0">
                  <div
                    class="couponWrap"
                    v-for="(item,index) in scenicAreaLedList.platformGetList"
                    :key="index"
                  >
                    <div class="couponItem">
                      <div class="couponTitle">
                        <text>{{item.title}}</text>
                      </div>
                      <div
                        class="receiveCoupon"
                        bindtap="ledCoupon"
                        v-if="source != 'personal'"
                      >立即领取</div>
                      <img :src="haveReceived" v-if="source == 'personal'" class="haveReceivedIcon">
                      <div class="whiteWrap">
                        <div class="whiteLeft"></div>
                        <div class="whiteRight"></div>
                      </div>
                      <div class="couponContent">
                        <text>￥</text>
                        <div class="amount">{{item.price/100}}</div>
                        <text class="amountInfo">{{item.description}}</text>
                      </div>
                      <div class="couponData">
                        <text>有效期：{{item.createDate}}至{{item.pastDate}}</text>
                        <div class="text" data-type="0" bindtap="ruleChange3">使用规则
                          <div
                            :class="item.open ? 'triangle_border_down active' : 'triangle_border_down'"
                          ></div>
                        </div>
                      </div>
                      <div :class="item.open ? 'couponRule active' : 'couponRule'">
                        <text>{{item.rule}}</text>
                      </div>
                      <img :src="couponBgImg" class="couponBgImg">
                    </div>
                  </div>
                </div>

                <div class="order-title" v-if="scenicAreaLedList.scenicAreaGetList.length>0">景区可用</div>
                <div v-if="scenicAreaLedList.scenicAreaGetList.length>0">
                  <div
                    class="couponWrap"
                    v-for="(item,index) in scenicAreaLedList.scenicAreaGetList"
                    :key="index"
                  >
                    <div class="couponItem">
                      <div class="couponTitle">
                        <text>{{item.title}}</text>
                      </div>
                      <div
                        class="receiveCoupon"
                        bindtap="ledCoupon"
                        v-if="source != 'personal'"
                      >立即领取</div>
                      <img :src="haveReceived" v-if="source == 'personal'" class="haveReceivedIcon">
                      <div class="whiteWrap">
                        <div class="whiteLeft"></div>
                        <div class="whiteRight"></div>
                      </div>
                      <div class="couponContent">
                        <text>￥</text>
                        <div class="amount">{{item.price/100}}</div>
                        <text class="amountInfo">{{item.description}}</text>
                      </div>
                      <div class="couponData">
                        <text>有效期：{{item.createDate}}至{{item.pastDate}}</text>
                        <div class="text" data-type="1" bindtap="ruleChange3">使用规则
                          <div
                            :class="item.open ? 'triangle_border_down active' : 'triangle_border_down'"
                          ></div>
                        </div>
                      </div>
                      <div :class="item.open ? 'couponRule active' : 'couponRule'">
                        <text>{{item.rule}}</text>
                      </div>
                      <img :src="couponBgImg" class="couponBgImg">
                    </div>
                  </div>
                </div>
              </div>
              <div class="fl fl-col fl-ai-ctr" v-else>
                <img class="air-coupon-img" src="../../assets/img/airCoupon@2x.png">
                <div class="air-coupon-text">暂无优惠劵</div>
              </div>
            </swiper-slide>
            <div style="height:0.5rem"></div>
          </swiper>
        </div>
        <div class="maskWrap" v-if="maskState == true" bindtap="modeChange" catchtouchmove="ture"></div>
        <div class="maskContent" v-if="maskState == true">
          <div class="closeIconWrap" bindtap="modeChange">
            <img :src="closeIcon" class="closeIcon">
          </div>
          <img :src="successIcon" class="successIcon">
          <text class="maskInfo">兑换成功</text>
          <text class="maskDetail">优惠卷已存放在您的优惠卷列表中</text>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import {
  fetchPrepayment,
  fetchScenicAreaUsableList,
  fetchScenicAreaDisabledList,
  fetchScenicAreaLedList,
  fetchOrderReducedInfo,
  fetchPay
} from "@/api/order.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Popup } from "vux";
let that = null;
export default {
  name: "Order",
  components: {
    Popup,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        initialSlide: 0,
        on: {
          slideChangeTransitionEnd: function() {
            that.currentData = this.activeIndex;
            that.itemChange(this.activeIndex);
          }
        },
        autoHeight: true,
        speed: 500
      },
      agreement: true,
      orderData: [],
      payPrice: "", // 优惠劵统计总金额
      copePrice: "", // 应付金额
      reducedPrice: "", // 优惠金额
      reducedInfo: "", // 是否有优惠劵
      isCoupon: false, // 是否弹出优惠劵弹窗
      orderId: "",
      userId: "",
      selectedCouponList: [], // 已选列表
      h: 300,
      scanIcon: "../../assets/img/icon_scan@2x (1).png",
      closeIcon: "../../assets/img/icon-close@2x.png",
      successIcon: "../../assets/img/icon_success@2x.png",
      couponBgImg: "../../assets/img/coupon.png",
      couponEmptyImg: "../../assets/img/airCoupon@2x.png",
      haveReceived: "../../assets/img/icon_havereceived@2x.png",
      currentData: 0,
      maskState: false,
      ruleState: false,
      couponEmptyState: false,
      pageNo: 1,
      actRole: "",
      scenicAreaUsableList: {
        platformUsableList: [],
        scenicAreaUsableList: []
      }, //景区可用列表
      scenicAreaDisabledList: "", //景区不可用列表
      scenicAreaLedList: {
        // 景区可领列表
        platformGetList: [],
        scenicAreaGetList: []
      },
      redeemCode: "",
      money: 0,
      sourceType: "", //来源类型
      scenicAreaId: "",
      attach: "",
      showPopup: false,
      coupons: [] // 优惠劵列表
    };
  },
  created() {
    that = this;
  },
  mounted() {
    this.getOrderPreviewList();
  },
  methods: {
    checkCurrent(e) {
      this.currentData = e;
      this.$refs.mySwiper.swiper.slideTo(e, 500, true);
      // this.itemChange(e);
    },
    itemChange(e) {
      if (e == 1) {
        this.loadScenicAreaDisabledList();
      } else if (e == 0) {
        this.loadScenicAreaUsableList();
      } else if (e == 2) {
        this.loadScenicAreaLedList();
      }
    },

    // 获取优惠劵信息
    getOrderReducedInfo(req) {
      fetchOrderReducedInfo(req).then(res => {
        this.reducedInfo = res.data.result;
      });
    },
    // 获取可用优惠劵列表
    loadScenicAreaUsableList() {
      let req = {
        userId: this.$store.state.userId,
        price: this.payPrice,
        attach: this.attach
      };
      fetchScenicAreaUsableList(req).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (
            (res.data.result.scenicAreaUsableList &&
              res.data.result.scenicAreaUsableList.length) > 0 ||
            (res.data.result.platformUsableList &&
              res.data.result.platformUsableList.length) > 0
          ) {
            let a = res.data.result.platformUsableList.map(function(item) {
              that.data.selectedCouponList.indexOf(item.id) < 0
                ? (item.checked = false)
                : (item.checked = true);
              return item;
            });
            let b = res.data.result.scenicAreaUsableList.map(function(item) {
              that.data.selectedCouponList.indexOf(item.id) < 0
                ? (item.checked = false)
                : (item.checked = true);
              return item;
            });

            this.scenicAreaUsableList = {
              scenicAreaUsableList: b,
              platformUsableList: a
            };
            this.couponEmptyState = false;
            this.showPopup = false;
          }
        }
      });
    },

    // 获取可领优惠劵列表
    loadScenicAreaLedList: function() {
      let req = {
        userId: this.$store.state.userId,
        price: this.payPrice,
        attach: this.attach
      };
      fetchScenicAreaLedList(req).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (
            (res.data.result.platformGetList &&
              res.data.result.platformGetList.length) > 0 ||
            (res.data.result.scenicAreaGetList &&
              res.data.result.scenicAreaGetList.length) > 0
          ) {
            this.scenicAreaLedList = res.data.result;
            this.showPopup = true;
          }
        }
      });
    },
    // 获取不可用优惠劵列表
    loadScenicAreaDisabledList: function() {
      let req = {
        userId: this.$store.state.userId,
        price: this.payPrice,
        attach: this.attach
      };
      fetchScenicAreaDisabledList(req).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // console.log(JSON.stringify(data));
          if (
            (res.data.result.platformDisabledList &&
              res.data.result.platformDisabledList.length) > 0 ||
            (res.data.result.scenicAreaDisabledList &&
              res.data.result.scenicAreaDisabledList.length) > 0
          ) {
            let data = Object.assign(
              res.data.result.platformDisabledList,
              res.data.result.scenicAreaDisabledList
            );
            this.scenicAreaDisabledList = data;
          }
        }
      });
    },

    chooseCoupon() {
      this.showPopup = true;
      this.loadScenicAreaUsableList();
    },
    popHide() {
      let req = {
        userId: this.$store.state.userId,
        price: this.payPrice,
        attach: this.attach
      };
      this.getOrderReducedInfo(req);
    },
    // 获取订单预览列表
    getOrderPreviewList() {
      let a = this.$route.query.ids
      let req = {
        userId: this.$store.state.userId,
        cartIds: Array.isArray(a) ? a.join() : a
      };
      fetchPrepayment(req).then(res => {
        this.orderData = res.data.result.orderList;
        this.payPrice = res.data.result.payPrice;
        this.copePrice = res.data.result.payPrice;
        this.attach = res.data.result.attach;
        this.orderId = res.data.result.orderId;

        let a = {
          attach: res.data.result.attach,
          price: res.data.result.payPrice,
          userId: this.$store.state.userId
        };
        this.getOrderReducedInfo(a);
      });
    },
    // 支付
    payOrder() {
      let req = {
        orderId: this.orderId
      };
      fetchPay(req).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
.order {
  .swiper-container {
    overflow: inherit;
  }
  .vux-popup-dialog {
    background: #fff;
  }
  .spot {
    padding-top: 0.32rem;
    background: #fff;
    margin-bottom: 0.16rem;
  }

  .spot-name {
    color: #353535;
    font-size: 0.32rem;
    font-weight: bold;
    margin-left: 0.32rem;
    margin-bottom: 0.16rem;
    text-align: left;
  }

  .spot-info {
    /* margin-top: 32rem; */
    padding: 0 0 0.18rem;
    margin: 0.16rem 0.62rem 0;
    border-bottom: 0.02rem solid rgba(0, 0, 0, 0.12);
  }

  .spot-po-name {
    color: #646464;
    font-size: 0.28rem;
    margin-bottom: 0.4rem;
  }

  .spot-po-tip {
    padding: 0 0.16rem;
    height: 0.34rem;
    border-radius: 9.99rem;
    line-height: 0.36rem;
    border: 0.02rem solid #c2c2c2;
    text-align: center;
    color: #c2c2c2;
    font-size: 0.24rem;
    margin-right: 0.32rem;
  }

  .spot-po-tip-img {
    color: #ffae40;
    border: 0.02rem solid #ffae40;
  }

  .spot-po-type {
    margin-bottom: 0.16rem;
  }

  .spot-po-time {
    margin-bottom: 0.4rem;
  }

  .spot-po-money {
    color: #646464;
    font-size: 0.24rem;
  }

  .spot-po-img {
    width: 2.38rem;
    height: 2.38rem;
  }

  .discount {
    height: 1rem;
    margin: 0 0.62rem;
    color: #646464;
    font-size: 0.28rem;
    border-bottom: 0.02rem solid rgba(0, 0, 0, 0.12);
  }

  .total {
    height: 1rem;
    margin: 0 0.62rem;
    color: #646464;
    font-size: 0.28rem;
  }

  .icon-into {
    width: 0.16rem;
    height: 0.28rem;
    margin-left: 0.18rem;
  }

  .coupon {
    height: 1rem;
    margin: 0 0 0.16rem;
    color: #646464;
    font-size: 0.28rem;
    background: #fff;
    padding: 0 0.32rem;
  }

  .discount-total {
    background: #fff;
    padding: 0.32rem 0.32rem 0;
    color: #646464;
    font-size: 0.28rem;
  }

  .discount-total-item {
    margin-bottom: 0.32rem;
  }

  .agreement {
    height: 0.76rem;
    font-size: 0.24rem;
    padding-left: 0.32rem;
  }

  .order-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    border-top: 0.02rem solid rgba(0, 0, 0, 0.12);
    background: #fff;
    z-index: 10;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    transition: all 0.4s ease-out;
  }

  .order-btn {
    width: 2.12rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 9.99rem;
    text-align: center;
    background: #ffcc00;
    color: #000;
    font-size: 0.28rem;
  }

  .must {
    font-size: 0.28rem;
    color: #646464;
  }

  .checkbox1 .wx-checkbox-input {
    width: 0.34rem;
    height: 0.34rem;
    border-radius: 0.04rem;
    border: 0.02rem solid #9b9b9b;
    margin-right: 0.28rem;
    position: relative;
    top: -0.01rem;
  }

  .checkbox1 .wx-checkbox-input.wx-checkbox-input-checked {
    background: #f5f5f5;
  }

  .checkbox1 .wx-checkbox-input.wx-checkbox-input-checked::before {
    width: 0.09rem;
    height: 0.16rem;
    line-height: 0.16rem;
    text-align: center;
    font-size: 0.2rem;
    color: transparent;
    background: transparent;
    border-bottom: 0.04rem solid #9b9b9b;
    border-right: 0.04rem solid #9b9b9b;
    transform: translate(-50%, -58%) scale(1) rotate(45deg);
    -webkit-transform: translate(-50%, -58%) scale(1) rotate(45deg);
  }

  /* 优惠卷 */
  .orderCoupon-mark {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    /* height: 0; */
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 20;
    transition: all 0.3s ease-out;
  }

  .orderCoupon-cnt {
    height: 60%;
  }

  .container {
    width: auto;
    height: auto;
    /* position: fixed;
    z-index: 20;
    top: 200rem; */
    background: #fff;
  }

  .checkbox2 .wx-checkbox-input {
    border-radius: 50%;
    height: 0.36rem;
    width: 0.36rem;
    background-color: #ffa100;
    border: none;
  }

  .checkbox2 .wx-checkbox-input.wx-checkbox-input-checked::before {
    border-radius: 50%;
    background-color: #ffa100;
    border: 0.06rem solid #ffa100;
    color: #ffcf18;
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

  .couponData text,
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
    height: 0;
    overflow: hidden;
    border-top: 0.02rem dashed #deb71e;
    font-size: 0.2rem;
    line-height: 0.5rem;
    color: #646464;
    transition: all 0.3s ease-out;
  }
  .couponRule.active {
    height: 0.5rem;
  }
  .order-title {
    font-size: 0.28rem;
    color: #333;
    margin: 0.2rem 0.32rem 0.1rem;
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
    display: inline-block;
    margin: 0 auto;
    margin-left: 40%;
  }

  .successIcon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    margin-left: 2.04rem;
    margin-top: 0.64rem;
  }

  .maskContent text {
    display: block;
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
    transition: all 0.3s ease-out;
  }

  .triangle_border_down.active {
    transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    /* IE 9 */
    -moz-transform: rotate(-180deg);
    /* Firefox */
    -webkit-transform: rotate(-180deg);
    /* Safari 和 Chrome */
    -o-transform: rotate(-180deg);
  }

  .triangle_border_up {
    display: block;
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
    height: 0.7rem;
    /* position: absolute; */
    /* top:0rem; */
    display: flex;
    justify-content: space-between;
    z-index: 100;
    background: #fff;
  }

  .tab {
    width: 50%;
    height: 0.9rem;
    text-align: center;
    color: #9b9b9b;
    font-size: 0.32rem;
    line-height: 0.9rem;
    background: #fff;
    /* border-bottom:16rem solid #F2F2F2; */
  }

  .tab text {
    width: 0.28rem;
    height: 0.04rem;
    display: block;
    margin: 0 auto;
  }

  .tabAct {
    background: #ff0d00;
    height: 0.04rem;
    width: 0.28rem;
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
    top: 0.11rem;
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
    z-index: 20;
  }

  .air-coupon-img {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0.64rem 0;
  }

  .air-coupon-text {
    color: #646464;
    font-size: 0.32rem;
  }
}
</style>
