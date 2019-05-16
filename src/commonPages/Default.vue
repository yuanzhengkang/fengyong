<template>
  <div class="default">
    <router-view/>
    <div class="footer">
      <nav class="footerNav">
        <router-link :to="item.path" tag='div' v-for='(item,index) in pathArr' active-class="active" :key='index'>
          <img class="noActiveImg" :src="item.img" alt="">
          <img class="activeImg" :src="item.selectedImg" alt="">
          <p>{{item.title}}</p>
          <p class="shoppingNum" v-if="item.title=='购物车'&&goodsNum>0">
            {{goodsNum}}
          </p>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { state, mapState } from 'vuex'
export default {
  data() {
    return {
      pathArr: [
        {path: '/home',title: '首页',img: require('../assets/image/home.png'),selectedImg: require('../assets/image/homeSelected.png')},
        {path: '/list',title: '列表',img:  require('../assets/image/classify.png'),selectedImg: require('../assets/image/classifySelected.png')},
        {path: '/shopping',title: '购物车',img:  require('../assets/image/shoppings.png'),selectedImg: require('../assets/image/shoppingsSelected.png')},
        {path: '/my',title: '我的',img:  require('../assets/image/my.png'),selectedImg: require('../assets/image/mySelected.png')}
      ],
    }
  },
  computed: {
    ...mapState(['goodsNum']),
  },
}
</script>

<style scoped lang="scss">
.default{
  .footer{
    position: relative;
    height: .5rem;
  }
  .footerNav{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: .5rem;
    background: rgba(255,255,255,1);
    box-shadow: inset 0 1px 0 0 #E1E1E1;
    display: flex;
    >div{
      flex-grow: 1;
      text-align: center;
      position: relative;
      >img{
        width: .2rem;
        height: .2rem;
        margin-top: .09rem;
        margin-bottom: 0.03rem;
      }
      .activeImg{
        display: none;
      }
    }
    .active{
      color: #DD3333;
      .noActiveImg{
        display: none;
      }
      .activeImg{
        display: inline-block;
      }
    }
    .shoppingNum{
      width: .15rem;
      height: .15rem;
      border-radius: 50%;
      position: absolute;
      left: 52%;
      top: .06rem;
      background: #DD3333;
      color: #fff;
      text-align: center;
      line-height: .15rem;
    }
  }
}
</style>
