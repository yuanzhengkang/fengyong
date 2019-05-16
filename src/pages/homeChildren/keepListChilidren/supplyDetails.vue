<!--  -->
<template>
  <div class="supplyDetails">
    <headGoBack title="成都双流宏福商贸有限公司" goBackBoo="goBackBoo"></headGoBack>

    <div class="header" v-for="(i,index) in offside" :key="index">
      <img v-if="i.mainPic" :src="i.mainPic" alt>
      <img v-else :src="i.picsUrl" alt>
      <div class="rightlist">
        <p>{{i.goodsName}}</p>

        <div class="first">
          <h1>
            <i>￥</i>
            <em>{{i.orderPrice}}</em>
          </h1>

          <span>{{i.integerZeroConvert}}</span>
        </div>

        <div class="message">
          <span>已购买{{i.orderPrice}}次</span>
          <span class="mright">{{i.dealer.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headGoBack from "../../../commonComponents/headGoBack";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      offside: ""
    };
  },
  components: {
    headGoBack
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$ajax.skip().then(res => {
      console.log(res.data);
      console.log(res.data.result);
      this.offside = res.data.result;
    });
   
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.header {
  display: flex;
  flex-direction: row;
  padding: 0.12rem 0.12rem;

  img {
    width: 1rem;
    height: 1rem;
  }
  .rightlist {
    justify-content: space-around;
    display: flex;
    flex: 1;
    padding-left: 0.08rem;
    width: 100%;
    flex-direction: column;
    p {
      font-size: 0.14rem;
    }
    .first {
      display: flex;
      flex-direction: row;
      align-items: center;
      // p {
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: space-around;
      h1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        i {
          font-size: 0.12rem;
          color: red;
        }
        em {
          color: red;
          font-size: 0.17rem;
        }
      }
      span {
        font-size: 0.12rem;
        margin-left: 0.3rem;
        color: #999999;
      }
    }
    .message {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        color: #999999;
      }
      .mright {
        margin-left: 0.05rem;
      }
    }
  }
}
</style>