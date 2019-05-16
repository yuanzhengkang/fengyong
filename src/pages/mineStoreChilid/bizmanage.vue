<!-- 店铺 -->
<template>
  <div class="bizmanage">
    <headGoBack title="店铺管理" goBackBoo="true"></headGoBack>

    <p class="basic">基本信息</p>
    <ol>
      <li>
        <span>微店名称</span>
        <router-link to="/mine">
          <p>
            <i>{{title.shopName}}</i>
            <img src="../../assets/image/ic-next-left.png" alt>
          </p>
        </router-link>
      </li>
      <li>
        <span>微店LOGO</span>

        <p>
          <van-uploader :after-read="onRead">
            <van-icon name="photograph"/>
          </van-uploader>
          <img src="../../assets/image/ic-next-left.png" alt>
        </p>
      </li>
      <li>
        <span>微店联系人</span>
        
        <router-link to="/contacts">
          <p>
            <i>{{title.contactsName }}</i>
            <img src="../../assets/image/ic-next-left.png" alt>
          </p>
        </router-link>
      </li>
      <li>
        <span>微店联系人电话</span>
        <router-link to="/phone">
          <p>
            <i>{{title.contactsPhone }}</i>
            <img src="../../assets/image/ic-next-left.png" alt>
          </p>
        </router-link>
      </li>
      <li>
        <span>微店介绍</span>
        <router-link to="/shop1">
          <p>
            <i>{{title.remark }}</i>
            <img src="../../assets/image/ic-next-left.png" alt>
          </p>
        </router-link>
      </li>
      <li>
        <span>微店二维码</span>
        <!-- <router-link to="/"> -->
          <p>
            我的
            <img src="../../assets/image/ic-next-left.png" alt>
          </p>
        <!-- </router-link> -->
      </li>
    </ol>
    <p class="basic">线上渠道信息</p>
     <div class="mss" @click="xia"> 
        <span> 是否开通小程序端</span>
        <i>去开通</i>
     </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

Vue.use(Toast);
import Vue from "vue";
import { Uploader } from "vant";
Vue.use(Uploader);
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headGoBack from "../../commonComponents/headGoBack";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      title: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onRead(file) {
      this.$store.commit("setparce", file.file.name);

      this.price();
    },
    logo() {
      this.$ajax.logo().then(res => {
        // console.log(res);
      });
    },
    price() {
      this.$ajax.price().then(res => {
        // console.log(res);
        this.logo();
      });
    },
    xia(){
        Toast.fail('此功能未开通');
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$ajax.management().then(res => {
      // console.log(res);

        });
      this.$ajax.last().then(res => {
        // console.log(res);
        this.title = res.data.result;
        // this.$store.commit("setMyshop", res.data.result);
    
    });
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
.basic {
  height: 0.38rem;
  background-color: #f2f1f6;
  font-size: 0.14rem;
  display: flex;
  align-items: center;
  padding-left: 0.13rem;
}
ol {
  li {
    height: 0.45rem;
    background-color: #fff;
    border-bottom: 1px #f2f1f6 solid;
    font-size: 0.14rem;
    display: flex;
    align-items: center;
    color: #666;
    justify-content: space-between;
    padding-left: 0.13rem;
    padding-right: 0.13rem;

    p {
      font-size: 0.114rem;
      color: black;
      display: flex;
      align-items: center;
      img {
        width: 0.12rem;
        height: 0.12rem;
        padding-left: 0.05rem;
      }
    }
  }
}
.mss{
     height: 0.45rem;
    background-color: #fff;
    border-bottom: 1px #f2f1f6 solid;
    font-size: 0.14rem;
    display: flex;
    align-items: center;
    color: #666;
    justify-content: space-between;
    padding-left: 0.13rem;
    padding-right: 0.13rem;
    i{
      color: black;
    }
}
</style>