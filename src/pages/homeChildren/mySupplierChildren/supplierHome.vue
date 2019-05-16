<template>
<!-- 供应商 -->
    <div style="display: inline-block; width: 100%;">
        <commonTab :title="dealerName" :url='url'></commonTab>
        <div class="routeSearch">
            <router-link to='/inputSeeck' tag='div'>
                <div class="input">
                    <img src="./../../../assets/image/ic_store_search.png" alt="">
                    <span>搜索店铺商品</span>
                </div>
            </router-link>
            <div class="name">
                <span class="storeName">{{dealerName}}</span>
                <div>
                    <span class="number">{{collectCount}}人</span>
                    <div @click="collects">
                        <img :src="sr" alt="">
                        <span>{{collect}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="position: sticky; top: .425rem; left: 0; z-index: 999;">
            <div class="searchTab">
                <div v-for="(i,index) in searchTab" :key="index" @click="skip(index)" :class="index ==ind? 'statusColor':'' ">
                    {{i}}   <img :src="img" alt="" v-if="index == 2">
                </div>
            </div>
            <div class="filter">
                <div class="ckd">
                    <div class="border" @click="have">
                        <div v-if='!show'></div>
                        <img src="./../../../assets/image/ic_screenCheck.png" alt="" v-if="show">
                    </div>
                    <span class="tex">仅显示有货</span>
                </div>
                <div class="ckd">
                    <div class="border" @click="recommend">
                        <div v-if="hide"></div>
                        <img src="./../../../assets/image/ic_screenCheck.png" alt="" v-if="!hide">
                    </div>
                    <span class="tex">推荐</span>
                </div>
            </div>
        </div>
        <div class="storeHome">
            <div class="list" v-for="(item,key) in goodses" :key="key">
                <div class="top">
                    <router-link tag='img' :to="{name:'commodityDetails',query:{skuId:item.goodsId}}" :src="item.picsUrl" alt=""/>
                    <span class="tex">{{item.goodsName}}</span>
                    <div>￥<span>{{item.orderPrice|addZero}}</span></div>
                </div>
                <div class="btm">
                    <div class="left">
                        <span>{{item.minOrderQuantity}}{{item.quantityUnit}}起批</span>
                        <span>已售{{item.salesVolume}}{{item.quantityUnit}}</span>
                    </div>
                    <div class="right" >
                        <shoppingCar :goodsId = 'item.goodsId'></shoppingCar>
                    </div>
                </div>
                <div class="replenishment" v-if="item.status == 1 && item.stock == 0">
                    <div>
                        <span>补货中</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopNone" v-if="shde">
            <div>
                <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//d80ae01f25bc40428d41a174dedd9fc3.o6zAJs40K6GJbyizSOz14zgmmCiA.j7VAdYIylCRBa75746f9c0d3bbdf2d3896c8b34de27d.png" alt="">
                <span>无可售商品</span>
            </div>
        </div>
        <rotateNav></rotateNav>
    </div>
</template>

<script>
import commonTab from './commonTab.vue'
export default {
    data(){
        return {
            img: require('./../../../assets/image/storeNav/ic_sort_defult.png'),
            sr: '',
            url: '/mySupplier',
            searchTab: ['默认','销量','价格'],
            ind: 0,
            goodses: '',
            orderBys: ['shelvesTime','salesVolume','orderPrice'],
            orderBy: 'shelvesTime',
            stock: 1,
            tagRecommend: 2,
            show: true,
            hide: true,
            shde: false,
            orderWay: 1,
            dealerName: '',
            collectCount: '',
            collect: '',
        }
    },
    methods: {
        // 切换 默认 销量 价格
        skip(index){
            this.ind = index;
            this.orderBy = this.orderBys[index];
            if(index == 2){
                if(this.orderWay == 0){
                    this.orderWay = 1;
                    this.img = require('./../../../assets/image/storeNav/ic_sort_down.png');
                }else{
                    this.orderWay = 0;
                    this.img = require('./../../../assets/image/storeNav/ic_sort_up.png');
                }
                
            }else{
                this.img = require('./../../../assets/image/storeNav/ic_sort_defult.png');
            }
            this.get();
        },
        // 初始化 商品详情
        get(){
            let state = this.$store.state;
            this.dealerName = state.dealerName;
            let data = {
                cityId: state.myUser.city,
                countyId: state.myUser.county,
                dealerId: state.custId,
                groupStoreId: state.myUser.id,
                merchantId: state.getByUser.merchantId,
                orderBy: this.orderBy,
                orderWay: this.orderWay,
                pageNum: state.getByUser.isPerfect,
                pageSize: 20,
                provId: state.myUser.province,
                stationId: state.stationId,
                status: state.getByUser.auditStatus,
                stock: this.stock,
                storeId: state.myUser.storeId,
                tagRecommend: this.tagRecommend,
                town: state.myUser.town
            }
           this.$ajax.supplierSearchGoodsList(data).then(res=>{
                this.goodses = res.data.result.goodses;
                this.shde = this.goodses == null? true:false;
           })
            this.$ajax.dealerColl(state.id,state.custId).then(res=>{
                this.collectCount = res.data.result.collectCount;
                if(this.collectCount == 0){
                    this.collect = '收藏';
                    this.sr = require('./../../../assets/image/ic-bills-wcollection.png');
                }else{
                    this.collect = '已收藏';
                    this.sr = require('./../../../assets/image/ic-bills-collection.png');
                }
            })
        },
        // 是否有货
        have(){
            this.show = !this.show;
            this.stock = this.show == false? 2:1;
            this.get();
        },
        // 是否推荐
        recommend(){
            this.hide = !this.hide;
            this.tagRecommend = this.hide == false? 1:2;
            this.get();
        },
        // 点击收藏
        collects(){
            let state = this.$store.state;
            let data = {
                dealerId: state.custId,
                userId: state.id
            }
            if(this.collectCount == 0){
                this.$ajax.add(data).then(res=>{
                    this.collectCount = 1;
                    this.collect = '已收藏';
                    this.sr = require('./../../../assets/image/ic-bills-collection.png');
                })
            }else{
                this.$ajax.del(data).then(res=>{
                    this.collectCount = 0;
                    this.collect = '收藏';
                    this.sr = require('./../../../assets/image/ic-bills-wcollection.png');
                })
            }
            
        },
        
    },
    mounted(){
        // 初始化默认渲染数据
        this.get();
    },
    components: {
        commonTab,
    }
}
</script>

<style scoped lang="scss">
.routeSearch {
    margin-top: .43rem;
    width: 100%;
    height: 1rem;
    background: linear-gradient(90deg, #D33 0%, #F46839 100%);
    position: relative;
    .input {
        width: 3.47rem;
        height: .3rem;
        background:rgba(0, 0, 0, 0.1);
        border-radius: .15rem;
        display:flex;
        padding: .08rem .11rem;
        box-sizing: border-box;
        position: absolute;
        top: .13rem;
        left: .15rem;
        img {
            width: .14rem;
            height: .14rem;
        }
        span {
            font-size: .14rem;
            color:#fff;
            margin-left: .1rem;
        }
    }
    .name {
        width: 3.47rem;
        height: .24rem;
        position: absolute;
        top: .6rem;
        left: .15rem;
        color:#fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .storeName {
            font-size: .16rem;
        }
        
        div {
            display:flex;
            align-items:center;
            .number {
                font-size: .1rem;
                margin-right: .075rem;
            }
            div {
                padding: .03rem .04rem;
                display:flex;
                border: 1px solid #fff;
                box-sizing: border-box;
                border-radius: .02rem;
                img {
                    width: .13rem;
                    height: .13rem;
                }
                span {
                    font-size: .12rem;
                    margin-left: .06rem;
                }
            }
        }
    }
}
.searchTab {
    width: 100%;
    height: .4rem;
    display:flex;
    justify-content:space-around;
    align-items:center;
    font-size: .14rem;
    color: #666;
    background: #fff;
    border-bottom: 1px solid #f2f1f6;
    div {
        width: .6rem;
        height: .15rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
            width: .1rem;
            height: .1rem;
        }
    }
    .statusColor {
        color: #d33;
    }

}
.filter {
    width: 100%;
    height: .375rem;
    color:#f2f1f6;
    display: flex;
    background:#f2f1f6;
    .ckd {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: .15rem;
        .border {
            width: .12rem;
            height: .12rem;
            overflow: hidden;
            margin-right: .06rem;
            box-sizing: border-box;
            div {
                width: .12rem;
                height: .12rem;
                box-sizing: border-box;
                border:1px solid #CCC;
                border-radius: .02rem;
            }
            img {
                width: .12rem;
                height: .12rem;
            }
        }
        .tex {
            font-size: .12rem;
            color:#666;
        }
    }
}
.storeHome {
    padding: 0 .15rem;
    display:flex;
    flex-wrap: wrap;
    background:#fff;
    .list {
        width: 1.7rem;
        height: 2.85rem;
        padding: .15rem 0;
        box-sizing: border-box;
        border-bottom: 1px solid #F2F1F6;
        border-right: 1px solid #F2F1F6;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .top {
            width: 1.6rem;
            height: 2.05rem;
            img {
                width: 1.6rem;
                height: 1.6rem;
            }
            .tex {
                font-size: .12rem;
                margin-top: .1rem;
                box-sizing: border-box;
                color:#333;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            div {
                font-size: .08rem;
                line-height: .18rem;
                color:#d33;
                margin-top: .1rem;
                span {
                    font-size: .18rem;
                }
            }
        }
        .btm {
            width: 1.7rem;
            height: .3rem;
            margin-top: .09rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            .left {
                height: .17rem;
                margin-top: .3rem;
                span {
                    font-size: .1rem;
                    line-height: .1rem;
                    color:#999;
                    padding-right: .07rem;
                }
            }
            .right {
                padding: .07rem;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: .16rem;
                    height: .16rem;
                }
            }
        }
        .replenishment {
            position: absolute;
            left: 0;
            top: 0;
            width: 1.7rem;
            height: 2.05rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background:#fff;
            opacity: 0.6;
            div {
                width: .64rem;
                height: .64rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background:rgba(0, 0, 0, 0.4);
                border-radius: 50%;
                span {
                    font-size: .2rem;
                    color:#fff;
                }
            }
        }
    }
}
.shopNone {
    width:100%;
    height:4.22rem;
    background: #F2F1F6;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            width: 1.34rem;
            height: .74rem;
        }
        span {
            padding-top: .21rem;
            box-sizing: border-box;
            text-align: center;
            font-size: .14rem;
            color:#999;
        }
    }
}
</style>
