<!--  商品详情页  -->
<template>
    <div class = "dityDetails">
        <headerGoBack :goBackBoo="true" title="商品详情"></headerGoBack>
        <section class = "detailsPadd">
            <div class = "detailsSwiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for = "(item, index) in commodityDetailsDataHead" :key = "index" @click = "imagePreview(commodityDetailsDataHead, index)"><img :src="item" alt=""></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class = "detailsInfo">
                <div class = "InfoName">{{commodityDetailsDataContent.goodsName}}</div>
                <div class = "InfoElse">
                    <div class = "ElsePrice">
                        <div class = "price">¥&nbsp;<span>{{price | filterPrices}}</span>{{price | filterpoint}}</div>
                        <div class = "stipulate">{{commodityDetailsDataContent.minimumOrderQuantity}}{{commodityDetailsDataContent.quantityUnit}}起批</div>
                    </div>
                    <div class = "ElseSell">
                        <span>月售{{commodityDetailsData.skuSaleNum}}{{commodityDetailsDataContent.measurementUnit}}</span>
                        <span>库存{{commodityDetailsData.salesNum}}{{commodityDetailsDataContent.measurementUnit}}</span>
                        <span>{{commodityDetailsDataContent.integerZeroConvert}}</span>
                    </div>
                </div>
            </div>
            <shoppingCar :goodsId='this.$route.query.skuId'>
                <div class = "haveChosen" @click = "haveChosen()">
                    <div>
                        <p class = "selected">已选</p>
                        <span>{{commodityDetailsDataContent.integerZeroConvert | filterintegerZeroConvert}}</span>
                    </div>
                    <img src="../assets/image/ic-next-left.png" alt="">
                </div>
            </shoppingCar>
            <div class = "swipeable">
                <van-tabs v-model="active" swipeable animated sticky title-active-color = "#d33">
                    <van-tab :title="'商品介绍'">
                        <div class = "swipeableImg" v-if = "outData" v-html = "commodityDetailsData.description"></div>
                        <div class = "parametersData" v-if = "!outData">暂无数据</div>
                    </van-tab>
                    <van-tab :title="'规格参数'">
                        <div v-html = "parametersData" v-if = "outGoods != '系统演示客户'"></div>
                        <div class = "parametersData" v-if = "outGoods == '系统演示客户'">暂无规格参数</div>
                    </van-tab>
                </van-tabs>
            </div>
        </section>
        <section class = "outGoods" v-if = "outGoods == '系统演示客户'">商品已下架</section>
        <footer>
            <section class = "navList">
                <div v-for = "(item, index) in navList" :key = 'index' @click = "goRouter(index)">
                    <img :src="item.img" alt="">
                    <span>{{item.name}}</span>
                    <strong v-if = "index == 2" v-show = "goodsNum">{{goodsNum}}</strong>
                </div>
            </section>
            <shoppingCar :goodsId='this.$route.query.skuId'>
                <section class = "addShopCar">加入购物车</section>
            </shoppingCar>
        </footer>
        <rotateNav/>
    </div>
</template>
<script>
import Vue from "vue"
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
import { state, mapState } from 'vuex'
import Swiper from 'swiper'
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import '../../node_modules/swiper/dist/css/swiper.css'
import headerGoBack from '../commonComponents/headGoBack'
import http from "../utils/http.js"
import rotateNav from "../commonComponents/rotateNav"
export default {
    components: {
        headerGoBack,
        rotateNav
    },
    data() {
        return{
            navList:[
                {name: "店铺", img: require("../assets/image/ic_details_shop.png")},
                {name: "收藏", img: require("../assets/image/ic_collect_defult.png")},
                {name: "购物车", img: require("../assets/image/ic_shoppingCart.png")}
            ],
            active: 2,
            commodityDetailsDataContent: "",
            commodityDetailsDataHead: "",
            commodityDetailsData: "",
            price: "",
            parametersData: "",
            outGoods: "",
            outData: ""
        }
    },
    created() {
        this.getCommodityDetailsData(this.$route.query.skuId)
    },
    computed: {
        ...mapState(['goodsNum']),
    },
    mounted() {
        this.gotoTop()
        // console.log(this.$route.query.skuId)
    },
    filters: {
        filterPrices(val) {
            return val.toString().indexOf(".") != -1 ? val.toString().split(".")[0] : val
        },
        filterpoint(val) {
            return val.toString().indexOf(".") != -1 ? `.${val.toString().split(".")[1]}` : ".00"
        },
        /**
         * 筛选已选
         */
        filterintegerZeroConvert(val) {
            if(val) {
                let value = val.indexOf("=") != -1 ? val.split("=")[1] : val.split("=")[0]
                return value    
            }
            return 
        }
    },
    methods: {
        /**
         * swiper
         */
        swiper() {
            if(this.commodityDetailsDataHead.length != 1) {
                let mySwiper = new Swiper('.swiper-container', {
                    autoplay: true,//可选选项，自动滑动
                    loop: true, 
                    pagination: {
                        el: '.swiper-pagination',
                    }
                })
            }
        },
        /**
         * 已选
         */
        haveChosen() {
            console.log("***")
        },
        /**
         * 返回顶部
         */
        gotoTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            if(top) {
                document.documentElement.scrollTop = 0;
                // document.body.scrollTop = 0;
                // window.pageYOffset = 0;
            }
        },
        /**
         * 底部跳转
         */
        goRouter(index) {
            if(index == 0) {
                this.$router.push("/minestore")
            }else if(index == 1) {
                console.log("收藏")
            }else if (index == 2) {
                this.$router.push("./shopping")
            }
        },
        /**
         * 详情数据
         */
        getCommodityDetailsData(skuId) {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true, // 禁用背景点击
            });
            http.detailsCollect()
            .then(res => {
                // console.log(res)
            })
            http.commodityDetails(skuId)
            .then(res => {
                if(res.data.status.statusCode === 0) {
                    if(res) {
                        this.$toast.clear()
                    }
                    this.commodityDetailsDataContent = res.data.result.goodsOl
                    this.commodityDetailsDataHead = res.data.result.goodsOl.picsUrl.split(",")
                    this.commodityDetailsData = res.data.result
                    this.price = res.data.result.goodsOl.orderPrice
                    if(res.data.result.goodsOl.picsUrl) {
                        this.$nextTick(()=> {
                            this.swiper()
                        })
                    }
                    if(res.data.result.goodsOl.dealerName) {
                        this.outGoods = res.data.result.goodsOl.dealerName
                    }
                    if(res.data.result.description) {
                        this.outData = res.data.result.description
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
            http.parameters(skuId)
            .then(res => {
                this.parametersData = res.data
            })
        },
        /**
         * 图片预览
         */
        imagePreview(data, index) {
            if(data) {
                if(data.length != 1) {
                    ImagePreview({
                        images: [...data],
                        startPosition: index,
                        onClose() {
                            // do something
                        }
                    })
                }else if(data.length == 1) {
                    ImagePreview(data);
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import "../utils/lh/commodityDetailsSwiper.css";
    .detailsPadd{
        position: absolute;
        top: 0.43rem;
        bottom: 0.5rem;
        background: #f2f1f6;
        width: 100%;
        box-sizing: border-box;
        .detailsSwiper{
            width: 100%;
            height: 3.75rem;
            background: #FFFFFF;
            img{
                width: 100%;
                height: 3.75rem;
            }
        }
        .detailsInfo{
            height: 1.2rem;
            background: #FFFFFF;
            position: relative;
            padding: 0.14rem 0.14rem 0.1rem 0.14rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .InfoName{
                font-size: 0.14rem;
                color: #333333;
                width: 3rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                height: 0.18rem;
            }
            .InfoElse{
                .ElsePrice{
                    display: flex;
                    margin-bottom: 0.12rem;
                    align-items: flex-end;
                    .price{
                        color: #DD3333;
                        font-size: 0.18rem;
                        margin-right: 0.12rem;
                        display: flex;
                        align-items: flex-end;
                        span{
                            font-size: 0.22rem;
                            display: flex;
                            align-items: flex-end;
                        }
                    }
                    .stipulate{
                        font-size: 0.12rem;
                        color: #666666;
                    }
                }
                .ElseSell{
                    font-size: 0.12rem;
                    color: #999999;
                    span{
                        margin-right: 0.2rem;
                    }
                }
            }
            &::after{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                border-bottom: 1px solid #E4E4E4;
                transform: scaleY(0.5);
            }
        }
        .haveChosen{
            margin: 0.1rem 0;
            height: 0.45rem;
            background: #FFFFFF;
            padding: 0.16rem 0.14rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
                display: flex;
                font-size: 0.14rem;
                color: #333333;
                .selected{
                    color: #666666;
                    margin-right: 0.4rem;
                }
            }
            img{
                height: 0.12rem;
            }
        }
        .swipeable{
            overflow: hidden;
            color: red;
            margin-bottom: 0.45rem;
            background: #f2f1f6;
            .swipeableImg{
                min-height: 1.5rem;
                background: #f2f1f6;
            }
            .parametersData{
                color:#ccc;
                line-height: 1.5rem;
                text-align: center;
            }
        }
    }
    .outGoods{
        position: fixed;
        bottom: 0.5rem;
        left: 0;
        width: 100%;
        font-size: 0.14rem;
        color:#F09632;
        background:#FEF9EF;
        padding: 0.1rem 0.13rem;
        z-index: 999;
    }
    footer{
        position: fixed;
        z-index: 1000;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5rem;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        &::after{
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px solid #F2F1F6;
            transform: scaleY(0.5); 
        }
        .navList{
            width: 2.55rem;
            padding: 0.075rem 0;
            display: flex;
            justify-content: space-around;
            div{
                width: 0.48rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                position: relative;
                img{
                    // width: 0.157rem;
                    height: 0.173rem;
                }
                span{
                    font-size: 0.11rem;
                    color: #666666;
                }
                strong{
                    position: absolute;
                    top: -0.05rem;
                    right: 0;
                    width: 0.15rem;
                    height: 0.15rem;
                    color: #FFFFFF;
                    background: #d33;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .addShopCar{
            width: 1.2rem;
            height: .5rem;
            background: #DD3333;
            font-size: 0.16rem;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>