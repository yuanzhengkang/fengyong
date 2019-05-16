<!--  领券中心  -->
<template>
    <div class="couponRedemptionCentre">
        <headgoback title = 领券中心 goBackBoo = gogoBackBoo></headgoback>
        <div class="container" v-if="false">
            <div class="couponContent"></div>
            <div class="noneCoupon">
                <img src="../../../src/assets/image/coupon/ic_coupon.png" alt="">
                <span>暂无优惠券</span>
            </div>
        </div>
        <div class="content" v-else>
            <div class="every">
                <div class="every_top">
                    <div class="every_left">
                        <img src="../../assets/image/ic_search_no_data.png" alt="">
                        <div class="every_left_right">
                            <span class="caption">家居官方旗舰店</span>
                            <p class="Money_Off">
                                ￥<i>5</i><span>满100元可用</span>
                            </p>
                        </div>
                        <div class="caption"></div>
                    </div>
                    <div class="every_right">
                        <van-circle
                            v-model="currentRate"
                            color="#F13030"
                            fill="#fff"
                            size="48px"
                            :rate="80"
                            layer-color="rgba(241,48,48,0.30)"
                            :text="text"
                            :speed="100"
                            :clockwise="true"
                            :stroke-width="60"
                        />
                        <p>立即领取</p>
                    </div>
                </div>
                <div class="message" @click="add_detail($event)">
                    <div class="mess">
                        <p>详情信息</p>
                        <img src="../../assets/image/xia@2x.png" alt="" v-if="boo">
                        <img src="../../assets/image/shang@2x.png" alt="" v-else>      
                    </div>
                    <div class="message_else" v-if="!boo">
                        限商品：仅可购买也卖酒官方旗舰店旗下最贵最好喝最丑最
                        丑最上天最下地最好的商品
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headgoback from '../../commonComponents/headGoBack'
export default {
    components:{
        headgoback
    },
    data () {
        return {
            goBackBoo:true,//给共有组件传的参数默认参数，控制返回上一页的显示与否
            currentRate: 0,//vant插件圆圈加载框的必要值，不写会报错
            boo: true//控制信息详情以及图片样式
        }
    },
    mounted () {
        //进入页面请求数据
        this.get_togoo()
    },
    computed: {
        //vant圆环加载框自带
        text() {
            return "已抢"+this.currentRate.toFixed(0) + '%'
        }
    },
    methods: {
        //点击详情信息栏切换箭头方向图片以及显示更多的信息
        add_detail(e) {
            this.boo = !this.boo
        },
        //进入页面请求数据
        get_togoo(){
            //默认传参
            let data = {
                dealerOrgid:16546,
                merchantId:this.$store.state.getByUser.merchantId,
                pageNum:1,
                pageSize:10,
                siteId:this.$store.state.stationId,
                start:0,
                usedQuantity:0,
                validityStartTime:0
            };
            //走封装的ajax,进入页面请求数据
            this.$ajax.togoo(data).then(res=>{
                // console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>
<style scoped lang="scss">
    .couponRedemptionCentre{
        .container{
            position: absolute;
            width: 100%;
            top: .43rem;
            bottom: 0;
            background:#f2f1f6;
            .couponContent{
                height: .09rem;
            }
            .noneCoupon{
                margin-top: 1.3rem; 
                height: 1.08rem;
                display:flex;
                flex-flow: column;
                align-items: center;
                img{
                    width: .75rem;
                    height: .75rem;
                }
                span{
                    color:#666;
                    font-size: .14rem;
                    margin-top: .1rem;
                }
            }
        }
        .content{
            position: absolute;
            width: 100%;
            top: .43rem;
            bottom: 0;
            background:#f2f1f6;
            box-sizing: border-box;
            padding: .09rem .14rem 0 .14rem;
            .every{
                height: 1.3rem;
                display: flex;
                flex-flow: column;
                .every_top{
                    height: 1rem;
                    background-image: url('../../assets/image/coupon/ic_coupon5.png');
                    background-size: 100% 100%;
                    display: flex;
                     .every_left{
                        box-sizing: border-box;
                        padding: .1rem;
                        display: flex;
                        flex: 1;
                        img{
                            width: .8rem;
                            height: .8rem;
                            box-sizing: border-box;
                            border: 1px solid #F3F3F3;
                            border-radius: .04rem;
                        }
                        .every_left_right{
                            padding: .05rem .09rem;
                            display: flex;
                            flex-flow: column;
                            flex: 1;
                            justify-content: space-between;
                            .caption{
                                font-family: PingFangSC-Regular;
                                font-size: .14rem;
                                color: #333333;
                            }
                            .Money_Off{
                                font-family: PingFangSC-Regular;
                                font-size: .12rem;
                                color: #F12525;
                                i{
                                    font-family: PingFangSC-Semibold;
                                    font-size: .24rem;
                                    color: #F12525;
                                }
                                span{
                                    margin-left: .08rem;
                                }
                            }
                        }
                    }
                    .every_right{
                        width: .975rem;
                        height: 1rem;
                        display: flex;
                        flex-flow: column;
                        align-items: center;
                        justify-content: center;
                        p{
                            margin-top: .11rem;
                            width: .69rem;
                            height: .21rem;
                            background: #F12525;
                            border-radius: .46rem;
                            line-height: .21rem;
                            text-align: center;
                            font-family: PingFangSC-Regular;
                            font-size: .12rem;
                            color: #FFFFFF;
                        }
                    }
                }
                .message{
                    background: #F8F8F8;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);
                    padding: 0 .1rem;
                    box-sizing: border-box;
                    .mess{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: .3rem;
                        p{
                            font-family: PingFangSC-Regular;
                            font-size: .12rem;
                            color: #666666;
                        }
                        img{
                            width: .12rem;
                            height: .12rem;
                        }
                    }
                    .message_else{
                        background: #F8F8F8;
                        display: flex;
                        padding: .06rem 0 .12rem 0;
                        font-family: PingFangSC-Regular;
                        font-size: .12rem;
                        color: #333333;
                        line-height: .18rem;
                    }
                }
            }
        }
    }
</style>