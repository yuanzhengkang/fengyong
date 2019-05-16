<!--我的小店  -->
<template>
  <div class="minestore">
    <headGoBack :title='title.shopName' goBackBoo="goBackBoo" class="headGoBack"></headGoBack>

    <div class="header">
      <ul>
        <li>
          <i>{{message.totalAccess}}</i>
          <p>交易订单数</p>
        </li>
        <li>
          <span>￥{{message.totalMoney}}</span>
          <p>店铺交易额</p>
        </li>
        <li>
          <s>{{message.totalOrder}}</s>
          <p>昨日访问量</p>
        </li>
      </ul>
    </div>

    <div class="shangpin">
      <ol>
        <li v-for="(items,index)  in   soterlist  " :key="index">
          <router-link :to="items.go" tag=div>
            <img :src="items.img" alt>
            <span>{{items.name}}</span>
          </router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import headGoBack from "../commonComponents/headGoBack";
import { error } from "util";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      soterlist: [
        {
          img: require("../assets/image/ic_wxIndex.png"),
          name: "店铺管理",
          go: "/bizmanage"
        },
        {
          img: require("../assets/image/ic_goods.png"),
          name: "商品管理",
          go: "/shop"
        },
        {
          img: require("../assets/image/ic_bill.png"),
          name: "对账单",
          go: "/bill"
        },
        {
          img: require("../assets/image/ic_analyze.png"),
          name: "经营分析",
          go: "/run"
        },
        {
          img: require("../assets/image/ic_orderManage.png"),
          name: "订单管理",
          go: "/indent"
        },
        {
          img: require("../assets/image/ic_staffManage.png"),
          name: "员工管理",
          go: "/staff"
        },
        {
          img: require("../assets/image/ic_shopSet.png"),
          name: "门店设置",
          go: "/outlet"
        },
        {
          img: require("../assets/image/ic_member.png"),
          name: "客服管理",
          go: "/service"
        },
        {
          img: require("../assets/image/ic_team_buy.png"),
          name: "团购管理",
          go: "/group"
        }
      ],
      message: "",
      title:''
      
    };
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
    // 6649
    this.$ajax.store1().then(res => {
        // console.log(res)
      if(res.data.result){
        this.message = res.data.result;
      }
    });

    this.$ajax.getApp().then(res=>{
      // console.log(res)
    })
    this.$ajax.last().then(res=>{
      // console.log(res)
   
      this.title=res.data.result;
       this.$store.commit('setMyshop',res.data.result)
    })
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  components: {
    headGoBack
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.header {
  height: 1.24rem;
  border: 1px solid red;
  background: linear-gradient(to right, #d33 0%, #f36539 100%);
  color: #fff;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0.5rem;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 0.13rem;
      }
      i {
        font-size: 0.17rem;
      }
      span {
        font-size: 0.17rem;
      }

      s {
        font-size: 0.17rem;
        text-decoration: none;
      }
    }
  }
}

.shangpin {
  widows: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ol {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    li:nth-child(1) {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0.35rem;
        left: 0.71rem;
        width: 0.05rem;
        height: 0.05rem;
        background-color: #0ce3aa;
        border-radius: 50%;
      }
    }
    li:nth-child(3) {
      border-right: none;
    }
    li:nth-child(6) {
      border-right: none;
    }
    li:nth-child(9) {
      border-right: none;
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 1.23rem;
      height: 1.26rem;
      border-bottom: 1px solid #f2f1f6;
      border-right: 1px solid #f2f1f6;
      >div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 0.2rem;
          height: 0.2rem;
        }
        span {
          font-size: 0.13rem;
          margin-top: 0.15rem;
        }
      }
    }
  }
}
</style>