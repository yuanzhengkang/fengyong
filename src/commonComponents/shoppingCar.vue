<template>
  <div class="shoppingCar">
    <div @click="getShoppingCarData(goodsId)">
      <slot>
        <img src="../assets/image/shopping.png" alt>
      </slot>
    </div>
    <div :class="shoppingClass" v-if="shoppingCarShow && shoppingCarData">
      <div class="shoppingCarHead" @click="shoppingCarHide"></div>
      <div class="shoppingCarContent">
        <div class="shoppingCarContentHead">
          <img
            :src="shoppingCarData.goodsOl.mainPic || shoppingCarData.goodsOl.picsUrl | picsUrl"
            alt
          >
          <div>
            <p>{{shoppingCarData.goodsOl.goodsName}}</p>
            <div>
              ￥
              <span>{{shoppingCarData.goodsOl.orderPrice|addZero}}</span>
              <span>1{{shoppingCarData.goodsOl.secondMeasurementUnit}}起批</span>
            </div>
          </div>
          <img @click="shoppingCarHide" src="../assets/image/ic_present_colse.png" alt>
        </div>
        <div class="shoppingCarContentMiddle">
          <div>库存{{shoppingCarData.skuSaleNum}}{{shoppingCarData.goodsOl.measurementUnit}}</div>
          <div>月销{{shoppingCarData.salesNum}}{{shoppingCarData.goodsOl.measurementUnit}}</div>
          <div>{{shoppingCarData.goodsOl.integerZeroConvert}}</div>
        </div>
        <div class="shoppingCarContentFooter">
          <div class="shoppingCarContentFooterLeft">数量</div>
          <div class="shoppingCarContentFooterRight">
            <p v-if='shoppingCarData.goodsOl.secondMeasurementUnit'
              @click="selectUnit"
              :class="activeBoo&&'active'"
            >{{shoppingCarData.goodsOl.secondMeasurementUnit}}</p>
            <div v-else></div>
            <p
              @click="selectUnit"
              :class="!activeBoo&&'active'"
            >{{shoppingCarData.goodsOl.measurementUnit}}</p>
            <div class="goodAdd">
              <div @click="modifyGoodsNum('subtract')">
                <p>-</p>
              </div>
              <div>
                <input v-if="shoppingCarData.goodsOl.ratio1 && !activeBoo" v-model="shoppingCarData.goodsOl.ratio1">
                <input v-else v-model="shoppingCarData.goodsOl.minimumOrderQuantity">
              </div>
              <div @click="modifyGoodsNum('add')">
                <p>+</p>
              </div>
            </div>
          </div>
        </div>
        <div class="shoppingCarContentBottom">
          <p>合计：</p>
          <div class="shoppingCarContentBottomLeft">
            <span
              v-if="this.activeBoo"
            >￥{{this.shoppingCarData.goodsOl.minimumOrderQuantity*this.shoppingCarData.goodsOl.ratio1*shoppingCarData.goodsOl.orderPrice|addZero}}</span>
            <span
              v-else
            >￥{{this.shoppingCarData.goodsOl.ratio1*shoppingCarData.goodsOl.orderPrice|addZero}}</span>
          </div>
          <div class="shoppingCarContentBottomRight" @click="addShopping">加入购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            shoppingCarData: '',
            shoppingCarShow: false,
            activeBoo: false,
            shoppingClass: 'shoppingCarBox'
        }
    },
    props: ['goodsId'],
    filters: {
        picsUrl(val) {
            if(val) {
                return val.split(',')[0]
            }else {
                return val
            }
        }
    },
    methods: {
        getShoppingCarData(goodsId) {
            let state = this.$store.state
            let data = goodsId+'/'+state.stationId+'/'+state.id+'/'+state.myUser.storeId+'/'+state.getByUser.merchantId+'/'+state.myUser.id
            console.log(data)
            this.$ajax.goodsDetail(data).then(res=>{
              if(res.data.status.statusCode===0){
                this.shoppingCarData = res.data.result
                console.log(res.data.result)
                this.shoppingCarShow = true
              }
            })
        },
        shoppingCarHide() {
            this.shoppingCarShow = false
        },
        selectUnit() {
            this.activeBoo = !this.activeBoo
        },
        modifyGoodsNum(method) {
          let ratioArr = this.shoppingCarData.goodsOl.integerZeroConvert.split('=')
            if(this.activeBoo){
                if(method == 'add'){
                    this.shoppingCarData.goodsOl.minimumOrderQuantity = ++this.shoppingCarData.goodsOl.minimumOrderQuantity
                }else if(method == 'subtract') {
                  if(this.shoppingCarData.goodsOl.minimumOrderQuantity<=parseInt(ratioArr[0])){
                    return 
                  }else{
                    this.shoppingCarData.goodsOl.minimumOrderQuantity = --this.shoppingCarData.goodsOl.minimumOrderQuantity
                  }
                }
            }else{
                if(method == 'add'){
                    this.shoppingCarData.goodsOl.ratio1 = ++this.shoppingCarData.goodsOl.ratio1
                }else if(method == 'subtract') {
                  if(this.shoppingCarData.goodsOl.ratio1<=parseInt(ratioArr[1])) {
                    return 
                  }else {
                    this.shoppingCarData.goodsOl.ratio1 = --this.shoppingCarData.goodsOl.ratio1
                  }
                }
            }
        },
        addShopping() {
            let data = {
                choiceOrNo: true,
                cityId: this.$store.state.myUser.city,
                countyId: this.$store.state.myUser.county,
                dealerId: this.shoppingCarData.goodsOl.dealerId,
                dealerOrgId: this.shoppingCarData.goodsOl.dealerOrgId,
                firstQuantity: this.shoppingCarData.goodsOl.ratio1,
                firstUnit: this.shoppingCarData.goodsOl.measurementUnit,
                merchantId: this.$store.state.getByUser.merchantId,
                provId: this.$store.state.getByUser.provinceId,
                secondQuantity: this.shoppingCarData.goodsOl.minimumOrderQuantity,
                secondUnit: this.shoppingCarData.goodsOl.quantityUnit,
                shopId: this.$store.state.myUser.storeId,
                siteId: this.$store.state.stationId,
                skuId: this.shoppingCarData.goodsOl.skuId,
                storeId: this.$store.state.myUser.id,
                streetId: this.$store.state.myUser.town,
                thirdQuantity: this.shoppingCarData.goodsOl.thirdQuantity,
                thirdUnit: this.shoppingCarData.goodsOl.thirdUnit,
                userId: this.$store.state.id,
            }
            this.$ajax.addShopping(data).then(res=>{
                if(res.data.status.statusCode===0){
                    this.$router.push('/shopping')
                }else{
                    this.$toast('加入购物车失败')
                }
            })
        }
    },
    created() {
        let name = this.$route.name
        if(name == 'home'||name == 'my'){
            this.shoppingClass = 'shoppingBottomCarBox'
        }else {
            this.shoppingClass = 'shoppingCarBox'
        }
    }
}
</script>
<style lang="scss">
.shoppingCar {
  > img {
    width: 100%;
    height: 100%;
  }
  .shoppingCarBox,.shoppingBottomCarBox {
    position: fixed;
    top: 0.43rem;
    left: 0;
    right: 0;
    z-index: 1000;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 0.57rem 1fr;
    .shoppingCarHead {
      opacity: 0.3;
      background: #000;
    }
    .shoppingCarContent {
      background: #fff;
      .shoppingCarContentHead {
        padding: 0.1rem 0 0.1rem 0.14rem;
        display: grid;
        grid-template-columns: 1.06rem 2.25rem 0.12rem;
        grid-template-rows: 1.06rem;
        > img:nth-of-type(1){
          width: 100%;
          height: 100%;
        }
        > img:nth-of-type(2){
          width: .12rem;
          height: .12rem;
        }
        > div {
          > p {
            height: 0.4rem;
            line-height: 0.2rem;
            font-size: 0.14rem;
            padding: 0 0.15rem;
            overflow: hidden;
            margin: 0.1rem 0 0.12rem 0;
          }
          > div {
            font-size: 0.12rem;
            color: #d33;
            padding: 0 0.15rem;
            > span:nth-of-type(1) {
              font-size: 0.24rem;
            }
            > span:nth-of-type(2) {
              color: #666;
              margin-left: 0.1rem;
            }
          }
        }
        > img:nth-of-type(2) {
          margin-top: 0.12rem;
        }
      }
      .shoppingCarContentMiddle {
        position: relative;
        display: grid;
        grid-template-columns: 25% 25% 25%;
        grid-template-rows: 0.16rem;
        padding: 0 0.15rem 0.1rem 0.15rem;
        color: #999;
        font-size: 0.13rem;
      }
      .shoppingCarContentMiddle::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #f2f1f6;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      .shoppingCarContentFooter {
        padding: 0.1rem 0.15rem;
        font-size: 0.14rem;
        color: #999;
        display: grid;
        grid-template-columns: 0.28rem 1fr;
        grid-template-rows: 0.28rem;
        align-items: center;
        justify-content: space-between;
        .shoppingCarContentFooterRight {
          margin-left: 1.2rem;
          display: grid;
          grid-template-columns: 0.28rem 0.28rem 1.09rem;
          grid-template-rows: 0.28rem;
          align-items: center;
          justify-content: space-between;
          > p {
            width: 0.28rem;
            height: 0.28rem;
            text-align: center;
            line-height: 0.28rem;
            border: 1px solid #9b9b9b;
            border-radius: 0.03rem;
            color: #000;
            box-sizing: border-box;
          }
          .active {
            background: #d33;
            color: #fff;
            border: 1px solid #d33;
          }
          .goodAdd {
            width: 100%;
            display: grid;
            grid-template-columns: 0.28rem 0.53rem 0.28rem;
            grid-template-rows: 0.28rem;
            border: 1px solid #9b9b9b;
            border-radius: 0.03rem;
            box-sizing: border-box;
            background-color: #f2f1f6;
            > div {
              > p {
                text-align: center;
                line-height: 0.28rem;
              }
            }
            > div:nth-of-type(2) {
              border-left: 1px solid #9b9b9b;
              border-right: 1px solid #9b9b9b;
              > input {
                width: 100%;
                height: 100%;
                text-align: center;
              }
            }
          }
        }
      }
      .shoppingCarContentBottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: grid;
        grid-template-columns: 1.28rem 0.88rem 1.59rem;
        line-height: 0.5rem;
        font-size: 0.16rem;
        grid-template-rows: 0.5rem;
        > p {
          text-align: right;
        }
        .shoppingCarContentBottomLeft {
          color: #d33;
          padding-left: 0.1rem;
        }
        .shoppingCarContentBottomRight {
          background: #d33;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .shoppingCarBox{
    bottom: 0;
  }
  .shoppingBottomCarBox{
    bottom: .5rem;
    grid-template-rows: 1.34rem 1fr;
  }
}
</style>