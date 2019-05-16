<template>
  <div class="confirmAnOrder">
      <headGoBack title='确认订单' :goBackBoo="headGoBack" path='/shopping'></headGoBack>
      <section>
        <header class="header">
            <p>收货人：{{this.$store.state.myUser.mainContacts}}</p>
            <p>{{this.$store.state.myUser.mainContactsPhone}}</p>
            <p>{{this.$store.state.myUser.allAddress}}</p>
        </header>    

        <div class="content" v-if="confirmData" v-for="item in confirmData.orderDealerVoList">
            <router-link to='/parentSupplier' tag='header'>
                <p>{{item.dealerName}}</p>
                <img src="../../assets/image/ic-next-left.png" alt="">
            </router-link>
            <router-link to='/parentSupplier' tag='div' class="contentBox">
                <ul>
                    <li v-for="list in item.orderGoodsVos">
                        <img :src="list.picUrl" alt="">
                    </li>
                </ul>
                <div>
                    <p>共计{{item.orderGoodsVos.length}}款</p>
                    <img src="../../assets/image/ic-next-left.png" alt="">
                </div>
            </router-link>
            <div class="contentPay">
                <p>支付方式</p>
                <p>在线支付</p>
            </div>
            <div class="contentRemark">
                <p>订单备注：</p>
                <input type="text" placeholder="告诉商家您的其他要求（0/100）">
            </div>
            <div class="contentMoney">
                <p>总金额：{{$store.state.validShoppingCartDealerVos.totalAmount|addZero}}</p>
                <p>以省：￥-0.00</p>
            </div>
            <div class="contentDiscounts" @click='toast'>
                <p>优惠券</p>
                <div>
                    <p>无可用</p>
                    <img src="../../assets/image/ic-next-left.png" alt="">
                </div>
            </div>
            <div class="contentBottom">
                <div>
                    <p>商品总金额</p>
                    <p>￥{{$store.state.validShoppingCartDealerVos.totalAmount|addZero}}</p>
                </div>
                <div>
                    <p>以省</p>
                    <p>-￥0.00</p>
                </div>
                <div>
                    <p>优惠券</p>
                    <p>-￥0.00</p>
                </div>
                <div>
                    <p>应付金额</p>
                    <p>￥{{$store.state.validShoppingCartDealerVos.totalAmount|addZero}}</p>
                </div>
            </div>
        </div>
      </section>
      <div class="undefined"></div>
      <footer>
          <div>
            应付总额：&nbsp;<span>￥{{$store.state.validShoppingCartDealerVos.totalAmount|addZero}}</span>
          </div>
          <router-link to='/payment' tag='div'>
            提交订单
          </router-link>
      </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
            headGoBack: true,
            confirmData: ''
        }
    },
    methods: {
        getConfirmData() {
            let data = {
                allSelect: true,
                cityId: this.$store.state.myUser.city,
                countyId: this.$store.state.myUser.county,
                freightmoney: this.$store.state.validShoppingCartDealerVos.freightmoney+".00",
                freightpol: true,
                goodsCount: 1,
                guestExclusiveFlag: true,
                invalidShoppingCartDealerVos: [],
                isUseMutiCoupon: true,
                merchantId: this.$store.state.getByUser.merchantId,
                noStockOrderGoodsVoList: [],
                provId: this.$store.state.getByUser.provinceId,
                salesPlatformEnum: this.$store.state.validShoppingCartDealerVos.salesPlatformEnum,
                salesTerminalEnum: "WECHAT",
                savedAmount: "0.00",
                shopId: this.$store.state.myUser.storeId,
                shopName: this.$store.state.myUser.storeName,
                siteId: this.$store.state.stationId,
                storeId: this.$store.state.myUser.id,
                streetId: this.$store.state.myUser.town,
                totalAmount: "105.00",
                userId: this.$store.state.id,
                validShoppingCartDealerVos: this.$store.state.validShoppingCartDealerVos.validShoppingCartDealerVos
            }
            this.$ajax.confirmAnOrder(data).then(res=>{
                if(res.data.status.statusCode===0){
                    this.confirmData = res.data.result
                }
                console.log(res) 
            })
        },
        toast() {
            this.$toast('暂无优惠券可用')
        }
    },
    created() {
        if(this.$store.state.validShoppingCartDealerVos){
            this.getConfirmData()
        }
    }
}

</script>
<style scoped lang='scss'>
.confirmAnOrder{
    background-color:#f2f1f6;
    section{
        font-size: .14rem;
        >.header{
            background-color: white;
            padding: .14rem;
            margin-bottom: .1rem;
            >p:nth-of-type(1){
                font-weight: 700;
                margin-bottom: .1rem;
            }
            >p:nth-of-type(2){
                color: #333;
            }
            >p:nth-of-type(3){
                color: #666;
                font-size: .13rem;
            }
        }
        .content{
            background: #fff;
            >header{
                height: .4rem;
                line-height: .4rem;
                padding: 0 .1rem 0 .14rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                >img{
                    width: .12rem;
                    height: .12rem;
                }
            }
            .contentBox{
                height: .55rem;
                padding: .14rem;
                background:#f8f8f8;
                display: flex;
                align-items: center;
                justify-content: space-between;
                >ul{
                    display: flex;
                    >li{
                        margin-right: .06rem;
                        >img{
                            width: .55rem;
                            height: .55rem;
                        }
                    }
                }
                >div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    >p{

                    }
                    >img{
                        width: .12rem;
                        height: .12rem;
                    }
                }
            }
            .contentPay{
                height: .4rem;
                padding: 0 .1rem 0 .14rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .contentRemark{
                height: .4rem;
                padding: 0 .1rem 0 .14rem;
                display: flex;
                align-items: center;
                >input{
                    flex: 1;
                }
            }
            .contentMoney{
                padding: .14rem;
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: .21rem .16rem;
                >p{
                    text-align: right;
                }
                >p:nth-of-type(1){
                    line-height: .21rem;
                    font-size: .16rem;
                    font-weight: 700;
                }
                >p:nth-of-type(2){
                    line-height: .16rem;
                    font-size: .12rem;
                    color:#dd3333;
                }
            }
            .contentDiscounts{
                position: relative;
                padding: .06rem .1rem .06rem .14rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: .4rem;
                >div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    >img{
                        width: .12rem;
                        height: .12rem;
                    }
                }
            }
            .contentDiscounts:after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: .06rem;
                background: #f2f1f6;
            }
            .contentDiscounts:before{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: .06rem;
                background: #f2f1f6;
            }
            .contentBottom{
                padding: .14rem .1rem .14rem .14rem;
                >div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: .05rem;
                    height: .19rem;
                    font-size: .14rem;
                    color: #666;
                }
                >div:nth-of-type(4){
                    margin-bottom: 0;
                }
            }
        }
    }
    .undefined{
        background: #fff;
        height: .5rem;
    }
    footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        grid-template-columns: 1fr 1.15rem;
        grid-template-rows: .5rem;
        text-align: center;
        line-height: .5rem;
        font-size: .16rem;
        box-shadow: 0px 0px .09rem #ccc;
        >div:nth-of-type(1){
            font-size: .18rem;
            padding-left: .14rem;
            text-align: left;
            background-color:#fff;
            >span{
                color: #d33;
                font-weight: 700;
            }
        }
        >div:nth-of-type(2){
            background-color:#d33;
            color:white;
        }
    }
}   
</style>