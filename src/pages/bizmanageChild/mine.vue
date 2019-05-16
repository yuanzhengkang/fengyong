<!-- 我的 -->
<template>
  <div class="mine">
    <headGoBack title="店铺名称" goBackBoo="true"></headGoBack>
    <div class="sousuo">
      <input type="text" v-model="s" ref="id" @click="input">
      <img @click="claar" v-if="xianshi" src="../../assets/image/clear.png" alt>
      <i v-else></i>
    </div>

    <div class="baocun" @click="save">保存</div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import Vue from "vue";
Vue.use(Toast);
import headGoBack from "../../commonComponents/headGoBack";
import { setInterval } from "timers";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "mine",
  components: {},
  data() {
    //这里存放数据
    return {
      s: "",
      xianshi: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    input() {
      this.$refs.id.focus();
      this.xianshi = true;
      //   if (true) {
      //     setTimeout(() => {
      //       this.xianshi = false;
      //     }, 1000);
      //   }
    },

    claar() {
      this.s = "";
      this.xianshi = false;
    },
    save() {

        this.$store.commit('setshopName',this.s)
      if (this.s.length == 0) {
      Toast('请输入内容');
      } else {
        this.$ajax.save().then(res => {
          console.log(res);
          if (res.data.result === 1) {
            this.$router.push("/minestore");
          }
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.mine {
  background: #f2f1f6;
}
.sousuo {
  height: 0.37rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  margin-top: 0.15rem;
  input {
    width: 3.3rem;
    height: 0.26rem;
  }
  img {
    width: 0.14rem;
    height: 0.13rem;
  }
  i {
    width: 0.05rem;
    height: 0.05rem;
  }
}

.baocun {
  background-color: red;
  width: 2.8rem;
  height: 0.4rem;
  color: white;
  font-size: 0.16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto;
}
</style>