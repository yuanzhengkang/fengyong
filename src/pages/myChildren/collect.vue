<!-- 商品收藏和店铺收藏 -->
<template>
    <div class="collect">
        <headGoBack :title='title' :goBackBoo='goBackBoo' path='my'></headGoBack>
        <div class="tabs">
            <ul class='tabBox'>
                <li v-for='(item,index) in tabsArr' :key='index' @click='tabChange(index)'
                :class="activeIndex==index&&'activeClass'">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="undefined"></div>
        <div v-if="goodsBoo" class="sorry">
            <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//d80ae01f25bc40428d41a174dedd9fc3.o6zAJs40K6GJbyizSOz14zgmmCiA.j7VAdYIylCRBa75746f9c0d3bbdf2d3896c8b34de27d.png" alt="">
            <p>您还没有收藏过宝贝</p>
        </div>
        <p v-if="goodsBoo" class="sorryTitle">-&nbsp;最近浏览&nbsp;-</p>
        <div v-if="goodsBoo" class="content" v-for="item in goodSeeckData">
            <router-link tag='img' :to="{name:'commodityDetails',query:{'skuId':item.skuId}}" :src="item.mainPic || item.picsUrl | picsUrl" alt=""/>
            <div>
            <router-link tag='p' :to="{name:'commodityDetails',query:{'skuId':item.skuId}}">{{item.goodsName}}</router-link>
            <div>
                <router-link  tag='div' :to="{name:'commodityDetails',query:{'skuId':item.skuId}}">
                <p>
                    <span>￥<span>{{item.orderPrice|addZero}}</span></span>
                    <span>1{{item.quantityUnit}}起批</span>
                </p>
                <p>{{item.dealerName}}</p>
                </router-link>
                <shoppingCar :goodsId = 'item.skuId'></shoppingCar>
            </div>
            </div>
        </div>
        <div v-if="!goodsBoo" class="shop" v-for='item in shopSeeckData'>
            <header>
                <span>{{item.dealerName}}</span>
                <img @click='alertShowTel(item.phone)' src="../../assets/image/dianpu.png" alt="">
            </header>
            <main>
                <section>经营品牌：{{item.brands}}</section>
                <section>月成交额：{{item.monthDealSum}}</section>
                <section>月买家数：{{item.monthBuyerNum}}位</section>
            </main>
        </div>
    </div>
</template>
<script>
import headGoBack from '../../commonComponents/headGoBack'
import Vue from 'vue'
import { Dialog } from 'vant';
Vue.use(Dialog)
export default {
    data() {    
        return {
            title: '',
            goBackBoo: true,
            activeIndex: 0,
            tabsArr: [
                {name: '商品'},
                {name: '店铺'}
            ],
            goodSeeckData: '',
            goodsBoo: true,
            shopSeeckData: ''
        }
    },
    methods: {
        tabChange(index){
            this.activeIndex = index
            if(index==0){
                this.title = '商品收藏'
                this.goodsBoo = true
                this.getGoodSeeckData()
            }else if(index==1){
                this.title = '店铺收藏'
                this.goodsBoo = false
                this.getCollectsData()
            }
        },
        getGoodSeeckData() {
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
                this.goodSeeckData = res.data.result
                console.log(res)
            })
        },
        getCollectsData() {
            let data = {userId: this.$store.state.myUser.createUser}
            this.$ajax.collects(data).then(res=>{
                this.shopSeeckData = res.data.result
                console.log(res)
            })
        },
        alertShowTel(phone) {
            Dialog.confirm({
                message: '拨打'+phone+'仅为模拟'
            })
        },
    },
    components: {
        headGoBack
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
    created() {
        console.log(this.$route)
        if(this.$route.params.name=='good'){
            this.goodsBoo = true
            this.activeIndex = 0
            this.title = '商品收藏'
            this.getGoodSeeckData()
        }else if(this.$route.params.name=='shop'){
            this.goodsBoo = false
            this.activeIndex = 1
            this.title = '店铺收藏'
            this.getCollectsData()
        }
    }
}
</script>
<style scoped lang="scss">
.collect{
    .tabs{
        position: fixed;
        font-size: .16rem;
        top: .43rem;
        left: 0;
        right: 0;
        z-index: 99;
        background: #fff;
        .tabBox{
            text-align: center;
            display: grid;
            grid-template-columns: repeat(2,.32rem);
            grid-template-rows: .45rem;
            justify-content: space-evenly;
            >li{
                width: .32rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .activeClass{
                color: #d33;
                position: relative;
            }
            .activeClass::after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: .02rem;
                background: #d33;
            }
        }
    }
    .undefined{
        height: .45rem;
    }
    .sorry{
        background: #f2f1f6;
        padding: .3rem 0;
        text-align: center;
        >img{
            width: 1.34rem;
            height: .74rem;
        }
        >p{
            color: #666;
            margin-top: .3rem;
        }
    }
    .sorryTitle{
        position: relative;
        height: .4rem;
        font-size: 0.14rem;
        color: #666;
        text-align: center;
        line-height: .4rem;
    }
    .sorryTitle::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #f2f1f6;
        transform: scaleY(.5);
    }
    .content{
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
            font-size: .14rem;
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
                align-items: flex-end;
                >span:nth-child(1){
                    color:#d33;
                    font-size: .14rem;
                    >span{
                        font-size: .18rem;
                    }
                }
                >span:nth-child(2){
                    color:#ccc;
                }
                }
                >p:nth-child(2){
                margin-top: .1rem;
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
    .content::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #eee;
        transform: scaleY(.5);
    }
    .shop{
        padding: 0 .25rem;
        >header{
            position: relative;
            height: .43rem;
            font-size: .16rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            >img{
                width: .17rem;
                height: .17rem;
            }
        }
        >header::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #f1f2f6;
            transform: scaleY(.5);
        }
        >main{
            font-size: .13rem;
            padding: .07rem 0;
            >section{
                height: .18rem;
            }
        }
    }
}
    
</style>