<template>
  <div class="order-detail">
    <div class="container">
      <div class="regionWrap" v-for="(item,index) in list" :key="index">
        <div>
          <div class="regionTit">{{item.map[0].scenicAreaName}}</div>
          <div class="photoList">
            <div v-for="(i,idx) in item.map" :key="idx">
              <div class="spot-po-img" :style="{background:'url(' + i.beautifyUrl + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'cover'}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div v-if="list != ''">
        <div class="infoBar">
          <div class="textItem" v-for="(item,idx) in reducedList" :key="idx">
            <span>{{item.scenicAreaName}}</span>
            <span>-￥{{item.price/100}}</span>
          </div>
          <div class="textItem countMoney">
            <span>实付款</span>
            <span>￥{{price/100}}</span>
          </div>
        </div>
        <div class="orderBottom">
          <div class="textItem orderTextItem">
            <span>订单编号：{{orderNo}}</span>
          </div>
          <div class="textItem orderTextItem">
            <span>订单时间：{{date}}</span>
            <div class="delectWrap" @click="modeChange">
              <img class="delectIcon" src="../../assets/img/icon_delete@2x.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="maskWrap"
      catchtouchmove="preventTouchMove"
      v-if="maskState == true"

    ></div>
    <div class="maskContent" catchtouchmove="preventTouchMove" v-if="maskState == true">
      <!-- <div class="closeIconWrap">
    <img src="{{closeIcon}}" class="closeIcon" bindtap='delectMask'/>
      </div>-->
      <img src="../../assets/img/icon_delete2@2x.png" class="successIcon">
      <span class="maskInfo">确定要删除订单吗?</span>
      <span class="maskDetail">删除之后订单将不可恢复</span>
      <div class="btnWrap">
        <span @click="cancelOrder" style="border-right:0.02rem solid #EFEFEF;">取消</span>
        <span @click="delectOrder">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGetOrderDetail, fetchDeleteOrderDetail } from "@/api/order.js";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
// import { Popup } from "vux";
export default {
  name: "OrderDetail",
  components: {},
  data() {
    return {
      maskState: false,
      bg: "",
      imgState: false,
      list: [],
      reducedList: [],
      price: "",
      date: "",
      orderNo: "",
      orderId: ""
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.getOrderDetail();
  },
  mounted() {
    // console.log(this.$route.params.id);
  },
  methods: {
    delectOrder() {
      let req = {
        orderId: this.$route.params.id
      };
      fetchDeleteOrderDetail(req).then(res => {
        console.log(res)
        this.maskState = !this.maskState;
        this.$router.go(-1)
      });
    },
    cancelOrder() {
      this.maskState = !this.maskState;
    },
    modeChange() {
      this.maskState = true;
      this.imgState = false;
    },
    closeMask() {
      this.maskState = false;
      this.imgState = false;
    },
    getOrderDetail() {
      let req = {
        orderId: this.$route.params.id
      };
      fetchGetOrderDetail(req).then(res => {
        console.log(res);
        this.list = res.data.result.photoList;
        this.orderNo = res.data.result.orderNo;
        this.date = res.data.result.date;
        this.price = res.data.result.price;
        this.reducedList = res.data.result.reducedList;
      });
    }
  }
};
</script>

<style lang="less">
.order-detail {
  background: #f5f5f5;
  .container {
    /* width:auto;
  height: auto;
  position: absolute; */
    width: 100%;
    height: 100%;
  }
  .clear {
    clear: both;
  }
  .regionWrap {
    width: 7.5rem;
    padding: 0.32rem 0;
    height: auto;
    background: #fff;
  }
  .regionTit {
    // width: 7.5rem;
    height: 0.6rem;
    font-size: 0.28rem;
    color: #646464;
    text-align: left;
    margin-left: 0.32rem; 
    // float: left;
  }
  .photoList {
    // width: 7.5rem;
    height: 100%;
    margin-left: 0.32rem;
  }
  .photoList div {
    width: 3.32rem;
    height: 3.3rem;
    background: #f0f2f5;
    // float: left;
    margin-right: 0.24rem;
    margin-bottom: 0.24rem;
  }
  .photoList div .spot-po-img {
    width: 100%;
    height: 100%;
  }
  .infoBar,
  .orderBottom {
    width: 7.5rem;
    height: auto;
    background: #fff;
    padding: 0.32rem 0;
    border-bottom: 0.02rem solid #f2f2f2;
  }
  .textItem {
    display: flex;
    justify-content: space-between;
    margin: 0 0.32rem;
    color: #646464;
    font-size: 0.28rem;
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .countMoney {
    color: #353535;
    font-size: 0.32rem;
  }
  .orderTextItem {
    color: #c2c2c2;
    font-size: 0.24rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .delectIcon {
    width: 0.22rem;
    height: 0.24rem;
    position: absolute;
    right: 0.28rem;
    top: 0.2rem;
  }
  .delectWrap {
    width: 1rem;
    height: 0.8rem;
    position: relative;
    right: -0.28rem;
    display: flex;
    justify-content: flex-end;
    top: -0.1rem;
  }

  .maskWrap {
    width: 100%;
    height: 100%;
    background: #000000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0.9;
    overflow: hidden;
  }
  .maskContent {
    width: 100%;
    /* height:352rem;
  background: #fff;
  position: absolute;
  top:0;
  left:50%;
  transform: translate(-50%,100%);
  z-index:53; */
  }
  .bigImg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 53;
  }
  .bigImgg {
    transform: translate(0, -50%);
  }
  .closeIconWrap {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5003;
  }
  .closeIcon {
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    /* margin:0 auto;
  margin-left:40%; */
    margin: 0.32rem;
  }

  .maskWrap {
    width: 100%;
    height: 100%;
    background: #000000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    opacity: 0.6;
  }
  .maskContent {
    width: 5.08rem;
    height: auto;
    background: #fff;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    z-index: 3;
  }

  .closeIconWrap {
    width: 1rem;
    height: 0.6rem;
    float: right;
    margin-top: 0.16rem;
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
    // margin-left: 2.04rem;
    margin-top: 0.34rem;
  }
  .maskContent span {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0.12rem 0;
  }
  .maskInfo {
    color: #353535;
    font-size: 0.32rem;
  }
  .maskDetail {
    color: #646464;
    font-size: 0.24rem;
    border-bottom: 0.02rem solid #efefef;
    height: 0.6rem;
  }
  .btnWrap {
    display: flex;
    height: 0.88rem;
    justify-content: space-between;
    text-align: center;
    margin-top: -0.24rem;
  }
  .btnWrap span {
    display: block;
    height: 0.77rem;
    line-height: 0.78rem;
    color: #646464;
    font-size: 0.24rem;
  }
}
</style>
