<!--  常购清单  -->
<template>
  <div class="keepList">
    <headGoBack title="常购清单" goBackBoo="goBackBoo" class="headGoBack"></headGoBack>
    <van-tabs v-model="active" animated class="good" swipeable>
      <van-tab title="全部商品">
        <router-link tag = "div" v-for="(items,index) in list.list " :key="index" class="quan" :to = "{name: 'commodityDetails', query:{skuId:items.skuId}}">
          <img v-if="items.mainPic" :src="items.mainPic" alt>
          <!-- <img v-else src="../../assets/image/ic_no_active.png" alt> -->
          <div class="right">
            <p>{{items.goodsName}}</p>
            <div class="Rightfooter">
              <p>
                <i>￥</i>
                <s>{{items.orderPrice}}</s>
                <span>{{items.integerZeroConvert}}</span>
                <shoppingCar :goodsId = 'items.skuId'></shoppingCar> 
              </p>
              <div>
                <em>已购买{{items.purchaseTimes}}</em>
                <i>{{items.dealer.name}}</i>
              </div>
            </div>
          </div>
        </router-link>
      </van-tab>
      <van-tab title="供应商">
        <div id="class">
          <div v-for="(i,index) in TranscodeClear" :key="index" class="shoplist">
            <div :class="menceng==index ? 'mc' : '' " ref="mc1">
              <div class="mm">
                <img src="../../assets/image/gongsi.png" alt>
                <div class="zhon">
                  <p>{{i.dealer.name}}</p>
                  <i>同店商品铺 {{i.goodsNum}}</i>
                </div>
                <div class="right" @click="mcc(index)">
                  <van-icon name="ellipsis"/>
                </div>
                <div :class="mp==index ? 'show1': 'show' " v-if="tubiao">
                  <p class="showChild1">
                    <!-- <img class="showd" src="../../assets/image/gongsi.png" alt> -->
                    <van-icon name="shop-o" size="0.17rem"/>
                    <i @click="jindian(index)">进店查看</i>
                  </p>
                  <p class="showChild2">
                    <van-icon name="star-o" size="0.17rem" v-if="!i.collected"/>
                    <van-icon name="star" size="0.17rem" v-else/>
                    <i v-if="!i.collected" @click="collect(index)">收藏店铺</i>
                    <i v-else @click="abrogatecollect(index)">取消收藏</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import headGoBack from "../../commonComponents/headGoBack";
import Vue from "vue";
import { Tab, Tabs } from "vant";
import { Icon } from "vant";
Vue.use(Icon);
Vue.use(Tab).use(Tabs);
import { Popup } from "vant";
Vue.use(Popup);
export default {
  data() {
    return {
      goBackBoo: true,
      active: 2,
      TranscodeClear: "",
      list: "",
      show: true,
      menceng: "",
      mpirce: true,
      mp: "",
      font: false,
      tubiao: false,
      li: []
    };
  },
  mounted() {
    this.$ajax.keepList().then(res => {
      // console.log(res.data.result);
      this.TranscodeClear = res.data.result;
    });
    this.$ajax.keepList1().then(res => {
      // console.log(res.data.result);
      this.list = res.data.result;
    });
    this.mcc();
  },
  methods: {
    mcc(index) {
      this.mp = index;
      if (this.menceng === index) {
        this.menceng = -1;
        this.tubiao = false;
        this.setdealerId(index);
        this.$router.push("/supplyDetails");
      } else {
        this.menceng = index;
        this.tubiao = true;
        this.keeplist(index);
      }
    },
    // font1(index) {
    //   this.font = !this.font;
    // },
    keeplist(index) {                        
      this.$ajax.keepList().then(res => {
        // console.log(res.data.result);
        this.TranscodeClear = res.data.result;
        if(index==undefined){
          index=1
        }
               
        this.$store.commit("setcustId", res.data.result[index].dealer.custId);
      });
    },
    collect(index) {
      // console.log("收藏");
      this.$ajax.collect(index).then(res => {
        // console.log(res);
        if (res.data.status.statusCode === 0) {
          this.keeplist(index);
        }
      });
    },
    abrogatecollect(index) {
      // console.log("取消收藏");
      this.$ajax.abrogatecollect(index).then(res => {
        if (res.data.status.statusCode === 0) {
          this.keeplist(index);
        }
      });
    },
    jindian(index) {
      var o = this.TranscodeClear[index].dealer;
      let obj = {
        custId: o.custId,
        dealerName: o.name,
        id:o.id
      };
      this.$store.commit("setCustId", obj);
      this.$router.push("/parentSupplier");
    },
    // 获取 dealerId   51接口
    setdealerId(index) {
      console.log(this.TranscodeClear[index].dealer.id);
      this.$store.commit("setdealerId", this.TranscodeClear[index].dealer.id);
    }
  },
  components: {
    headGoBack
  }
};
</script>
<style src = "../../utils/lh/commodityDetails.css"></style>
<style scoped lang="scss">
.van-tab__pane {
  margin-top: 0.05rem;
}
.keepList {
  background: #f2f1f6;
}
.shoplist {
  transition: all 0.3s;
  background: #ffffff;
  .mc {
    background: rgba(0, 0, 0, 0.3);
  }
  .mc1 {
    background: #ffffff;
  }

  .mm {
    border-bottom: 1px solid #f2f1f6;
    height: 0.77rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;

    img {
      width: 0.2rem;
      height: 0.2rem;
      padding-left: 0.3rem;
    }

    .right {
      padding-right: 0.3rem;
    }

    .zhon {
      margin-left: 0.2rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      p {
        font-size: 0.14rem;
      }
      i {
        color: #999999;
        font-size: 0.13rem;
        padding-top: 0.05rem;
      }
    }

    .show1 {
      position: absolute;
      width: 50%;
      display: flex;
      justify-content: space-around;
      height: 0.77rem;
      align-items: center;
      left: 0.8rem;
      .showChild1 {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.5rem;
        background-color: #f5a623;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .showd {
          width: 0.15rem;
          height: 0.15rem;
          padding-left: 0rem;
        }
        i {
          color: #ffffff;
          font-size: 0.12rem;
        }
      }
      .showChild2 {
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid red;
        margin-left: 0.1rem;
        border-radius: 0.55rem;
        background: red;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      i {
        color: #ffffff;
        font-size: 0.12rem;
      }
    }
    .show {
      display: none;
    }
  }
}
.quan {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;

  img {
    width: 1rem;
    height: 1rem;
    padding-top: 0.08rem;
    padding-bottom: 0.08rem;
    padding-left: 0.15rem;
  }
  .right {
    height: 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: 0.08rem;
    padding-top: 0.08rem;
    padding-right: 0.1rem;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    p {
      font-size: 0.15rem;
    }

    .Rightfooter {
      height: 100%;
      position: absolute;
      top: 0.24rem;

      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.25rem;
        width: 100%;
        justify-content: space-around;
        i {
          font-size: 0.12rem;
          color: red;
        }
        s {
          text-decoration: none;
          font-size: 0.16rem;
          color: red;
          margin-left: -0.17rem;
        }
        span {
          color: #999999;
          font-size: 12px;
          margin-left: 0.15rem;
        }
        img {
          width: 0.15rem;
          height: 0.15rem;
          float: right;
        }
      }
      div {
        margin-top: 0.08rem;
        color: #999999;
        i {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>