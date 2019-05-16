<template>
  <div class="my">
    <headerGoBack :goBackBoo='goBackBoo' title='我的'></headerGoBack>
    <header>
      <div class="myTop">
        <router-link to='/setting'><img src="../assets/image/set.png" alt=""></router-link>
        <router-link to='/minestore' tag='p'>我要卖货</router-link>
      </div>
      <div class="myHeadCon">
        <div class="userImg">
          <img src="../assets/image/photo.png" alt="">
        </div>
        <div class="userTel">
          <p>{{this.$store.state.loginUser.nickname}}</p>
          <p>{{this.$store.state.loginUser.phone | phoneHide}}</p>
        </div>
        <div class="more">
          <img src="../assets/image/ic_down_arr.png" alt="">
        </div>
      </div>
    </header>
    <div class="orderFrom">
      <div class="orderHead">
        <p>我的订单</p>
        <p @click='goMyOrder'>查看更多<img src="../assets/image/back.png" alt=""></p>
      </div>
      <div class="orderContent">
        <router-link to='/MyOderChildrenIctwo' tag='div' class="orderItem">
          <div class = "orderItemImg">
            <img src="../assets/image/myList1.png" alt="">
            <span v-if="myData.PENDING_PAYMENT>0">{{myData.PENDING_PAYMENT}}</span>
          </div>
          <p>待付款</p>
        </router-link>
        <router-link to='/MyOderChildrenIcthree' tag='div' class="orderItem">
          <div class = "orderItemImg">
            <img src="../assets/image/myList2.png" alt="">
            <span v-if="myData.TO_BE_SEND>0">{{myData.TO_BE_SEND}}</span>
          </div>
          <p>待发货</p>
        </router-link>
        <router-link to='/MyOderChildrenIcfour' tag='div' class="orderItem">
          <div class = "orderItemImg">
            <img src="../assets/image/myList3.png" alt="">
            <span v-if="myData.TO_BE_RECEIVED>0">{{myData.TO_BE_RECEIVED}}</span>
          </div>
          <p>待收货</p>
        </router-link>
        <router-link to='/MyOderChildrenIcfive' tag='div' class="orderItem">
          <div class = "orderItemImg">
            <img src="../assets/image/myList4.png" alt="">
          </div>
          <p>已完成</p>
        </router-link>
      </div>
    </div>
    <div class="myList">
      <router-link to='/coupons' tag='div'>
        <h1>{{myData.COUPON}}</h1>
        <p>优惠券</p>
      </router-link>
      <router-link :to='{name:"collect",params:{"name":"good"}}' tag='div'>
        <h1>{{myData.COLLECTGOODCOUNT}}</h1>
        <p>商品收藏</p>
      </router-link>
      <router-link :to='{name:"collect",params:{"name":"shop"}}' tag='div'>
        <h1>{{myData.COLLECTDEALERCOUNT}}</h1>
        <p>店铺收藏</p>
      </router-link>
      <router-link to='/mySupplier' tag='div'>
        <h1>{{myData.USERDEALERRELCOUNT}}</h1>
        <p>我的供应商</p>
      </router-link>
    </div>
    <div class="recentBrowse">
      <div class="recentHead">
        <img src="../assets/image/waterLeft.png" alt="">
        <p>最近浏览</p>
        <img src="../assets/image/waterRight.png" alt="">
      </div>
      <div class="recentContent" v-for="(item,index) in myRecord" :key = "index">
        <router-link tag = "img" :to="{name:'commodityDetails',query:{skuId:item.skuId}}" :src="item.mainPic || item.picsUrl | picsUrl" alt=""/>
        <div>
          <router-link  tag = "p" :to="{name:'commodityDetails',query:{skuId:item.skuId}}"  style = "line-height: 0.16rem;">{{item.goodsName}}</router-link>
          <div>
            <router-link  tag = "div" :to="{name:'commodityDetails',query:{skuId:item.skuId}}" >
              <p>
                <span>￥{{item.orderPrice|addZero}}</span>
                <span>1{{item.defaultSellUnit}}起批</span>
              </p>
              <p v-if="item.dealer">{{item.dealer.name}}</p>
            </router-link>
            <shoppingCar :goodsId = 'item.skuId'></shoppingCar>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerGoBack from '../commonComponents/headGoBack'
export default {
  components: {
    headerGoBack
  },
  data() {
    return {
      myListData: '',
      myData: '',
      myRecord: [],
      goBackBoo: false
    }
  },
  filters: {
    phoneHide(val) {
      val = val.toString()
      if(val.length == 11) {
        return val.slice(0,3) + '****' + val.slice(7,11)
      }
      return val
    },
  },
  methods: {
    myList() {
      let data = {
        merchantId: this.$store.state.getByUser.merchantId,
        userId: this.$store.state.id
      }
      this.$ajax.myData(data).then(res=>{
        this.myData = res.data.result
      })
    },
    getGoodsRecordByUserId() {
      let data = {
        dealerId: this.$store.state.getByUser.id,
        groupStoreId: this.$store.state.myUser.storeId,
        merchantId: this.$store.state.getByUser.merchantId,
        pageNum:1,
        pageSize:20,
        shopId: this.$store.state.getByUser.id,
        stationId: this.$store.state.stationId,
        userId: this.$store.state.myUser.createUser
      }
      this.$ajax.getGoodsRecordByUserId(data).then(res=>{
        this.myRecord = res.data.result
        console.log(res)
      })
    },
		goMyOrder(){
			this.$router.push('/myOrder')
    },
  },
  created() {
    this.myList()
    this.getGoodsRecordByUserId()
  }
}
</script>

<style scoped lang="scss">

.my{
  background: #eee;
  overflow: hidden;
  header{
    height: 1.4rem;
    background-image: linear-gradient(270deg, #F46839 3%, #DD3333 100%);
    padding: .12rem;
    .myTop{
      height: .24rem;
      // padding-left: 2.28rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img{
        width: .18rem;
        height: .18rem;
      }
      >p{
        padding: .05rem .11rem;
        font-size: 0.14rem;
        color: #FFFFFF;
        border-radius: 1rem;
        border: 1px solid #fff;
        margin-left: 0.24rem;
      }
    }
    .myHeadCon{
      display: flex;
      align-items: center;
      position: relative;
      .userImg{
        width: .6rem;
        height: .6rem;
        background: #FFFFFF;
        border: 0.04rem solid rgba(255,255,255,0.60);
        border-radius: 50%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        >img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .userTel{
        // width: 1.2rem;
        height: .6rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: .15rem;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // box-sizing: border-box;
        >P{
          color: #fff;
        }
        >p:nth-child(1){
          font-size: 0.16rem;
        }
        >p:nth-child(2){
          font-size: 0.12rem;
          margin-top: 0.1rem;
        }
      } 
      .more{
        position: absolute;
        right: 0.1rem;
        >img{
          width: 0.12rem;
          transform: rotateZ(-90deg)
        }
      }
    }
  }
  .orderFrom{
    width: 96%;
    height: 1.29rem;
    background: #fff;
    position: absolute;
    top: 1.58rem;
    left: 2%;
    border-radius: 0.04rem;
    .orderHead{
      height: .4rem;
      padding: 0 .14rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      >p:nth-child(1){
        font-size: 0.14rem;
        color: #333333;
      }
      >p:nth-child(2){
        font-size: 0.12rem;
        color: #666666;
        display: flex;
        align-items: center;
        >img{
          width: .06rem;
          height: .12rem;
          transform: rotateZ(180deg);
          margin-left: .08rem;
        }
      }
    }
    .orderHead::after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #EEE;
      transform: scaleY(.5);
    }
    .orderContent{
      height: .89rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .orderItem{
        // flex-grow: 1;
        // justify-content: center;
        // align-items: center;
        
        position: relative;
        .orderItemImg{
          position: relative;
          width: .24rem;
          height: .24rem;
          margin: auto;
          >img{
            width: .24rem;
            height: .24rem;
          }
          span{
            position: absolute;
            // top: -0.04rem;
            // left: 0.5rem;
            min-width: .18rem;
            height: .18rem;
            background-color: #e64836;
            color: #fff;
            font-size: 0.12rem;
            border-radius: .18rem;
            text-align: center;
            line-height: .18rem;
            right: -0.1rem;
            top: -0.05rem;
          }
        }
        >p{
          margin-top: .14rem;
          font-size: 0.12rem;
          color: #333;
        }
      }
    }
  }
  .myList{
    width: 96%;
    background: #FFFFFF;
    border-radius: 0.04rem;
    margin: 0 auto;
    margin-top: .9rem;
    display: flex;
    >div{
      flex-grow: 1;
      text-align: center;
      padding: .19rem 0;
      >h1{
        font-size: 0.2rem;
        color: #333333;
      }
      >p{
        margin-top: .14rem;
      }
    }
  }
  .recentBrowse{
    margin: 0 auto;
    background: #fff;
    .recentHead{
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eee;
      padding: .13rem 0;
      >img{
        width: .27rem;
      }
      >p{
        font-size: 0.14rem;
        color: #F36639;
        margin: 0 .1rem;
      }
    }
    .recentContent{
      padding: .13rem .14rem;
      background: #fff;
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: space-between;
      >img{
        width: 1rem;
        height: 1rem;
      }
      >div{
        width: 2.35rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        >p{
          font-size: 0.14rem;
        }
        >div{
          height: .36rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          >div{
            >p:nth-child(1){
              width: 1.06rem;
              display: flex;
              justify-content: space-between;
              >span:nth-child(1){
                color:#d33;
                font-size: 0.14rem;
              }
              >span:nth-child(2){
                color:#ccc;
              }
            }
            >p:nth-child(2){
              margin-top: 0.1rem;
              color:#ccc;
            }
          }
          >img{
            width: .16rem;
            height: .16rem;
          }
        }
      }
    }
    .recentContent::after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #eee;
      transform: scaleY(.5);
    }
  }
}
</style>
