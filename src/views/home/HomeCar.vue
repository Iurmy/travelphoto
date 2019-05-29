<template>
  <div v-if="commonList.length != 0" class="car">
    <div>
      <div class="sc-head fl fl-jc-btn fl-ai-ctr">
        <div class="sc-head-title">购物车</div>
        <div @click="onAdministration" v-if="!isAdministration" class="sc-head-btn">管理</div>
        <div @click="onAdministration" v-else class="sc-head-btn">完成</div>
      </div>
      <div style="height:1.14rem"></div>
      <div v-for="(item,index) in commonList" :key="index" class="sc-content fl fl-col">
        <checklist
          v-model="checklistArea"
          class="sc-content-fat"
          :options="[item]"
          @on-change="areaChange(item.key)"
        ></checklist>
        <div class="sc-content-child fl fl-jc-btn" v-for="(itm,idx) in item.list" :key="idx">
          <div class="fl fl-col">
            <checklist
              class="check-child"
              v-model="checklistSpot"
              :options="[itm]"
              @on-change="spotChange"
            ></checklist>
            <div class="sc-li-types ml-60 fl fl-jc-str fl-ai-ctr">
              <div style="margin-right:0.32rem" class="sc-li-tip">摄影师·{{itm.grapherName}}</div>
              <div class="sc-li-type sc-li-tip">{{itm.repairType == 2 ? '精修+原图' : '原图'}}</div>
            </div>
            <div class="fl fl-jc-str ml-60 fl-ai-ctr">
              <div class="sc-li-tip sc-li-time">拍摄时间：{{itm.photoDateStr}}</div>
            </div>
            <div class="sc-li-money ml-60">￥{{itm.price/100}}</div>
          </div>
          <div class="car-img" :style="{backgroundImage:'url(' + itm.photoUrl + ')'}"></div>
          <div v-if="idx != item.list.length - 1" class="car-line"></div>
        </div>
        <div style="height:0.16rem;background:#f5f5f5"></div>
      </div>
    </div>
    <div style="height:0.98rem"></div>
    <div v-if="!isAdministration" class="order-bottom active fl fl-jc-btn fl-ai-ctr">
      <div @click="checkAll" class="all-choose fl fl-jc-str fl-ai-ctr">
        <check-icon :value.sync="isCheckAll">全选</check-icon>
      </div>
      <div class="order-total">
        合计：
        <span style="color:#FF0D00">￥{{price/100}}</span>
      </div>
      <div @click="goOrder" class="order-btn">去结算({{checklistSpot.length}})</div>
    </div>
    <div v-else class="order-bottom active fl fl-jc-btn fl-ai-ctr">
      <div @click="checkAll" class="all-choose fl fl-jc-str fl-ai-ctr">
        <check-icon :value.sync="isCheckAll">全选</check-icon>
      </div>
      <div @click="removeCart" class="remove-btn">移除</div>
    </div>
  </div>
  <div v-else>
    <div class="car-empty fl fl-col fl-ai-ctr">
      <img class="car-empty-img" src="../../assets/img/EmptyShoppingcart@2x.png">
      <div class="car-empty-text">购物车空空如也</div>
      <div @click="chooseImg" class="car-empty-btn">选取照片</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Checklist, CheckIcon } from "vux";
import { fetchCarList, fetchRemoveCar } from "../../api/home.js";
import { setTimeout } from "timers";
export default {
  name: "HomeCar",
  components: {
    Checklist,
    CheckIcon
  },
  data() {
    return {
      commonList: [],
      checklistSpot: [],
      checklistArea: [],
      isCheckAll: false,
      timer: true,
      first: true,
      price: 0,
      isAdministration: false
    };
  },
  mounted() {
    this.getShoppingCart();
  },
  methods: {
    goOrder: function() {
      let photoIds = this.checklistSpot;
      photoIds.length > 0
        ? this.$router.push({ path: "/preview", query: { ids: photoIds } })
        : null;
    },
    chooseImg() {
      this.$router.push("/home/index");
    },
    //移除购物车
    removeCart() {
      let req = {
        photoId: this.checklistSpot.join()
      };
      fetchRemoveCar(req).then(() => {
        let a = this.commonList.filter(item => {
          item.list = item.list.filter(itm => {
            return this.checklistSpot.indexOf(itm.key) < 0;
          });
          return item.list.length > 0;
        });
        this.commonList = a;
        this.checklistArea = [];
        this.checklistSpot = [];
      });
    },
    // 管理
    onAdministration() {
      this.isAdministration = !this.isAdministration;
    },
    checkAll() {
      if (this.isCheckAll) {
        let a = this.commonList.map(item => {
          return item.key;
        });
        let b = this.getSpot(this.commonList);
        this.checklistArea = a;
        this.checklistSpot = b;
      } else {
        this.checklistArea = [];
        this.checklistSpot = [];
      }
    },
    spotChange(val) {
      if (this.timer) {
        if (!this.first) {
          let a = this.commonList
            .filter(item => {
              return item.list.every(itm => {
                return this.checklistSpot.indexOf(itm.key) >= 0;
              });
            })
            .map(item => {
              return item.key;
            });

          let c = this.getPrice(val, this.commonList);
          this.price = c;
          this.checklistArea = a;
        }
        this.timer = false;
        setTimeout(() => {
          this.timer = true;
          this.first = false;
        }, 10);
      }
    },
    areaChange(val) {
      if (this.timer) {
        if (!this.first) {
          this.timer = false;
          let a = this.commonList.filter(item => {
            return val == item.key;
          });
          let b = this.getSpot(a);
          let c =
            this.checklistArea.indexOf(val) < 0
              ? this.checklistSpot.filter(item => {
                  return b.indexOf(item) < 0;
                })
              : Array.from(new Set(this.checklistSpot.concat(b)));
          this.price = this.getPrice(c, this.commonList);
          this.checklistSpot = c;
        }

        setTimeout(() => {
          this.timer = true;
          this.first = false;
        }, 10);
      }
    },

    // 获取某些景区下所有景点
    getSpot(data) {
      return [].concat(
        ...data.map(item => {
          return [].concat(
            ...item.list.map(itm => {
              return itm.key;
            })
          );
        })
      );
    },
    getSum(ar) {
      let arr = ar.length == 0 ? [0] : ar;
      let sum = arr.reduce((prev, curr) => {
        return prev + curr;
      });
      return sum;
    },
    getPrice(ids, list) {
      let b = []
        .concat(
          ...list.map(item => {
            return [].concat(
              ...item.list.filter(itm => {
                return ids.indexOf(itm.key) >= 0;
              })
            );
          })
        )
        .map(item => {
          return item.price;
        });
      return this.getSum(b);
    },
    getShoppingCart() {
      let req = {
        userId: this.$store.state.userId
      };
      fetchCarList(req).then(res => {
        console.log(res.data.result);
        let b = res.data.result.list.map(function(item) {
          item.key = item.scenicAreaId;
          item.value = item.scenicAreaName;
          item.list.map(function(itm) {
            itm.key = itm.photoId;
            itm.value = itm.scenicSpotName;
            itm.isCheck = false;
            return itm;
          });
          item.isCheck = false;
          return item;
        });
        // let d = JSON.parse(JSON.stringify(b)).map(function(item, index) {
        //   item.key = item.scenicAreaId + index;
        //   item.value = item.scenicAreaName;
        //   item.list.map(function(itm, idx) {
        //     itm.key = itm.photoId + idx;
        //     itm.value = itm.scenicSpotName;
        //     itm.isCheck = false;
        //     return itm;
        //   });
        //   item.isCheck = false;
        //   return item;
        // });
        this.commonList = b;
      });
    }
  }
};
</script>

<style lang="less">
.car {
  /* pages/shopCart/shopCart.wxss */
  background: #f5f5f5;
  // padding-bottom: 1rem;
  height: 100%;
  /* 头部 */

  .sc-head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 0.98rem;
    padding: 0 0.32rem;
    background: #fff;
    z-index: 10;
  }

  .sc-head-title {
    color: #353535;
    font-size: 0.48rem;
    font-weight: bold;
  }

  .sc-head-btn {
    color: #646464;
    font-size: 0.28rem;
  }

  /* 全选 */

  /* 列表 */

  .sc-content {
    background: #fff;
    label {
      cursor: none;
      width: 4rem;
    }
    label:focus {
      outline: none;
    }
    .car-img {
      width: 2.38rem;
      height: 2.38rem;
      margin-right: 0.32rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    .weui-cells:after {
      display: none;
    }
    .weui-cells:before {
      display: none;
    }
    .weui-cell__bd {
      flex: none;
      -webkit-box-flex: none;
    }
    .weui-cells_checkbox .weui-icon-checked:before {
      font-size: 0.32rem;
    }
    [class^="weui-icon-"]:before,
    [class*=" weui-icon-"]:before {
      margin: 0;
    }
    .weui-cells_checkbox .weui-cell__hd {
      padding-right: 0.26rem;
      .vux-checklist-icon-checked {
        position: relative;
        top: -0.03rem;
      }
    }
    .weui-cells__title + .weui-cells:focus {
      outline: none;
      background: transparent;
    }
    .weui-cells_checkbox
      .weui-check:checked
      + .vux-checklist-icon-checked:before {
      color: #ffae40;
    }
    .sc-content-fat {
      .weui-cell {
        padding: 0 0.32rem;
        height: 0.92rem;
        line-height: 0.92rem;
      }
      .weui-cell__bd {
        p {
          margin: 0;
          font-size: 0.32rem;
          color: #353535;
          font-weight: bold;
          line-height: 0.32rem;
        }
      }
    }
    .sc-content-child {
      position: relative;
      padding-bottom: 0.18rem;
      margin-bottom: 0.17rem;
      .check-child {
        margin-bottom: 0.4rem;
      }
      .weui-cell {
        padding: 0 0.32rem;
        height: 0.4rem;
        line-height: 0.4rem;
      }
      .weui-cell__bd {
        p {
          margin: 0;
          font-size: 0.28rem;
          color: #646464;
          line-height: 0.32rem;
        }
      }
    }
  }

  .sc-content-item {
    padding-top: 0.28rem;
    /* padding-bottom: 32rem; */
  }

  .sc-spot {
    margin-bottom: 0.14rem;
  }

  .sc-li-names {
    margin-bottom: 0.4rem;
  }

  .sc-spot-name {
    color: #353535;
    font-size: 0.32rem;
    font-weight: bold;
  }

  .sc-spot-tip {
    padding: 0 0.16rem;
    height: 0.32rem;
    border-radius: 9.99rem;
    line-height: 0.34rem;
    border: 0.02rem solid #ffae40;
    text-align: center;
    color: #ffae40;
    font-size: 0.2rem;
  }

  .sc-spot-list {
    padding-top: 0.16rem;
    padding-bottom: 0.18rem;
    /* border-bottom: 2rem solid rgba(0, 0, 0, 0.12); */
    position: relative;
    /* margin-bottom: 16rem; */
  }

  .sc-li-name {
    color: #646464;
    font-size: 0.28rem;
  }

  .sc-li-types {
    margin-bottom: 0.16rem;
  }

  .ml-60 {
    margin-left: 0.92rem;
  }

  .sc-li-tip {
    padding: 0 0.16rem;
    height: 0.34rem;
    border-radius: 9.99rem;
    // line-height: 0.34rem;
    border: 0.02rem solid #c2c2c2;
    text-align: center;
    color: #c2c2c2;
    font-size: 0.24rem;
  }

  .sc-li-type {
    color: #ffae40;
    border: 0.02rem solid #ffae40;
  }

  .sc-li-time {
    margin-bottom: 0.3rem;
  }

  .sc-li-money {
    color: #646464;
    font-size: 0.24rem;
    text-align: left;
  }

  .sc-li-img {
    width: 2.38rem;
    height: 2.38rem;
    overflow: hidden;
  }

  .sc-li-img img {
    width: 2.38rem;
    height: 2.38rem;
  }

  .car-line {
    position: absolute;
    bottom: 0;
    right: 0.32rem;
    height: 0.02rem;
    background: rgba(0, 0, 0, 0.12);
    width: calc(100% - 1.24rem);
  }

  .car-line-bg {
    height: 0.16rem;
    background: #f5f5f5;
    width: 100%;
  }

  .pd-32 {
    padding-left: 0.32rem;
    padding-right: 0.32rem;
  }

  .order-bottom {
    position: fixed;
    bottom: 0.98rem;
    left: 0;
    right: 0;
    height: 0;
    opacity: 0;
    border-top: 0.02rem solid rgba(0, 0, 0, 0.12);
    background: #fff;
    z-index: 10;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    transition: all 0.4s ease-out;
  }

  .order-bottom.active {
    height: 0.98rem;
    opacity: 1;
  }

  .all-choose {
    font-size: 0.28rem;
    color: #646464;

    .weui-icon {
      font-size: 0.32rem;
    }
    .weui-icon-success {
      color: #ffae40;
    }
    .vux-check-icon > .weui-icon-success:before,
    .vux-check-icon > .weui-icon-success-circle:before {
      color: #ffae40;
    }
    .vux-check-icon > span {
      position: relative;
      top: 0.025rem;
    }
    [class^="weui-icon-"]:before,
    [class*=" weui-icon-"]:before {
      margin: 0 0.24rem 0 0;
    }
  }

  .order-total {
    color: #353535;
    font-size: 0.28rem;
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
  .remove-btn {
    width: 2.12rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 9.99rem;
    text-align: center;
    background: #ff0d00;
    color: #fff;
    font-size: 0.28rem;
  }

  .sc-gallery {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 15;
  }

  .sc-gallery-no {
    position: fixed;
    top: 0.32rem;
    right: 0.32rem;
  }

  .sc-no-img {
    width: 0.36rem;
    height: 0.36rem;
  }

  .sc-gallery-img {
    width: 100%;
    height: unset;
  }
}
.car-empty {
  height: 11.28rem;
  background: #fff;
}

.car-empty-img {
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 0.66rem;
  margin-top: 3.1em;
}

.car-empty-text {
  font-size: 0.32rem;
  color: #646464;
  margin-bottom: 1.4rem;
}

.car-empty-btn {
  width: 2.12rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background: #ffcc00;
  font-size: 0.28rem;
  color: #000;
  text-align: center;
  border-radius: 0.3rem;
}
</style>
