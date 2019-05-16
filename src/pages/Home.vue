<template>
  <div class="home">
    <!-- <div></div> -->
    <div class='head'>
      <div class='headChildren' :class = "scrollTop > 150 ? 'headerTrans' : ''">
        <router-link to='/selectStores' tag='div' class='site'>
          <img src="../assets/image/site.png" alt=""/>
          <span>{{this.$store.state.id}}</span>
          <img src="../assets/image/ic_down.png" alt=""/>
        </router-link>
        <router-link to='/minestore' tag='p' class='headSell'>我要卖货</router-link>
      </div>
    </div>
    <div class = "homeInp" :style = "scrollTop > 150 ? 'top: 0.07rem; opacity: 1;' : ''">
      <router-link to='/inputSeeck' tag='div'  class='searchBox' :style = "scrollTop > 150 ? 'opacity: 1;' : ''">
          <img src="../assets/image/search.png" alt=""/>
          <span>搜索商品</span>
      </router-link>
    </div>
    <div class="swiper-container swiper-top" ref='b2bAdvList'>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,key) in homeData.b2bAdvList" :key="key">
            <img :src="item.picUrl" alt=""/>
        </div>
      </div>
    </div>
    <div class='classifyList'>
      <router-link :to='item.path' tag='div' v-for="(item,index) in classifyList" :key='index' class='classifyItem'>
        <img :src="item.imgUrl" alt=""/>
        <p>{{item.title}}</p>
      </router-link>      
    </div>
    <div class='statusBar'>
      <div class="swiper-container swiperY-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='(item,key) in 3' :key="key">
                <img src="../assets/image/horn.png" alt=""/>
                <span>新增《营销工具"拼团"玩法使用说明》内容详情向蜂网头条</span>
            </div>
        </div>
      </div>
    </div>
    <div class='recommendBar'>
      <div class='recommendInner' v-for='(item,key) in homeData.b2bFloorVoList' :key="key">
        <div class='recommendHead'>
          <div class='recommendHeadBox'>
            <img src="../assets/image/waterLeft.png" alt=""/>
            <span>{{item.name}}</span>
            <img src="../assets/image/waterRight.png" alt=""/>
          </div>
        </div>
        <div class="swiper-container recommendBannerSwiper">
          <div class="swiper-wrapper" v-if="item.b2bFloorBannerList.length>0">
            <div class="swiper-slide" v-for='(recommend,key) in item.b2bFloorBannerList' :key="key">
                <img :src="recommend.picUrl" alt=""/>
            </div>
          </div>
        </div>
        <!-- 小方格区域 -->
        <div class='brandsListRecommend'>
          <div class='brandsListRecommendBox' v-for='(brand,index) in item.brandsListRecommendLocationsList' @click='toBrandsList(brand)' :key='index'>
            <img class='brandsListRecommendImg' :src="brand.logoUrl" alt=""/>
            <p class='brandsListRecommendText'>{{brand.name}}</p>
          </div>
        </div>
        <!-- 横向滚动区域 -->
        <div class='recommendContent'>
        <div class='recommendContentBox'>
          <div class='recommendList' v-for="(items,key) in item.goodsListRecommendLocationsList" :key="key">
            <div v-if='items.promotionConponImgTag'>
              <img class='recommendImg' src='../assets/image/recommend.png' alt=''/>
              <p class='recommendText'>{{items.promotionConponImgTag}}</p>
            </div>
            <!-- 商品详情跳转 -->
            <router-link tag='img' :to="{name:'commodityDetails',query:{skuId:item.goodsListRecommendLocationsList[key].skuId}}" class='goodImg' :src='items.picsUrl' alt=""/>
            <p class='goodName'>{{items.goodsName}}</p>
            <p class='dealerName'>{{items.dealerName}}</p>
            <div class="goodsOrder">
              <span class='orderPrice'>￥{{items.orderPrice|addZero}}</span>
              <shoppingCar :goodsId = 'items.skuId'></shoppingCar>  
            </div>
          </div>
        </div>
    </div>
</div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import Swiper from 'swiper'
import '../../node_modules/swiper/dist/css/swiper.css'
export default {
  data() {
    return {
      homeData: {},
      classifyList: [
          {imgUrl:require('../assets/image/classOne.png'),title:'常购清单',path:'/keepList'},
          {imgUrl:require('../assets/image/classTwo.png'),title:'领券中心',path:'/couponRedemptionCentre'},
          {imgUrl:require('../assets/image/classThree.png'),title:'我的订单',path:'/myOrder'},
          {imgUrl:require('../assets/image/classFour.png'),title:'我的供应商',path:'/mySupplier'}
      ],
      scrollTop: ""
    }
  },
  methods: {
    getHomeData() {
      if(this.$store.state.loginBoo) {
        this.$ajax.homeData(this.$store.state.id).then(res=>{
          this.$store.commit('setStationId',res.siteid)
          if(res != '数据错误') {
            this.$ajax.home(res).then(msg=>{
              this.homeData = msg.data.result
              // console.log(msg)
              this.$store.commit('setHomeData',msg.data.result)
            }) 
          }else {
            //没登录请求
            this.$ajax.home().then(res=>{
              this.homeData = res.data.result
            })  
          }
        })
      }else {
        //没登录请求
        this.$ajax.home().then(res=>{
          this.homeData = res.data.result
        })  
      }
    },
    btbNewSwiper() {
      let b2tAdvList = this.$refs.b2bAdvList
      let mySwiper = new Swiper (b2tAdvList, {
        loop: true, // 循环模式选项
        autoplay: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:false,//修改swiper的父元素时，自动初始化swiper
      })
    },
    statusNewSwiper() {
      new Swiper (".swiperY-container", {
        loop: true, // 循环模式选项
        autoplay: true,
        direction: 'vertical'
      })
    },
    recommendNewSwiper() {
      new Swiper (".recommendBannerSwiper", {
        loop: true, // 循环模式选项
        autoplay: true,
      })
    },
    /**
     * 节流
     */
    throttle(fn, interval) {
      let canRun = true;
      return function() {
        if(!canRun) return false;
        canRun = false;
        setTimeout(()=> {
          fn.apply(this, arguments)
          canRun = true;
        },interval)
      }
    },
    /**
     * 滚动条测试
     */
    handleScroll() {
      let _this = this;
      window.onscroll = this.throttle(()=> {
        let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset//要做兼容 在模拟器能正常获取scrolltop在微信h5页面和手机的浏览器页面一直为0
        _this.scrollTop = top;
        // console.log(_this.scrollTop)
      },200)
    },
    // 小方格跳转
    toBrandsList(brand) {
      this.$store.commit('setBrandId',brand.brandId)
      this.$router.push('/goodSeeck')
    },
    /**
     * 跳转商品详情
     */
    goCommodityDetails(data, index) {
      // this.$store.commit('setCommodityDetailsSkuId', data.goodsListRecommendLocationsList[index].skuId)
    }
  },
  created() {
    this.getHomeData()
  },
  mounted() {
    this.btbNewSwiper()
    this.statusNewSwiper()
    this.recommendNewSwiper()
    this.handleScroll()
  },
  watch: {
    homeData() {
      this.$nextTick(()=>{
        this.btbNewSwiper()
      }) 
    }
  },
}
</script>

<style scoped lang="scss">
.home{
  font-size: 0.12rem;
  background: #F2F1F6;
  .head{
    position: sticky;
    top: 0;
    left: 0;
    z-index: 9999;
    height: .45rem;
    background: #DD3333;
    .headChildren{
      height: .45rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.25s linear;
      .site{
          float: left;
          margin-left: .14rem;
          display: flex;
          align-items: center;
          img:nth-of-type(1){
              width: .13rem;
              height: .13rem;
          }
          img:nth-of-type(2){
              width: .1rem;
              height: .1rem;
          }
          span{
              margin: 0 .07rem;
              font-size: .16rem;
              color: #fff;
          }
      }
      .headSell{
          float: right;
          margin-right: .14rem;
          padding: .05rem .11rem;
          font-size: .14rem;
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.60);
          border-radius: 1rem;
      }
    }
    .headerTrans{
      transform: translateY(-0.5rem);
    }
  }
  .homeInp{
    position: fixed;
    top: .56rem;
    left: .14rem;
    right: .14rem;
    z-index: 99992;
    transition: all 0.25s linear;
    .searchBox{
        height: .14rem;
        opacity: 0.9;
        background: #FFFFFF;
        border-radius: .37rem;
        padding: .09rem .1rem;
        display: flex;
        align-items: center;
        img{
            width: .13rem;
            height: .13rem;
        }
        span{
            margin-left: .09rem;
        }
    }
  }
  .swiper-container{
    height: auto;
  }
  .swiper-top{
    height: 2.04rem;
  }
  .swiper-slide{
    img{
        width: 100%;
        height: 100%;
    }
  }
  .classifyList{
    height: 1.01rem;
    margin: 0 auto;
    margin: 0 .12rem;
    margin-top: -.37rem;
    background: rgba(255,255,255,0.95);
    box-shadow: 0 .02rem .04rem 0 rgba(0,0,0,0.08);
    border-radius: .04rem;
    position: relative;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .classifyItem{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      img{
          width: .4rem;
          height: .4rem;
          margin-bottom: .1rem;
      }
      p{
          font-size: .12rem;
          color: #333333;
          letter-spacing: 1px;
      }
    }
  }
  .statusBar{
    background: #fff;
    margin-top: .1rem;
    padding: .14rem;
    height: .12rem;
    .swiperY-container{
      height: 100%;
      .swiper-slide{
        overflow: hidden;
        img{
          width: .12rem;
          height: .1rem;
          margin-right: 0.08rem;
        }
      }
    }
  }
  .recommendBar{
    .recommendInner{
      .recommendHead{
        background: #F8F8F8;
        height: .4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .recommendHeadBox{
          width: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{
              width: .27rem;
              height: .16rem;
          }
          span{
              font-size: .14rem;
              color: #FD6F17;
              font-weight: 700;
          }
        }
      }
      .recommendContent{
        background: #fff;
        padding: .11rem .14rem;
        .recommendContentBox{
          overflow-x: auto;
          display: flex;
          .recommendList{
            width: 1.14rem;
            border-left: 1px solid #CCCCCC;
            border-top: 1px solid #CCCCCC;
            border-bottom: 1px solid #CCCCCC;
            padding: .1rem;
            position: relative;
            .recommendImg{
              position: absolute;
              left: 0;
              top: 0.02rem;
              width: .34rem;
              height: .18rem;
            }
            .recommendText{
              position: absolute;
              left: 0.032rem;
              top: 0.05rem;
              color: #fff;
            }
            .goodImg{
              width: 1.14rem;
              height: 1.14rem;
              margin-bottom: .1rem;
            }
            .goodName{
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-bottom: .06rem;
            }
            .dealerName{
              font-size: 0.12rem;
              transform: scale(.66);
              color: #999999;
              margin-left: -.24rem;
              margin-bottom: .1rem;
            }
            .goodsOrder{
              display: flex;
              justify-content: space-between;
              .orderPrice{
                font-size: 0.18rem;
                color: #DD3333;
              } 
            }
            .shoppingImg{
                width: .14rem;
                height: .14rem;
                float: right;
                margin-top: .02rem;
            }
          }  
          .recommendList:last-child{
            border-right: 1px solid #CCCCCC;
          }  
        }
      }
      .brandsListRecommend{
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        .brandsListRecommendBox{
          width: 25%;
          height: .93rem;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          box-sizing: border-box;
          .brandsListRecommendImg{
              width: .8rem;
              height: .6rem;
          }
          .brandsListRecommendText{
              text-align: center;
          }
        }
      }
    }
  }
}
</style>
