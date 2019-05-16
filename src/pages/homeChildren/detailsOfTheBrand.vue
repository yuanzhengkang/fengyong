<template>
    <div class="details">
        <headGoBack :title='titleName' :goBackBoo='goBackBoo'></headGoBack>
        <div class="undefinedBox"></div>
        <header>
            <router-link to='/inputSeeck' tag='div'>
                <img src="../../assets/image/ic_search.png" alt="">
            </router-link>
        </header>
        <div class="tabs">
            <ul class='tabBox'>
                <li v-for='(item,index) in tabsArr' :key='index' @click='tabChange(item.name)'
                :class="activeIndex==index&&'activeClass'"
                >
                    {{item.name}}
                    <div v-if='item.img' :class="item.className">
                        <img :src="item.img" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <div class="sorry" v-if="detailsData.goodses==null">
            <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//8aecbdf091c442449d596ad3ffca2c4f.o6zAJs40K6GJbyizSOz14zgmmCiA.aDVbCTsN3mUJ5ad2b7482351a4260fcd93f103dee234.png" alt="">
            <p>没有找到相关商品</p>
        </div>
        <div v-if="detailsData.goodses" class="recentContent" v-for="(item,index) in detailsData.goodses" :key = "index">
            <router-link tag='img' :to="{name:'commodityDetails',query:{skuId:item.goodsId}}" :src="item.mainPic || item.picsUrl | picsUrl" alt=""/>
            <div>
            <router-link tag='p' :to="{name:'commodityDetails',query:{skuId:item.goodsId}}" style = "line-height: 0.16rem;">{{item.goodsName}}</router-link>
            <div>
                <router-link tag='div' :to="{name:'commodityDetails',query:{skuId:item.goodsId}}">
                <p>
                    <span>￥{{item.orderPrice|addZero}}</span>
                    <span>1{{item.quantityUnit}}起批</span>
                </p>
                <p>{{item.dealerName}}</p>
                </router-link>
                <shoppingCar :goodsId = 'item.goodsId'></shoppingCar>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import headGoBack from '../../commonComponents/headGoBack'
export default {
    data() {
        return {
            goBackBoo: true,
            activeIndex: 0,
            data: {
                brandId: this.$route.params.id,
                brandName: this.$route.params.name,
                cityId: this.$store.state.myUser.city,
                countyId: this.$store.state.myUser.county,
                dealerId: this.$route.params.dealerId,
                goodsName: "",
                groupStoreId: this.$store.state.myUser.id,
                merchantId: this.$store.state.getByUser.merchantId,
                orderBy: "shelvesTime",
                orderWay: 0,
                pageNum: 1,
                pageSize: 20,
                provId: this.$store.state.getByUser.provinceId,
                stationId: this.$store.state.stationId,
                status: this.$store.state.getByUser.status,
                stock: 1,
                storeId: this.$store.state.myUser.storeId,
                tagRecommend: 2,
                town: this.$store.state.myUser.town
            },
            detailsData: '',
            tabsArr: [
                {name: '默认',img: '',className:''},
                {name: '销量',img: '',className:''},
                {name: '价格',img: require('../../assets/image/storeNav/ic_sort_defult.png'),className:'tabPrice'}
            ],
            upImg: true,
            titleName: this.$route.params.dealerName||this.$route.params.name||this.$store.state.dealerName
        }
    },
    filters: {
        picsUrl(val) {
            if(val) {
                return val.split(',')[0]
            }else {
                return val
            }
        }
    },
    components: {
        headGoBack
    },
    methods: {
        getDetailsData() {
            this.$ajax.searchGoodsList(this.data).then(res=>{
                if(res.data.status.statusCode===0){
                    this.detailsData = res.data.result
                    console.log(res.data.result)
                }
            }) 
        },
        tabChange(name) {
            delete this.data.brandName
            delete this.data.goodsName
            this.data.orderWay = 1
            this.tabsArr[2].img = require('../../assets/image/storeNav/ic_sort_defult.png')  
            if(name=='默认'){
                this.activeIndex = 0
                this.data.orderBy = "shelvesTime"
                this.getDetailsData()
            }else if(name=='销量'){
                this.activeIndex = 1
                this.data.orderBy = "salesVolume"
                this.getDetailsData()
            }else if(name=='价格'){
                this.activeIndex = 2
                if(this.upImg) {
                    this.upImg = false
                    this.tabsArr[2].img = require('../../assets/image/storeNav/ic_sort_up.png')   
                    this.data.orderWay = 0
                }else{
                    this.upImg = true
                    this.tabsArr[2].img = require('../../assets/image/storeNav/ic_sort_down.png') 
                    this.data.orderWay = 1
                }
                this.data.orderBy = "orderPrice"
                this.getDetailsData()
            }
        },
        getSaletype() {
            delete this.data.brandName
            delete this.data.brandId
            this.data.saletype = {'secondSaletypeName': this.$route.params.name}
            this.getDetailsData()
        }
    },
    created() {
        if(this.$route.params.supplier){
            this.getSaletype()
        }else{
            this.getDetailsData()
        }
    }
}
</script>
<style scoped lang="scss">
.details{
    .undefinedBox{
        height: .84rem;
    }
    >header{
        background: linear-gradient(to right, #d33 0%,#F46839 100%);
        padding: .07rem .14rem;
        box-sizing: border-box;
        position: fixed;
        top: .43rem;
        left: 0;
        right: 0;
        z-index: 99;
        >div{
            width: 100%;
            border-radius: .14rem;
            background: #fff;
            display: flex;
            align-items: center;
            font-size: .24rem;
            height: .3rem;
            >img{
                width: .14rem;
                height: .14rem;
                margin-left: .1rem;
            }
        }
    }
    .tabs{
        position: fixed;
        font-size: .14rem;
        top: .87rem;
        left: 0;
        right: 0;
        z-index: 99;
        background: #fff;
        .tabBox{
            padding: .13rem 0;
            text-align: center;
            display: grid;
            grid-template-columns: repeat(3,33.33%);
            >li{
                display: flex;
                justify-content: center;
                align-items: center;
                >div{
                    margin-left: .05rem;
                    width: .12rem;
                    height: .12rem;
                    >img{
                        width: 100%;
                        height: 100%;
                    }  
                }
                .tabPrice{
                    width: .07rem;
                    height: .09rem;
                    line-height: .08rem;
                }
            }
            .activeClass{
                color: #d33;
            }
        }
    }
    .tabs::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #f2f1f6;
        transform: scaleY(0.5);
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
    .sorry{
        height: 4.6rem;
        background: #f2f1f6;
        display: grid;
        grid-template-columns: 1rem;
        grid-template-rows: 1rem auto;
        justify-content: center;
        padding-top: .8rem;
        >img{
            width: 1rem;
            height: 1rem;
        }
        >p{
            color:#999;
            text-align: center;
        }
    }
} 
</style>