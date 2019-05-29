<template>
  <div class="gallery">
    <div class="top-info fl fl-jc-btn fl-ai-ctr">
      <img @click="getImgInfo" class="top-info-btn" src="../../assets/img/info.png">
      <div class="top-index">{{current-0+1}}/{{total}}</div>
      <img @click="deleteImg" class="top-delete-btn" src="../../assets/img/icon_delete1@2x.png">
    </div>
    <div style="height:100vh" class="page-wrap fl fl-jc-ctr fl-ai-ctr">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in noBuyData" :key="index">
          <img class="slide-img" :src="item.beautifyUrl" alt>
        </swiper-slide>
      </swiper>
    </div>
    <div class="bottom-info fl fl-col">
      <div
        :class="isEject == 0 ? 'bottom-menu active fl fl-jc-btn fl-ai-ctr' : 'bottom-menu fl fl-jc-btn fl-ai-ctr'"
      >
        <div class="fl fl-col">
          <div class="is-title fl fl-jc-str fl-ai-ctr">
            <div>商品详情</div>
          </div>
          <div class="is-body fl fl-jc-str fl-ai-ctr">
            <div>精美7寸塑封照片+电子版高清无水印照片（需下载）</div>
          </div>
          <div class="address fl fl-jc-str fl-ai-ctr">
            <img src="../../assets/img/icon_car_address.png">
            <div>{{scenicAreaName}}-{{scenicSpotName}}</div>
          </div>
        </div>
        <!-- <div></div> -->
        <!-- <img catchtap="onShowtips" class="bottom-info-img" src="../../assets/img/icon_tips@2x.png"> -->
      </div>
      <div :class="isEject == 1 ? 'bottom-menu active fl fl-col' : 'bottom-menu fl fl-col'">
        <div class="price fl fl-jc-btn fl-ai-ctr">
          <div class="price-text">价格：￥{{price}}</div>
          <img @click="closeBtm" class="price-img" src="../../assets/img/icon_no@2x.png">
        </div>
        <div class="choose">已选：7寸塑封照片+
          <text>原图</text>
        </div>
        <div class="choose-btns fl fl-jc-str fl-ai-ctr">
          <div
            v-if="repairType"
            @click="chooseRepair(0)"
            :class="isRepair == 0 ? 'choose-btn active' : 'choose-btn'"
          >7寸塑封照片+精修+原图</div>
          <div
            @click="chooseRepair(1)"
            :class="isRepair == 1 ? 'choose-btn active' : 'choose-btn'"
          >7寸塑封照片+原图</div>
        </div>
        <div
          class="img-info"
        >摄影师·{{photoGrapherName}} | {{repairType == 0 ? '原图' : (repairType == 1 ? '已简修' : '已精修')}} | 拍摄时间：{{createDate}}</div>
      </div>
      <div class="line"></div>
      <div class="botton-btns">
        <div v-if="isEject == 0" class="botton-btns fl fl-jc-str fl-ai-ctr">
          <img class="home" src="../../assets/img/icon_car_home.png">
          
          <img class="shop-car" src="../../assets/img/icon_ShoppingCart@2x.png">
          <div class="num-tip">{{count}}</div>
          <div
            style="margin-left:0.8rem"
            class="add-shop-car bottom-btn"
            v-if="isExistCart"
            @click="addCar(0)"
          >加入购物车</div>
          <div style="margin-left:0.8rem" v-else class="add-shop-car bottom-btn">已加入</div>
          <div @click="immediatelyBuy(1)" class="immediately bottom-btn">立即购买</div>
        </div>
        <div v-if="isEject == 1" class="botton-btns fl fl-jc-ctr fl-ai-ctr">
          <div v-if="carType == 1" @click="immediatelyBuy(1)" class="bottom-btn1">确定</div>
          <div v-if="carType == 0" @click="addCar(0)" class="bottom-btn1">确定</div>
        </div>
      </div>
    </div>
    <div :class="inInfo == 1 ? 'bg_color active' : 'bg_color'" @click="cancel">
      <div class="data_list">
        <div class="add_hang">
          <div class="text_al">景区</div>
          <div>{{imgInfo.scenicAreaName}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">摄影师</div>
          <div>{{imgInfo.grapherName}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">分辨率</div>
          <div>{{imgInfo.distinguishability}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">大小</div>
          <div>{{imgInfo.size}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">相机型号</div>
          <div>{{imgInfo.model}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">光圈值</div>
          <div>{{imgInfo.apertureValue}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">曝光时间</div>
          <div>{{imgInfo.exposureTime}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">IOS速度</div>
          <div>{{imgInfo.isoSpeedRatings}}</div>
        </div>
        <div class="add_hang">
          <div class="text_al">焦距</div>
          <div>{{imgInfo.focalLength}}</div>
        </div>
      </div>
    </div>
    <div v-if="false" catchtap="onShowtips" class="tips">
      <div class="tips-body fl fl-col fl-ai-ctr">
        <div class="tips-title">温馨提示</div>
        <div class="tips-text">购买后请至景区“旅拍通打印部”获取精美7寸塑封照片。</div>
        <div class="tips-text">如有其他问题，请联系“旅拍通客服”。</div>
      </div>
    </div>
    <div
      v-if="repairType"
      @click="chooseType(0)"
      :class="isRepair == 0 ? 'right-btn repair active' : 'right-btn repair'"
    >精修</div>
    <div
      @click="chooseType(1)"
      :class="isRepair == 1 ? 'right-btn original active' : 'right-btn original'"
    >原图</div>
    <toast
      v-model="toast.showPositionValue"
      type="text"
      :time="1000"
      is-show-mask
      :text="toast.text"
      position="middle"
    ></toast>
    <dialogs :dialogOptions="dialogOptions"/>
  </div>
</template>

<script>
import { fetchHomeList } from "@/api/home.js";
import {
  fetchAddCar,
  fetchTotalCount,
  fetchImgInfo,
  fetchDeleteImg
} from "@/api/gallery.js";
import { Toast } from "vux";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import dialogs from "../../components/Dialog.vue";
let that = null;
export default {
  name: "Gallery",
  components: {
    swiper,
    swiperSlide,
    Toast,
    dialogs
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
      toast: {
        showPositionValue: false,
        text: ""
      },
      noBuyData: [],
      current: 0,
      noPageNo: 1, //未购买页码
      noPageSize: 10, // 未购买每页数据数量
      noPages: 0, //未购买总页数
      isEject: 0,
      carType: 0,
      total: 0,
      count: 0,
      type: 0, //精修or原图
      isRepair: 0, //精修+原图or原图
      imgInfo: {},
      inInfo: 0, //照片信息弹窗
      deleteNum: 0,
      dialogOptions: {
        show: false,
        title: "确定删除这张照片吗？",
        text: "您将永远失去这张照片！",
        onOk: () => {
          this.onOks();
        },
        onCancel: () => {
          this.onCancels();
        }
      }
    };
  },
  computed: {
    scenicAreaName() {
      return (
        this.noBuyData.length > 0 && this.noBuyData[this.current].scenicAreaName
      );
    },
    scenicSpotName() {
      return (
        this.noBuyData.length > 0 && this.noBuyData[this.current].scenicSpotName
      );
    },
    isExistCart() {
      return (
        this.noBuyData.length > 0 &&
        this.noBuyData[this.current].isExistCart == 0
      );
    },
    repairType() {
      return (
        this.noBuyData.length > 0 &&
        this.noBuyData[this.current].repairType == 2
      );
    },
    photoGrapherName() {
      return (
        this.noBuyData.length > 0 &&
        this.noBuyData[this.current].photoGrapherName
      );
    },
    createDate() {
      return (
        this.noBuyData.length > 0 && this.noBuyData[this.current].createDate
      );
    },
    price() {
      return (
        this.noBuyData.length > 0 && this.noBuyData[this.current].price / 100
      );
    }
  },
  created() {
    that = this;
    let index = this.$route.query.index;
    this.swiperOption.initialSlide = index;
    let a = Number(index);
    let b = Math.ceil((a + 1) / 10);
    let f = a % 10;
    let c = f == 9 ? (b + 1) * 10 : b * 10;
    this.noPageNo = f == 9 ? b + 1 : b;

    let q = {
      pageNo: 1,
      pageSize: c,
      userId: this.$store.state.userId
    };
    this.getList(q);
    this.getShoppingCount();
  },
  mounted() {},
  methods: {
    // 删除确定回调
    onOks: function() {
      let req = {
        photoId: this.noBuyData[this.current].id
      };
      fetchDeleteImg(req).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          let a =
            this.current == this.total - 1 ? this.current - 1 : this.current;
          let b = this.noBuyData.splice(this.current, 1);

          this.dialogOptions.show = false;
          this.total = this.total - 1;
          this.current = a;
          this.count = b[0].isExistCart == 0 ? this.count : this.count - 1;
          this.deleteNum = Number(that.data.deleteNum) + 1;
          // this.inInfo = 1;
          // this.imgInfo = res.data.result;
          if (this.deleteNum > 8 || this.noBuyData.length - this.current < 3) {
            let c = {
              pageNo: this.noPageNo,
              pageSize: this.noPageSize,
              userId: this.$store.state.userId
            };
            this.getList(c);
          }
          if (this.noBuyData.length == 0) {
            this.$router.go(-1)
          }
        }
      });
    },
    // 关闭弹出删除
    onCancels: function() {
      this.dialogOptions.show = false;
    },
    deleteImg: function() {
      this.dialogOptions.show = true;
    },
    getImgInfo: function() {
      let req = {
        photoId: this.noBuyData[this.current].id
      };
      fetchImgInfo(req).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.inInfo = 1;
          this.imgInfo = res.data.result;
        }
      });
    },
    cancel: function() {
      this.inInfo = 0;
    },
    // 右侧选择精修or原图
    chooseType: function(e) {
      this.isRepair = e;
    },

    // 底部选择精修+原图or原图
    chooseRepair: function(e) {
      this.isRepair = e;
    },
    closeBtm: function() {
      this.isEject = 0;
    },
    // 图片改变回调
    imgChange: function(e) {
      this.current = e;
      if (e > (this.noPageNo - 1) * this.noPageSize - 3 && e < this.total) {
        let c = {
          pageNo: this.noPageNo,
          pageSize: this.noPageSize,
          userId: this.$store.state.userId
        };
        this.getList(c);
      }
      this.noBuyData.length > 0 && this.noBuyData[e].repairType == 2 ? ((this.isRepair = 0), (this.type = 0)) : ((this.isRepair = 1), (this.type = 1));
    },
    addCar: function(e) {
      if (this.isEject == 0) {
        this.isEject = 1;
        this.carType = e;
      } else if (this.isEject == 1) {
        this.onAddCar();
      }
    },
    onAddCar: function() {
      let photoId = this.noBuyData[this.current].id;
      let repairType = this.noBuyData[this.current].repairType;
      let req = {
        photoId: photoId,
        repairType: repairType,
        userId: this.$store.state.userId
      };
      fetchAddCar(req).then(res => {
        if (res.data.code == 200) {
          this.noBuyData[this.current].isExistCart = 2;
          this.isEject = 0;
          this.count = Number(this.count) + 1;
          this.noBuyData = this.noBuyData;
          this.toast = {
            showPositionValue: true,
            text: "添加成功"
          };
        }
      });
    },

    //立即购买弹出
    immediatelyBuy: function(e) {
      if (this.isEject == 0) {
        this.isEject = 1;
        this.carType = e;
      } else if (this.isEject == 1) {
        let photoId = this.noBuyData[this.current].id;
        let repairType = this.noBuyData[this.current].repairType;
        let req = {
          photoId: photoId,
          repairType: repairType,
          userId: this.$store.state.userId
        };
        fetchAddCar(req).then(res => {
          if (res.data.code == 200) {
            this.noBuyData[this.current].isExistCart = 2;
            this.isEject = 0;
            this.count = Number(this.count) + 1;
            this.noBuyData = this.noBuyData;
          }
        });
      }
    },

    // 获取购物车数量
    getShoppingCount() {
      let req = {
        userId: this.$store.state.userId
      };
      fetchTotalCount(req).then(res => {
        if (res.data.code == 200) {
          this.count = res.data.result;
        }
      });
    },
    onIndexChange(index) {
      this.current = index;
    },

    //获取列表
    getList(data) {
      fetchHomeList(data).then(res => {
        let d = res.data.result.records;
        this.noBuyData = this.noBuyData.concat(d);
        this.noBuyData[this.current].repairType != 2 &&
          ((this.isRepair = 1), (this.type = 1));
        this.noPages = res.data.result.pages;
        this.noPageNo = this.noPageNo + 1;
        this.total = res.data.result.total;
      });
    }
  }
};
</script>

<style lang="less">
/* pages/gallery/gallery.wxss */

.gallery {
  background: #000;
  .slide-img {
    width: 100%;
  }
  .page-wrap {
    width: 100%;
  }

  .top-info {
    width: 100%;
    height: 0.98rem;
    position: fixed;
    top: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
  }

  .top-info-btn {
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.32rem;
  }

  .top-delete-btn {
    width: 0.36rem;
    height: 0.4rem;
    margin-right: 0.32rem;
  }

  .top-index {
    color: #fff;
    font-size: 0.32rem;
  }

  /* swiper */

  .swipers {
    width: 100%;
  }

  .swiper-wrap {
    min-height: 1rem;
  }

  .slide-image {
    width: 100%;
    height: 100%;
  }
  /* .slide-image.active{
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  width: 675px;
  height: 375px;
} */

  /* 底部 */

  .bottom-info {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding-top: 0.3rem;
  }
  .bottom-info-img {
    width: 0.74rem;
    height: 0.58rem;
    margin-right: 0.32rem;
    margin-bottom: 0.25rem;
  }
  .address {
    margin-bottom: 0.32rem;
  }

  .address div {
    font-size: 0.2rem;
    color: #fff;
    opacity: 0.8;
  }

  .address img {
    width: 0.18rem;
    height: 0.24rem;
    margin-left: 0.35rem;
    margin-right: 0.18rem;
  }

  .is-title {
    margin-bottom: 0.16rem;
    margin-left: 0.32rem;
  }

  .is-title div {
    font-size: 0.28rem;
    color: #fff;
  }

  .is-body {
    margin-bottom: 0.16rem;
    margin-left: 0.32rem;
    font-size: 0.24rem;
    color: #fff;
  }

  .botton-btns {
    height: 0.98rem;
    position: relative;
  }

  .home {
    width: 0.46rem;
    height: 0.44rem;
    margin-left: 0.32rem;
  }

  .shop-car {
    width: 0.4rem;
    height: 0.44rem;
    margin-left: 0.64rem;
  }
  .shop-car1 {
    width: 0.46rem;
    height: 0.46rem;
    margin-left: 0.64rem;
  }

  .bottom-btn {
    width: 2.12rem;
    height: 0.6rem;
    line-height: 0.65rem;
    border-radius: 0.3rem;
    text-align: center;
    color: #000000;
    font-size: 0.28rem;
  }
  .bottom-btn1 {
    width: 2.12rem;
    height: 0.6rem;
    line-height: 0.65rem;
    border-radius: 0.3rem;
    text-align: center;
    color: #000000;
    font-size: 0.28rem;
    background: #ffcc00;
  }

  .add-shop-car {
    background: #ffcc00;
    margin-left: 0.8rem;
  }

  .immediately {
    background: #ffbb00;
    margin-left: 0.32rem;
  }

  .num-tip {
    position: absolute;
    left: 1.65rem;
    top: 0.18rem;
    width: 0.3rem;
    height: 0.3rem;
    background: #ffcc00;
    border-radius: 0.3rem;
    line-height: 0.35rem;
    text-align: center;
    color: #000;
    font-size: 0.2rem;
  }

  .price {
    padding: 0 0.32rem;
  }

  .price-text {
    color: #fff;
    font-size: 0.36rem;
  }

  .price-img {
    width: 0.36rem;
    height: 0.36rem;
  }

  .choose {
    font-size: 0.24rem;
    color: #fff;
    margin-left: 0.32rem;
    margin-top: 0.08rem;
    opacity: 0.8;
    text-align: left;
  }

  .choose-btns {
    padding-left: 0.32rem;
    margin-top: 0.32rem;
  }

  .choose-btn {
    font-size: 0.28rem;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0 0.3rem;
    border: 0.02rem solid #fff;
    color: #fff;
    border-radius: 0.3rem;
    margin-right: 0.38rem;
  }

  .choose-btn.active {
    color: #ffcc00;
    border: 0.02rem solid #ffcc00;
  }

  .img-info {
    font-size: 0.24rem;
    color: #fff;
    opacity: 0.9;
    margin: 0.48rem 0 0.34rem 0.32rem;
    text-align: left;
  }

  .line {
    height: 0.02rem;
    background: #fff;
    opacity: 0.2;
    width: 100%;
  }

  .bottom-menu {
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.2s ease-out;
  }

  .bottom-menu.active {
    height: auto;
    opacity: 1;
  }

  /* 右侧按钮 */

  .repair {
    bottom: 4.18rem;
  }

  .original {
    bottom: 3.08rem;
  }

  .right-btn {
    position: fixed;
    right: 0.32rem;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.8rem;
    text-align: center;
    color: #000;
    font-size: 0.28rem;
    background: #fff;
    z-index: 8;
  }

  .right-btn.active {
    background: #ffcc00;
  }

  /* 信息弹出 */

  .bg_color {
    width: 0;
    height: 100%;
    background-color: black;
    opacity: 0;
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transition: all 0.3s ease-out;
  }

  .bg_color.active {
    opacity: 0.8;
    width: 100%;
  }

  .data_list {
    z-index: 8;
    color: white;
    margin: 1.46rem 0.4rem;
    text-align: left;
  }
  .add_hang {
    height: 0.8rem;
  }
  .add_hang div {
    display: inline-block;
    font-size: 0.2rem;
    line-height: 0.48rem;
    padding-left: 0.5rem;
  }

  .text_al {
    text-align: right;
    width: 1rem;
  }

  .tips {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }
  .tips-body {
    width: 4.44rem;
    height: 2.7rem;
    background: #fff;
    border-radius: 0.05rem;
    margin: 3.44rem auto 0;
    padding: 0.32rem;
  }
  .tips-title {
    color: #353535;
    margin: 0.32rem 0;
    font-size: 0.32rem;
  }
  .tips-text {
    color: #646464;
    font-size: 0.25rem;
    margin: 0 auto 0.32rem;
    text-align: left;
    width: 100%;
  }
}
</style>
