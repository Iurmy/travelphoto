<template>
  <div class="list">
    <div class="container" v-if="!orderEmptyState">
      <div v-for="(list,index) in orderList" :key="index">
        <div class="item" @click="enterOrderDetail(list.id)">
          <div class="itemTit">
            <span>订单号 {{list.orderNo}}</span>
            <span style="color:#646464;">已完成</span>
          </div>
          <div class="axisItem">
            <div class="axis" :key="idx" v-for="(i,idx) in list.areaNameList">
              <div class="left">
                <div class="circle"></div>
              </div>
              <div class="text">
                <span class="adr">{{i}}</span>
                <!-- <div class="photoType">精修+原图 *2</div> -->
              </div>
            </div>
            <div class="axis">
              <div class="left">
                <div class="circle"></div>
              </div>
              <div class="text">
                <span>共{{list.photoCount}}张照片 合计 ￥{{list.price/100}}</span>
              </div>
            </div>
            <div class="axis">
              <div class="left">
                <div class="circle"></div>
              </div>
              <div class="text fl fl-jc-btn">
                <span>{{list.createDate}}</span>
                <div class="delectWrap fl fl-jc-end" catchtap="delectMask(list.id)">
                  <img src="../../assets/img/icon_delete@2x.png" class="delectIcon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:100vh" class="container fl fl-col" v-if="orderEmptyState">
      <img src="../../assets/img/emptyOrder@2x.png" class="orderEmptyImg">
      <div class="infoText">没有订单哦，速去下单吧</div>
    </div>
    <!-- <div></div> -->
    <div
      class="maskWrap"
      catchtouchmove="preventTouchMove"
      v-if="maskState == true"
      bindtap="delectMask"
    ></div>
    <div class="maskContent" catchtouchmove="preventTouchMove" v-if="maskState == true">
      <!-- <div class="closeIconWrap">
    <img src="{{closeIcon}}" class="closeIcon" bindtap='delectMask'/>
      </div>-->
      <img src="../../assets/img/icon_delete2@2x.png" class="successIcon">
      <span class="maskInfo">确定要删除订单吗?</span>
      <span class="maskDetail">删除之后订单将不可恢复</span>
      <div class="btnWrap" bindtap="delectMask">
        <span catchtap="cancelOrder" style="border-right:0.02rem solid #EFEFEF;">取消</span>
        <span catchtap="delectOrder">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGetOrderList } from "@/api/order.js";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
// import { Popup } from "vux";
export default {
  name: "Order",
  components: {},
  data() {
    return {
      // delectIcon: "../../assets/img/icon_delete@2x.png",
      // successIcon: "../../assets/img/icon_delete2@2x.png",
      maskState: false,
      orderEmptyImg: "../../assets/img/emptyOrder@2x.png",
      orderEmptyState: false,
      userId: "",
      pageNo: 1,
      totalPage: 0,
      orderList: [],
      delectId: ""
    };
  },
  created() {
    this.loadOrderList();
  },
  mounted() {},
  methods: {
    enterOrderDetail(e) {
      this.$router.push("/purchasedetail/"+e);
    },
    loadOrderList() {
      let req = {
        userId: this.$store.state.userId,
        pageNo: this.pageNo,
        pageSize: 100
      };
      fetchGetOrderList(req).then(res => {
        console.log(res);
        if (res.data.code == 200 && res.data.result.current == 1) {
          if (res.data.result.records == "") {
            this.orderEmptyState = true;
          } else {
            (this.orderEmptyState = false),
              (this.orderList = res.data.result.records);
          }
        }
        if (res.data.result.pages > 1 && res.data.result.current > 1) {
          this.orderList = this.orderList.concat(res.data.result.records);
        }
        this.pageNo = res.data.result.current;
        this.totalPage = res.data.result.pages;
      });
    }
  }
};
</script>

<style lang="less">
.list {
  background: #f5f5f5;

  .orderEmptyWrap {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: #fff;
    text-align: center;
  }
  .orderEmptyImg {
    width: 3.5rem;
    height: 3.5rem;
    margin: 3.1rem auto 0;
  }
  .infoText {
    text-align: center;
    margin-top: 0.6rem;
    color: #646464;
    font-size: 0.32rem;
  }
  .item {
    /* width:100%; */
    height: auto;
    background: #fff;
    margin: 0 0 0.2rem;
  }
  .photoList {
    /* width:100%; */
    height: auto;
  }
  .itemTit {
    height: auto;
    display: flex;
    justify-content: space-between;
    padding: 0.26rem 0.32rem;
    font-size: 0.24rem;
    color: #c2c2c2;
  }

  /* .itemTit{
  display: flex;
  justify-content: space-between;
  padding:26rem 32rem;
  font-size:24rem;
  color:#C2C2C2;
} */
  .axisItem {
    /* width:100%; */
    height: auto;
    padding-top: 0.34rem;
    /* padding-bottom:34rem; */
    border-top: 0.02rem solid #f2f2f2;
  }
  .axis {
    display: flex;
    position: relative;
  }
  .axis:last-child .left {
    border-right: none;
  }
  .axis:last-child .circle {
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    border: 0.02rem solid #ffae40;
  }
  .axis:last-child .text {
    color: #c2c2c2;
  }
  .left {
    width: 0.5rem;
    height: 0.6rem;
    border-right: 0.02rem dotted #ffae40;
    /* border-right:2rem dashed #FFAE40; */
  }
  .text {
    width: 6.4rem;
    height: 0.6rem;
    position: absolute;
    top: -0.1rem;
    left: 0.8rem;
    font-size: 0.28rem;
    display: flex;
    flex-direction: row;
    color: #646464;
  }
  .dateText {
  }
  .adr {
    margin-right: 0.64rem;
  }
  .photoType {
    height: 0.34rem;
    line-height: 0.3rem;
    padding: 0.02rem 0.22rem;
    border-radius: 0.6rem;
    font-size: 0.24rem !important;
    color: #ffae40;
    border: 0.02rem solid #ffae40;
  }
  .circle {
    width: 0.2rem;
    height: 0.2rem;
    background: #ffae40;
    position: absolute;
    left: 0.4rem;
    border-radius: 50%;
  }
  .delectWrap {
    width: 1rem;
  }
  .delectIcon {
    width: 0.22rem;
    height: 0.24rem;
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
    margin-left: 2.04rem;
    margin-top: 0.34rem;
  }
  .maskContent text {
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
  .btnWrap text {
    display: block;
    height: 0.77rem;
    line-height: 0.78rem;
    color: #646464;
    font-size: 0.24rem;
  }
}
</style>
