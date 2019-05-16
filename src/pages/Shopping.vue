<template>
  <div class="shopping">
    <headGoBack :goBackBoo="goBackBoo" title="购物车"></headGoBack>
    <div class="shoppingList" v-for="(item,index) in shoppingData.validShoppingCartDealerVos" :key = "index">
      <header>
        <img @click="selectedSingle(item,index)"
        :src="singleSelectedIndex[index]?require('../assets/image/ic_checked.png'):require('../assets/image/ic_check_defult.png')" alt>
        <p>{{item.dealerName}}</p>
        <img src="../assets/image/ic-next-left.png" alt>
      </header>
      <div class="list">
        <div class="list-item" v-for="(list,listIndex) in item.groupGoodsVoList[0].shoppingCartGoodsResponseVo" :key = "listIndex">
          <img
            class="defultImg"
            @click="modifyCheckState(list.choiceOrNo,list.skuId)"
            v-if="list.stock>=list.minimumOrderQuantity"
            :src="list.choiceOrNo?icSelected:icImg"
            alt
          >
          <router-link :to="{name:'commodityDetails',query:{skuId:list.skuId}}" tag='p' v-if="list.stock<list.minimumOrderQuantity">补货中</router-link>
          <router-link :to="{name:'commodityDetails',query:{skuId:list.skuId}}" tag='img' class="goodsImg" :src="list.picUrl" alt=''/>
          <div>
            <router-link :to="{name:'commodityDetails',query:{skuId:list.skuId}}" tag='p'>{{list.goodsName}}</router-link>
            <router-link :to="{name:'commodityDetails',query:{skuId:list.skuId}}" tag='div' class="goodPrice">
              <p>￥{{list.originalPrice|addZero}}</p>
              <p>
                <span>{{list.secondQuantity}}{{list.quantityUnit||list.secondUnit}}</span>
                &nbsp;
                <span v-if="list.firstQuantity!=0">{{list.firstQuantity}}{{list.firstUnit}}</span>
              </p>
            </router-link>
            <div class="goodAdd">
              <div @click="modifyGoodsNum(list,'subtract',item)">
                <p>-</p>
              </div>
              <div>
                <p>{{list.totalQuantity}}</p>
              </div>
              <div @click="modifyGoodsNum(list,'add',item)">
                <p>+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <p>￥{{item.totalAmount|addZero}}</p>
        <p>已省：-￥{{item.savedAmount|addZero}}</p>
      </div>
    </div>
    <div class="orderRequirementTips" v-if="99-shoppingData.totalAmount >= 0">
      <div class="orderContent" v-if = "shoppingData.validShoppingCartDealerVos.length">
        您未满足<span>99.00元</span>起订要求，
        还差<span>{{99-shoppingData.totalAmount|addZero}}</span>元
      </div>
    </div>
    <div class="bottom" v-if="shoppingData">
      <div class="bottomBox" v-if = "showBoolean">
          <img @click='selectedAll' :src="judgeSelectedAll?require('../assets/image/ic_checked.png'):require('../assets/image/ic_check_defult.png')" alt="">
          <p>全选</p>
          <div>
            <div>
              <p>合计：</p>
              <p>￥{{shoppingData.totalAmount|addZero}}</p>
            </div>
            <div>已省：￥{{shoppingData.savedAmount|addZero}}</div>
        </div>
        <p v-if="shoppingData.totalAmount>=99" @click="toSettleAccounts">去结算</p>
        <p class="goodTotalAmount" v-else>￥99.00起送</p>
      </div>
    </div>
    <div class = "noneGoods"  v-if = "!showBoolean">
      <img src="../assets/image/ic_no_cart.png" alt="">
      <p>你的购物车暂无商品</p>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      goBackBoo: false,
      shoppingData: '',
      icSelected: require('../assets/image/ic_checked.png'),
      icImg: require('../assets/image/ic_check_defult.png'),
      judgeSelectedAll: '',
      selectedSingleImgBoo: '',
      singleSelectedIndex: [],
      showBoolean:""
    }
  },
  methods: {
    //created的请求购物车信息
    getShoppingData() {
      let data = {
        userId: this.$store.state.id,
        merchantId: this.$store.state.getByUser.merchantId,
        siteId: this.$store.state.stationId,
        shopId: this.$store.state.myUser.storeId,
        provId: this.$store.state.getByUser.provinceId,
        cityId: this.$store.state.myUser.city,
        countyId: this.$store.state.myUser.county,
        streetId: this.$store.state.myUser.town,
        storeId: this.$store.state.myUser.id 
      }
      this.vantHint()
      console.log(data)
      this.$ajax.getShopping(data).then(res=>{
        if(res.data.status.statusCode === 0){
          this.$store.commit('setValidShoppingCartDealerVos',res.data.result)
          this.shoppingData = res.data.result
          this.$toast.clear()
          this.showBoolean = this.shoppingData.validShoppingCartDealerVos.length
        }
      })
    },
    //点击取消小圆点的方法
    modifyCheckState(boo,skuId) {
      console.log(boo,skuId)
      let data = {
        userId: this.$store.state.id,
        merchantId: this.$store.state.getByUser.merchantId,
        siteId: this.$store.state.stationId,
        shopId: this.$store.state.myUser.storeId,
        provId: this.$store.state.getByUser.provinceId,
        cityId: this.$store.state.myUser.city,
        countyId: this.$store.state.myUser.county,
        streetId: this.$store.state.myUser.town,
        storeId: this.$store.state.myUser.id,
        isCheck: !boo,
        skuIds: skuId
      }
      this.vantHint()
      this.$ajax.modifyCheckState(data).then(res=>{
        if(res.data.status.statusCode === 0){
          this.shoppingData = res.data.result
          this.$toast.clear()
        }
      })
    },
    //加减数量的请求
    modifyGoodsNum(list,method,item) {
      if(method == 'add'){
        list.totalQuantity = Number(list.totalQuantity) + 1
      }else if(method == 'subtract') {
        console.log(parseInt(list.integerZeroConvert.split('=')[1]))
        if(list.totalQuantity <= parseInt(list.integerZeroConvert.split('=')[1])){
          this.$toast('最少起批数量'+list.integerZeroConvert.split('=')[0])
          return 
        }else{
          list.totalQuantity = Number(list.totalQuantity) - 1
        }
      }
      let data = {
        choiceOrNo: list.choiceOrNo,
        cityId: this.$store.state.myUser.city,
        countyId: this.$store.state.myUser.county,
        dealerId: list.dealerId,
        dealerOrgId:  list.dealerOrgId, 
        firstQuantity: list.totalQuantity, //数量
        firstUnit:  list.firstUnit,
        merchantId: list.merchantId,
        provId: this.$store.state.getByUser.provinceId,
        secondQuantity: list.thirdQuantity,
        secondUnit: list.secondUnit,
        shopId: this.$store.state.myUser.storeId,
        siteId: this.$store.state.stationId,
        storeId: this.$store.state.myUser.id,
        streetId: this.$store.state.myUser.town,
        skuId:  list.skuId,
        thirdQuantity:  list.thirdQuantity,
        thirdUnit:  list.thirdUnit,
        userId: this.$store.state.id,
      }
      this.vantHint()
      this.$ajax.modifyGoodsNum(data).then(res=>{
        if(res.data.status.statusCode === 0){
          this.shoppingData = res.data.result
          this.$toast.clear()
        }
      })
    },
    //全部选中
    selectedAll() {
      let skuIdsStr = ''
      for(var i=0;i<this.shoppingData.validShoppingCartDealerVos.length;i++){
        for(var j=0;j<this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo.length;j++) {
          skuIdsStr += this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo[j].skuId + ','
        }
      }
      let data = {
        userId: this.$store.state.id,
        merchantId: this.$store.state.getByUser.merchantId,
        siteId: this.$store.state.stationId,
        shopId: this.$store.state.myUser.storeId,
        provId: this.$store.state.getByUser.provinceId,
        cityId: this.$store.state.myUser.city,
        countyId: this.$store.state.myUser.county,
        streetId: this.$store.state.myUser.town,
        storeId: this.$store.state.myUser.id,
        isCheck: !this.judgeSelectedAll, //控制全选的bool
        skuIds: skuIdsStr
      }
      this.vantHint()
      this.$ajax.slectedAll(data).then(res=>{
        this.shoppingData = res.data.result
        if(res.data.status.statusCode === 0){
          this.shoppingData = res.data.result
          this.$toast.clear()
        }
      })
    },
    //单项全选
    selectedSingle(item,index) {
      this.singleSelectedIndex[index] = !this.singleSelectedIndex[index]
      let skuIdsStr = ''
      for(var n=0;n<item.groupGoodsVoList[0].shoppingCartGoodsResponseVo.length;n++) {
          skuIdsStr += item.groupGoodsVoList[0].shoppingCartGoodsResponseVo[n].skuId + ','
      }
      let data = {
        userId: this.$store.state.id,
        merchantId: this.$store.state.getByUser.merchantId,
        siteId: this.$store.state.stationId,
        shopId: this.$store.state.myUser.storeId,
        provId: this.$store.state.getByUser.provinceId,
        cityId: this.$store.state.myUser.city,
        countyId: this.$store.state.myUser.county,
        streetId: this.$store.state.myUser.town,
        storeId: this.$store.state.myUser.id,
        isCheck: this.singleSelectedIndex[index], //控制单项全选的bool
        skuIds: skuIdsStr
      }
      this.vantHint()
      this.$ajax.slectedAll(data).then(res=>{
        if(res.data.status.statusCode === 0) {
          this.selectedSingleImgBoo = true
          this.shoppingData = res.data.result
          this.$toast.clear()
        }else{
          this.selectedSingleImgBoo = false
        }
      })
    },
    //判断是不是全部选中
    judgeSelected() {
      for(var i=0;i<this.shoppingData.validShoppingCartDealerVos.length;i++){
        for(var j=0;j<this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo.length;j++) {
          if(!this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo[j].choiceOrNo) {
            this.judgeSelectedAll = false
            return 
          }else {
            this.judgeSelectedAll = true
          }
        }
      }
    },
    //判断是不是单项全部选中
    singleJudgeSelected() {
      for(var i=0;i<this.shoppingData.validShoppingCartDealerVos.length;i++){
        for(var j=0;j<this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo.length;j++) {
          if(!this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo[j].choiceOrNo) {
            this.singleSelectedIndex[i] = false
            break
          }else {
            this.singleSelectedIndex[i] = true
          }
        }
      }
    },
    //判断有几个商品数量
    goodsNum() {
      let num = 0
      for(var i=0;i<this.shoppingData.validShoppingCartDealerVos.length;i++){
        for(var j=0;j<this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo.length;j++) {
          if(this.shoppingData.validShoppingCartDealerVos[i].groupGoodsVoList[0].shoppingCartGoodsResponseVo[j].choiceOrNo) {
            num+=1
          }
        }
      }
      this.$store.commit('setGoodsNum',num)
    },
    //vant提示框
    vantHint() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
      });
    },
		getRouter(){
      let data = this.$route.query.data;
      if(data) {
        let obj = {
          ...data,
          userId:this.$store.state.id,
          merchantId:this.$store.state.getByUser.merchantId,
          storeId:this.$store.state.myUser.id
        }
        let _this = this;
        this.$ajax.getShopping(obj).then(res => {
          if(res.data.status.statusCode === 0){
            if(res.data.validShoppingCartDealerVos){
              res.data.validShoppingCartDealerVos.forEach((item)=> {
                _this.shoppingData.push(item)
              })  
            }
          }
        }) 
      }
    },
    toSettleAccounts() {
      if(this.shoppingData.totalAmount>=99) {
        this.$router.push('/confirmAnOrder')
      }
    },
  },
  watch: {
    shoppingData() {
      //监听每次数据变化，前面小圆点的选中与否
      this.judgeSelected()
      this.singleJudgeSelected()
      this.goodsNum()
    }
  },
  created() {
    this.getShoppingData()
		this.getRouter()
  },
  beforeUpdate() {
    this.judgeSelected()
  }
}
</script>

<style scoped lang="scss">
.shopping {
  .shoppingList {
    > header {
      display: flex;
      align-items: center;
      padding-left: 0.14rem;
      padding-right: 0.14rem;
      height: 0.4rem;
      box-sizing: border-box;
      color: #333;
      background: #f8f8f8;
      > img {
        width: 0.16rem;
        height: 0.16rem;
      }
      > p {
        margin-left: 0.12rem;
        margin-right: 0.03rem;
        max-width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.14rem;
      }
      > img:nth-of-type(2) {
        width: 0.13rem;
        height: 0.12rem;
      }
    }
    .list {
      .list-item {
        height: 1.25rem;
        display: flex;
        align-items: center;
        padding: 0 0.14rem;
        > .defultImg {
          width: 0.16rem;
          height: 0.16rem;
        }
        > p {
          font-size: 0.12rem;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0.08rem;    
          padding: .02rem .04rem .02rem .04rem;
        }
        > .goodsImg {
          width: 1rem;
          height: 1rem;
          margin-left: 0.1rem;
        }
        > div {
          padding-left: 0.1rem;
          height: 1rem;
          flex: 1;
          position: relative;
          > p {
            font-size: 0.14rem;
            color: #333;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            position: absolute;
            left: 0.1rem;
            right: 0;
            height: 0.16rem;
          }
          > .goodPrice {
            margin-top: 0.4rem;
            height: 0.32rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > p:nth-of-type(1) {
              font-size: 0.18rem;
              color: #d33;
            }
            > p:nth-of-type(2) {
              font-size: 0.12rem;
              color: #999;
            }
          }
          .goodAdd {
            display: grid;
            grid-template-columns: .26rem .56rem .26rem;
            grid-template-rows: .26rem;
            background-color: #f2f1f6;
            border: 1px solid #9b9b9b;
            float: right;
            >div{
              > p {
                text-align: center;
                font-size: 0.16rem;
                width: 100%;
                height: 100%;
                line-height: .26rem;
              }
            }
            > div:nth-of-type(2) {
              border-left: 1px solid #9b9b9b;
              border-right: 1px solid #9b9b9b;
            }
          }
        }
      }
    }
    .foot {
      border-top: 1px solid #f2f1f6;
      height: 0.5rem;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      padding-right: 0.14rem;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 0.04rem;
      padding-bottom: 0.04rem;
      background: #fff;
      > p:nth-child(1) {
        color: #333;
        font-size: 0.18rem;
        margin-left: 0.1rem;
        font-weight: bold;
      }
      > p:nth-child(2) {
        color: #d33;
        font-size: 0.12rem;
        height: 0.19rem;
      }
    }
  }
  .orderRequirementTips{
    height: .3rem;
    font-size: 0.12rem;
    color: #333;
    line-height: .3rem;
    position: relative;
    .orderContent{
      height: .3rem;
      background: #fef9ef;
      padding: 0 .13rem;
      position: fixed;
      bottom: 1rem;
      left: 0;
      right: 0;
      >span{
        color:#dd3333;
        padding: 0 .06rem;
      }
    }
  }
  .bottom{
    position: relative;
    height: .5rem;
    .bottomBox{
      position: fixed;
      bottom: .5rem;
      left: 0;
      right: 0;
      z-index: 99;
      background: #fff;
      height: .5rem;
      border-top: 1px solid #f7f7f7;
      display: flex;
      align-items: center;
      padding-left: .14rem;
      >img{
        width: .16rem;
        height: .16rem;
      }
      >p:nth-of-type(1){
        color: #666;
        font-size: 0.14rem;
        margin-left: .07rem;
        margin-right: .12rem;
      }
      >div{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        >div:nth-of-type(1){
          display: flex;
          >p:nth-of-type(1){
            font-size: 0.16rem;
            color: #333;
          }
          >p:nth-of-type(2){
            font-size: 0.16rem;
            color: #d33;
          }
        }
        >div:nth-of-type(2){
          font-size: 0.12rem;
          transform: scale(.83);
          margin-left: -0.18rem;
        }
      }
      >p:nth-of-type(2){
        display: flex;
        width: 1.2rem;
        height: 100%;
        font-size: 0.16rem;
        justify-content: center;
        align-items: center;
        background-color: #d33;
        color: white;
      }
      >.goodTotalAmount{
        background-color: #999 !important;
      }
      >div{
        flex: 1;
        >p{
        display: flex;
        width: 1.2rem;
        height: 100%;
        font-size: 0.16rem;
        justify-content: center;
        align-items: center;
        background-color: #d33;
        color: white;
        }
      }
    }
  }
  .noneGoods{
    position: absolute;
    top: 0.43rem;
    left: 0;
    bottom: 0.5rem;
    width: 100%;
    background: #f2f1f6;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #666666;
    img{
      width: 0.6rem;
      height: 0.6rem;
      margin-bottom: 0.25rem;
    }
  }
}
</style>
