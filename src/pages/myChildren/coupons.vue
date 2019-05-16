<template>
    <div class = "coupons">
        <headGoBack :goBackBoo='true' title='我的优惠券' path='my'></headGoBack>
        <div class = "couponsContent">
            <van-tabs v-model="active" swipeable sticky animated>
                <van-tab :title="titleUnused">
                    <div class = "couponWriper">
                        <div class = "couponImg" v-if = "!titleUnusedData.pages">
                            <img src="../../assets/image/coupon/ic_coupon.png" alt="">
                            <span>暂未使用的优惠券</span>
                        </div>
                    </div>
                </van-tab>
                <van-tab :title="titleUsed">
                    <div class = "couponWriper">
                        <div class = "couponImg" v-if = "!titleUsedData.pages">
                            <img src="../../assets/image/coupon/ic_coupon.png" alt="">
                            <span>暂未使用的优惠券</span>
                        </div>
                    </div>
                </van-tab>
                <van-tab :title="titleStale">
                    <div class = "couponWriper">
                        <div class = "couponImg" v-if = "!titleStaleData.pages">
                            <img src="../../assets/image/coupon/ic_coupon.png" alt="">
                            <span>暂未使用的优惠券</span>
                        </div>
                        <div v-if = "titleStaleData.pages">
                            <div class = "couponList" v-for = "(item, index) in titleStaleData.list" :key = "index">
                                <div class = "listLogo">
                                    <img src="../../assets/image/coupon/_ic_coupon_used.png" alt="">
                                    <div class = "listLogoCon">
                                        <div class = "logoBack">
                                            <p><span>¥ </span><span>{{item.amount}}</span></p>
                                            <p>{{item.couponDesc}}</p>
                                        </div>
                                        <div class = "shopNameTime">
                                            <span>{{item.couponName}}</span>
                                            <span class = "time">2018.07.27-2019.09.30</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="arr" class = "listMore">
                                    <div class = "moreTop" :style="arr[index]? 'margin-bottom: 0.13rem;' : ''" @click="showConMore(index)">
                                        <span>详细信息</span>
                                        <img src="../../assets/image/xia@2x.png" alt="" v-if="!arr[index]">
                                        <img src="../../assets/image/shang@2x.png" alt="" v-if="arr[index]">
                                    </div>
                                    <div v-show='arr[index]'>{{item.couponDescription}}</div>
                                    <!-- <div :class="arr[index]? 'moreConTrue':'moreConFal'">{{item.couponDescription}}</div> -->
                                </div>
                            </div>
                            <div class = "bottomCon">- 到底了 -</div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import api from "../../utils/lh/lh.js"
export default {
    data() {
        return{
            active: 3,
            titleUnused: "未使用（0）",
            titleUsed: "已使用（0）",
            titleStale: "已过期（0）",
            elShow: -1,
            titleUnusedData: "",
            titleUsedData: "",
            titleStaleData: "",
            arr: []
        }
    },
    methods: {
        /**
         * 点击更多查看
         */
        showConMore(index) {
            Vue.set(this.arr, index, !this.arr[index])
        },
        /**
         * 接口
         */
        couponsData() {
            api.coupons({couponStatusList: [0], merchantId: 14948, pageSize: 10, pageNum: 1})
            .then(res => {
                if(res && res.data.status.statusCode == 0) {
                    this.titleUnusedData = res.data.result
                    this.titleUnused = `未使用（${res.data.result.list.length}）`
                }
            })
            .catch(err => {
                console.log(err)
            })
            api.coupons({couponStatusList: [2], merchantId: 14948, pageSize: 10, pageNum: 1})
            .then(res => {
                if(res && res.data.status.statusCode == 0) {
                    this.titleUsedData = res.data.result
                    this.titleUsed = `已使用（${res.data.result.list.length}）`
                    console.log(this.titleUsedData)
                }
            })
            .catch(err => {
                console.log(err)
            })
            api.coupons({couponStatusList: [3], merchantId: 14948, pageSize: 10, pageNum: 1})
            .then(res => {
                if(res && res.data.status.statusCode == 0) {
                    // this.arr = new Array(res.data.result.list.length).fill(false)
                    this.titleStaleData = res.data.result
                    this.titleStale = `已过期（${res.data.result.list.length}）`
                    if(res.data.result.list.length>0) {
                        for(let i=0;i<res.data.result.list.length;i++) {
                            this.arr.push(false)
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.couponsData()
    },
    mounted() {
        
    }
}
</script>
<style scoped lang="scss">
@import "../../utils/lh/coupons.css";
    .couponsContent{
        position: absolute;
        top: 0.43rem;
        width: 100%;
        background: #f2f1f6;
        z-index: 999;
        .couponWriper{
            width: 100%;
            position: relative;
            padding: 0.14rem 2% 0.14rem 2%;
            box-sizing: border-box;
            background: #f2f1f6;
            min-height: 9rem;
            .couponImg{
                width: 1.12rem;
                height: 100%;
                font-size: 0.14rem;
                color: #666666;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 1.21rem;
                left: 50%;
                margin-left: -0.56rem;
                img{
                    width: 0.73rem;
                    margin-bottom: 0.22rem
                }
            }
            .couponList{
                margin-bottom: 0.14rem;
                width: 100%;
                display: flex;
                flex-direction: column;
                .listLogo{
                    height: 0.8rem;
                    display: flex;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .listLogoCon{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: flex;
                        .logoBack{
                            width: 34%;
                            height: 0.8rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #FFFFFF;
                            flex-direction: column;
                            p:nth-of-type(1){
                                margin-bottom: 0.07rem;
                                span:nth-of-type(2){
                                    font-size: 0.28rem;
                                }
                                span:nth-of-type(1){
                                    font-size: 0.15rem;
                                }
                            }
                        }
                        .shopNameTime{
                            flex: 1;
                            padding: 1.5% 8.5% 2.2% 3.5%;
                            box-sizing: border-box;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            font-size: 0.14rem;
                            .time{
                                font-size: 0.1rem;
                                color: #999999;
                            }
                        }
                    }
                }
                .listMore{
                    font-size: 0.12rem;
                    background: #F8F8F8;
                    padding: 0.1rem 0.1rem 0.08rem 0.09rem;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);
                    display: flex;
                    flex-direction: column;
                    color: #666666;
                    .moreTop{
                        display: flex;
                        justify-content: space-between;
                        img{
                            width: 0.13rem;
                            height: 0.13rem;
                        }
                    }
                    .moreConTrue{
                        display: block;
                        transition: all 0.3s linear;
                        line-height: 0.15rem;
                    }
                    .moreConFal{
                        display: none;
                        transition: all 0.3s linear;
                    }
                }
            }
        }
        .bottomCon{
            color:#999;
            text-align: center;
        }
    }
</style>