<template>
  <div class="home-index">
    <tab
      v-show="y>0"
      :line-width="2"
      bar-active-color="#FF0D00"
      active-color="#353535"
      default-color="#9B9B9B"
      :style="isTop ? 'z-index:100' : 'z-index:-100'"
      id="tab_top"
      :class="isTop ? 'tab_top active' : 'tab_top'"
    >
      <tab-item @on-item-click="onItemClick" :selected="current == 0">已购买</tab-item>
      <tab-item @on-item-click="onItemClick" :selected="current == 1">未购买</tab-item>
      <tab-item @on-item-click="onItemClick" :selected="current == 2">拍摄点</tab-item>
    </tab>
    <scroller
      class="scroller"
      ref="scroller"
      :on-refresh="refresh"
      :on-infinite="infinite"
      :bounce="false"
    >
      <scrollerx id="head" :bounce="false">
        <div class="home-scroller fl fl-jc-str">
          <img
            class="home-scroller-item"
            v-for="(item, index) in list"
            :key="index"
            :src="item.img"
            alt
          >
        </div>
      </scrollerx>
      <div style="height:0.9rem">
        <tab
          v-show="(h-y)>1"
          :line-width="2"
          bar-active-color="#FF0D00"
          active-color="#353535"
          default-color="#9B9B9B"
          id="tab_scroll"
          :class="isTop ? 'tab_top active' : 'tab_top'"
        >
          <tab-item @on-item-click="onItemClick" :selected="current == 0">已购买</tab-item>
          <tab-item @on-item-click="onItemClick" :selected="current == 1">未购买</tab-item>
          <tab-item @on-item-click="onItemClick" :selected="current == 2">拍摄点</tab-item>
        </tab>
      </div>

      <div v-if="current == 0" class="content-box no-buy">
        <div v-for="(item,index) in noBuyData" :key="index" class="no-buy-item fl fl-col fl-ai-ctr">
          <div class="loading fl fl-jc-ctr fl-ai-ctr">
            <div class="lds-css ng-scope">
              <div style="width:100%;height:100%" class="lds-eclipse">
                <div></div>
              </div>
            </div>
            <img @click="goGallery(index)" class="no-buy-image" :src="item.beautifyUrl" alt>
          </div>

          <div class="no-buy-info fl fl-col">
            <div class="no-buy-if-item fl fl-jc-str fl-ai-str">
              <div>￥{{item.price/100}}</div>
              <div>摄影师·{{item.photoGrapherName}}</div>
              <div v-if="item.repairType == 2">已精修</div>
              <div v-if="item.repairType == 1">已简修</div>
            </div>
            <div class="no-buy-if-item fl fl-jc-str fl-ai-str">
              <div class>拍摄时间：{{item.createDate}}</div>
            </div>
          </div>
          <div class="no-buy-address fl fl-jc-str fl-ai-ctr">
            <img src="../../assets/img/icon_car_address.png">
            <div class>{{item.scenicAreaName}}-{{item.scenicSpotName}}</div>
          </div>
          <div class="line"></div>
        </div>
        <div v-if="noBuyData.length == 0" class="no-buy-empty fl fl-col fl-ai-ctr">
          <img class="no-buy-empty-img" src="../../assets/img/NoPurchase@2x.png">
          <div class="no-buy-empty-text">扫描摄影师身上的二维码拍照吧</div>
          <div bindtap="scanChange" v-if="true" class="no-buy-empty-btn">扫码</div>
        </div>
      </div>

      <div v-if="current == 1" class="content-box buy no-buy">
        <div v-for="(item,index) in buyData" :key="index" class="no-buy-item fl fl-col fl-ai-ctr">
          <div class="loading fl fl-jc-ctr fl-ai-ctr">
            <div class="lds-css ng-scope">
              <div style="width:100%;height:100%" class="lds-eclipse">
                <div></div>
              </div>
            </div>
            <img @click="goGalleryIs(index)" class="buy-image" :src="item.beautifyUrl" alt>
          </div>
          <div class="buy-info fl fl-col">
            <div class="no-buy-if-item fl fl-jc-str fl-ai-str">
              <div class>￥{{item.price/100}}</div>
              <div class>摄影师·{{item.photoGrapherName}}</div>
              <div v-if="item.repairType == 2">已精修</div>
              <div v-if="item.repairType == 1">已简修</div>
            </div>
            <div class="no-buy-if-item fl fl-jc-str fl-ai-str">
              <div class>拍摄时间：{{item.createDate}}</div>
            </div>
          </div>
          <div class="buy-address fl fl-jc-str fl-ai-ctr">
            <img src="../../assets/img/icon_car_address.png">
            <div class>{{item.scenicAreaName}}-{{item.scenicSpotName}}</div>
          </div>
          <div class="line"></div>
        </div>
        <div v-if="buyData.length == 0" class="no-buy-empty fl fl-col fl-ai-ctr">
          <img class="no-buy-empty-img" src="../../assets/img/Purchased@2x.png">
          <div class="no-buy-empty-text">您还没有购买任何照片哦</div>
          <div class="no-buy-empty-btn">去购买</div>
        </div>
      </div>
      <div v-if="current == 2" class="home-scroller fl fl-jc-str">第三页</div>
    </scroller>
  </div>
</template>

<script>
// @ is an alias to /src
import { Scroller as Scrollerx, Tab, TabItem } from "vux";
import { setTimeout } from "timers";
import { fetchHomeList, fetchHomeBuyList } from "@/api/home.js";

export default {
  name: "HomeIndex",
  components: {
    Scrollerx,
    Tab,
    TabItem
  },
  data() {
    return {
      list: [
        {
          url: "javascript:",
          img: "https://pic.travelphotography.cn/banners/lijiang20190105.jpg"
        }
      ],
      current: 0,
      y: 0,
      h: 0,
      timer: null,
      isTop: false,
      noBuyData: [], //未购买页数据
      buyData: [], //未购买页数据
      noPageNo: 1, //未购买页码
      noPageSize: 10, // 未购买每页数据数量
      noPages: 0, //未购买总页数
      pageNo: 1, //已购买页码
      pageSize: 10, // 已购买每页数据数量
      pages: 0 //已购买总页数
    };
  },
  mounted() {
    this.h = document.querySelector("#head").clientHeight;
    this.getPosition();
    let noBuy = {
      pageNo: 1,
      pageSize: 10,
      userId: this.$store.state.userId
    };
    this.getList(noBuy);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  deactivated() {
    clearInterval(this.timer);
    this.timer = null;
  },
  activated() {
    this.getPosition();
    let a = Number(this.y);
    setTimeout(() => {
      this.$refs.scroller.scrollTo(0, a, false);
    }, 20);
  },
  methods: {
    getPosition() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        let { top } = this.$refs.scroller.getPosition();
        this.y = top;
        this.isTop = top > this.h;
      }, 10);
    },
    goGallery(index) {
      this.$router.push({ path: "/gallery", query: { index: index } });
    },
    goGalleryIs(index) {
      this.$router.push({ path: "/gallerys", query: { index: index } });
    },
    getList(data) {
      fetchHomeList(data).then(res => {
        this.$refs.scroller.finishPullToRefresh();
        this.noBuyData = this.noBuyData.concat(res.data.result.records);
        this.noPages = res.data.result.pages;
        this.noPageNo = this.noPageNo + 1;
      });
    },
    getBuyList(data) {
      fetchHomeBuyList(data).then(res => {
        this.$refs.scroller.finishPullToRefresh();
        this.buyData = this.buyData.concat(res.data.result.records);
        this.pages = res.data.result.pages;
        this.pageNo = this.pageNo + 1;
      });
    },
    onItemClick(index) {
      this.current = index;
      if (index == 0 && this.noPageNo <= 1) {
        var c = {
          pageNo: this.noPageNo,
          pageSize: this.noPageSize,
          userId: this.$store.state.userId
        };
        this.getList(c);
      } else if (index == 1 && this.pageNo <= 1) {
        var d = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          userId: this.$store.state.userId
        };
        this.getBuyList(d);
      }
    },
    refresh() {
      let a = {
        pageNo: 1,
        pageSize: 10,
        userId: this.$store.state.userId
      };
      if (this.current == 0) {
        this.noPageNo = 1;
        this.noPageSize = 10;
        this.noBuyData = [];
        this.getList(a);
      } else if (this.current == 1) {
        this.pageNo = 1;
        this.pageSize = 10;
        this.buyData = [];
        this.getBuyList(a);
      } else {
        this.$refs.scroller.finishPullToRefresh();
      }
    },
    infinite() {
      if (this.current == 0) {
        if (this.noPageNo <= this.noPages) {
          let noBuy = {
            pageNo: this.noPageNo,
            pageSize: this.noPageSize,
            userId: this.$store.state.userId
          };
          this.getList(noBuy);
        }
        setTimeout(() => {
          this.$refs.scroller.finishInfinite(this.noPageNo >= this.noPages);
        }, 500);
      } else if (this.current == 1) {
        if (this.pageNo <= this.pages) {
          let buy = {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            userId: this.$store.state.userId
          };
          this.getBuyList(buy);
        }
        setTimeout(() => {
          this.$refs.scroller.finishInfinite(this.pageNo >= this.pages);
        }, 500);
      }
    }
  }
};
</script>

<style lang="less">
.home-index {
  #tab_scroll {
    position: relative;
    background: #fff;
    border-bottom: 0.02rem solid #f5f5f5;
  }
  #tab_top {
    position: fixed;
    top: 0;
    // z-index: 100;
    width: 100%;
    background: #fff;
    border-bottom: 0.02rem solid #f5f5f5;
  }
  .no-buy {
    position: relative;
    width: 100%;
    min-height: 9.5rem;
    /* 未购买相关 */
    .no-buy-item {
      /* margin-bottom: 16rem; */
      padding-top: 0.48rem;
    }

    .line {
      width: 100%;
      height: 0.16rem;
      background: #f5f5f5;
    }

    .no-buy-image {
      position: relative;
      z-index: 11;
      width: 5.4rem;
      margin: 0 auto;
    }

    .no-buy-info {
      width: 5.4rem;
      margin: 0.16rem auto 0;
    }

    .no-buy-if-item {
      margin-bottom: 0.08rem;
    }

    .no-buy-if-item div {
      height: 0.44rem;
      padding: 0 0.22rem;
      line-height: 0.44rem;
      color: #646464;
      font-size: 0.2rem;
      text-align: center;
      background: #f0f0f0;
      border-radius: 0.22rem;
      margin-right: 0.08rem;
    }

    .no-buy-address {
      height: 0.74rem;
      width: 5.4rem;
      margin: 0.04rem auto 0;
    }

    .no-buy-address img {
      height: 0.32rem;
      width: 0.24rem;
      margin-right: 0.16rem;
    }

    .no-buy-address div {
      color: #353535;
      font-size: 0.24rem;
    }
    .no-buy-empty {
      min-height: 9.5rem;
    }
    .no-buy-empty-img {
      width: 3.5rem;
      height: 3.5rem;
      margin-bottom: 0.66rem;
      margin-top: 0.2rem;
    }
    .no-buy-empty-text {
      font-size: 0.32rem;
      color: #646464;
      margin-bottom: 1.4rem;
    }
    .no-buy-empty-btn {
      width: 2.12rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background: #ffcc00;
      font-size: 0.28rem;
      color: #000;
      text-align: center;
      border-radius: 0.3rem;
    }
  }

  .buy {
    background: #fff;
    .buy-image {
      width: 100%;
      position: relative;
      z-index: 11;
    }

    .buy-info {
      // margin: 0 ;
      margin: 0.16rem auto 0;
      width: 6.86rem;
    }
    .buy-address {
      height: 0.74rem;
      width: 6.86rem;
      margin: 0.04rem auto 0;
    }
    .buy-address img {
      height: 0.32rem;
      width: 0.24rem;
      margin-right: 0.16rem;
    }

    .buy-address div {
      color: #353535;
      font-size: 0.24rem;
    }

    .buy-address-img2 {
      height: 0.37rem;
      width: 0.42rem;
    }

    .buy-share {
      height: 0.37rem;
      line-height: 0.37rem;
      width: 0.42rem;
      background: transparent;
      padding: 0;
      overflow: unset;
    }

    .buy-share::after {
      border: none;
    }
  }
  // .scroller {
  //   -webkit-transform: translate3d(0, 0, 0);
  //   transform: translate3d(0, 0, 0);
  //   -webkit-backface-visibility: hidden;
  //   backface-visibility: hidden;
  // }
  .home-scroller {
    background: #f5f5f5;
    padding: 0.16rem 0.32rem;
    .home-scroller-item {
      width: 100%;
      height: 1.68rem;
    }
  }
  .tab_top {
    .vux-tab-container {
      height: 0.9rem;
      transition: all 0.15s ease-out;
      .vux-tab {
        width: 60%;
        height: 0.88rem;
        transition: all 0.15s ease-out;
        .vux-tab-item {
          background: transparent;
          line-height: 1rem;
          font-size: 0.32rem;
          transition: all 0.15s ease-out;
        }
        .vux-tab-ink-bar {
          margin-left: 0.3rem;
          width: 0.28rem;
          transition: all 0.15s ease-out;
        }
      }
    }
  }
  .tab_top.active {
    .vux-tab-container {
      height: 0.9rem;
      .vux-tab {
        width: 82%;
        height: 0.88rem;
        .vux-tab-item {
          font-size: 0.48rem;
          background: transparent;
          line-height: 1rem;
        }
        .vux-tab-ink-bar {
          width: 0.4rem;
          margin-left: 0.37rem;
        }
      }
    }
  }
  .loading {
    position: relative;
    background: #fff;
    width: 100%;
    min-height: 4rem;
  }
  @keyframes lds-eclipse {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes lds-eclipse {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .lds-css {
    position: absolute;
    top: 0;
  }
  .lds-eclipse {
    position: relative;
  }

  .lds-eclipse div {
    position: absolute;
    -webkit-animation: lds-eclipse 1s linear infinite;
    animation: lds-eclipse 1s linear infinite;
    width: 1.6rem;
    height: 1.6rem;
    top: 1.22rem;
    left: 0;
    right: 0;
    z-index: 10;
    border-radius: 50%;
    box-shadow: 0 0.04rem 0 0 #ffee00;
    -webkit-transform-origin: 0.8rem 0.82rem;
    transform-origin: 0.8rem 0.82rem;
  }

  .lds-eclipse {
    width: 2rem !important;
    height: 2rem !important;
    -webkit-transform: translate(-0.8rem, -1rem) scale(1) translate(1rem, 1rem);
    transform: translate(-0.8rem, -1rem) scale(1) translate(1rem, 1rem);
  }
}
</style>
