<template>
  <div class = "payment">
    <headGoBack title='订单提交成功' :goBackBoo="true" path='/shopping'></headGoBack>
    <div class = "paymentCon">
      <div class = "paymentLogo">
        <div class = "logoImg">
          <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//fec1254312544660b8e6845e65d4825c.o6zAJs40K6GJbyizSOz14zgmmCiA.flcrhdpCiozga4fd5b537ee69155d3e8330a1385fbbc.png" alt="">
          <div>
            <p>支付方式：账期支付</p>
            <p>订单金额：<span>¥ {{totalPrice|addZero}}</span></p>
          </div>
        </div>
      </div>
      <div class = "loddPayment">
        <div class = "payLeft">
          <p>微信支付：<span>{{totalPrice|addZero}}</span> 元</p>
          <p>部分商品需要在线支付，请尽快支付</p>
        </div>
        <p class = "payRight">待支付</p>
      </div>
      <div class = "immediately">
        <p @click='alert'>立即支付（¥ {{totalPrice|addZero}}）</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      totalPrice: this.$store.state.validShoppingCartDealerVos.totalAmount
    }
  },
  created() {
    // this.price()
  },
  methods: {
    price() {
      if(this.route.query.totalPrice) {
        this.totalPrice = this.route.query.totalPrice
      }
      return
    },
    alert() {
      this.$toast('支付功能暂时关闭')
    }
  }
}

</script>
<style lang='scss' scoped>
.paymentCon{
  position: absolute;
  top: 0.43rem;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f1f6;
  .paymentLogo{
    height: 1.37rem;
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .logoImg{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.13rem;
      img{
        width: 1rem;
        // height: 0.74rem;
        margin-right: 0.125rem;
      }
      div{
        display: flex;
        flex-direction: column;
        p{
          margin-top: 0.1rem;
        }
        p:nth-of-type(2){
          span{
            color:#d33;
          }
        }
      }
    }
  }
  .loddPayment{
    margin-top: 0.15rem;
    background: #ffffff;
    padding: 0.1rem;
    box-sizing: border-box;
    height: .6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.14rem;
    .payLeft{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      p:nth-of-type(1){
        span{
          color:#d33;
        }
      }
      p:nth-of-type(2){
        color:#999;
        font-size: 0.13rem;
      }
    }
    .payRight{
      color:#d33;
    }
  }
  .immediately{
    margin-top: 0.35rem;
    display: flex;
    justify-content: center;
    p{
      width: 3.11rem;
      height: 0.44rem;
      font-size: 0.18rem;
      color: #FFFFFF;
      background: #DD3333;
      border-radius: 4px;
      text-align: center;
      line-height: 0.44rem;
    }
  }
}
</style>