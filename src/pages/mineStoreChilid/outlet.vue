<!-- 门店 -->
<template>
  <div class="outlet">
    <headGoBack goBackBoo="true" title="门店设置"></headGoBack>

    <ol class="header">
      <p>门店状态</p>
      <li
        v-for="(i,index) in  mendian"
        :key="index"
        @click="lists(index)"
        :class="index==xiabiao ? 'lis' :'li'  "
      >
        {{i.name}}
        <img v-if="index==xiabiao" src="../../assets/image/autotrophy.png" alt>
      </li>
    </ol>
    <div class="shijian">
      <span>营业时间</span>
      <i>08:00-22:00</i>
    </div>

    <div class="peisong">
      <span>配送设置</span>

      <p>
        <van-checkbox checked-color="red" v-model="checked"></van-checkbox>
        <i>支持配送</i>
      </p>
    </div>

    <div v-if="checked" class="xs">
      <ol>
        <li>
          <span>配送范围</span>
          <input type="text" v-model="je">
          <s>公里</s>
        </li>
        <li>
          <span>配送范围</span>
          <input type="text" v-model="s" placeholder="设置起送金额">
          <s>元</s>
        </li>
        <li>
          <span>配送费</span>
          <input type="text" placeholder="设置配送费">
          <s>元</s>
        </li>
        <li>
          <span>免运费</span>
          <input type="text" v-model="je">
          <s>元</s>
        </li>
        <li>
          <span>配送时间</span>

          <s>09:00-19:00</s>
        </li>
      </ol>

      <div class="footer" @click="achieve">完成</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

Vue.use(Toast);
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Checkbox, CheckboxGroup } from "vant";
import Vue from "vue";
Vue.use(Checkbox).use(CheckboxGroup);
export default {
  data() {
    return {
      mendian: [
        { name: "正常营业", img: require("../../assets/image/autotrophy.png") },
        { name: "关闭", img: require("../../assets/image/autotrophy.png") }
      ],
      xiabiao: "",
      checked: true,
      je: 2.0,
      s: ""
    };
  },
  methods: {
    lists(index) {
      console.log(index);
      this.xiabiao = index;
    },
    achieve() {
      if (this.s.length === 0) {
        Toast("请设置配送费");
      }else{
  this.$ajax.achieve().then(res=>{
            console.log(res)
        })

      }
    }
  }
};
</script>
<style lang='scss' scoped>
.outlet {
  background: #f2f1f6;
}
.header {
  background: white;
  height: 0.44rem;
  border-bottom: 1px #f1f2f6 solid;
  font-size: 0.13rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  p {
    margin-left: 13px;
  }
  li {
    width: 0.67rem;
    height: 0.28rem;
    border: 1px solid #f1f2f6;
    display: flex;
    align-items: center;
    margin-left: 0.27rem;
    border-radius: 0.06rem;
    justify-content: center;
    position: relative;
    transition: all 0.5s;
    img {
      width: 0.14rem;
      height: 0.14rem;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .lis {
    border: 1px solid red;
    width: 0.67rem;
    height: 0.28rem;
    border-radius: 0.06rem;
    transition: all 0.5s;
  }
}
.shijian {
  height: 0.44rem;
  border: 1px solid #f1f2f6;
  display: flex;
  align-items: center;
  background: white;
  font-size: 0.13rem;
  span {
    margin-left: 0.12rem;
  }

  i {
    margin-left: 0.28rem;
  }
}
.peisong {
  font-size: 0.12rem;
  height: 0.44rem;
  border-bottom: 1px #f1f2f6 solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    padding-left: 0.08rem;
  }
  p {
    display: flex;
    flex-direction: row;
    align-items: center;

    .van-checkbox {
      margin-right: 0.05rem;
    }

    i {
      padding-right: 0.1rem;
    }
  }
}

ol {
  display: flex;
  flex-direction: column;
  background: white;
  li {
    height: 0.44rem;
    border-bottom: 1px #f1f2f6 solid;
    display: flex;
    align-items: center;
    justify-content: space-around;
    s {
      text-decoration: none;
    }
    span {
      margin-left: -0.24rem;
    }
    input {
      width: 1.4rem;
      height: 0.5rem;
      // border: 1px solid red;
      margin-left: 0.1rem;
    }
  }
}

.xs {
  transition: all 0.8s;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.45rem;
  background-color: #d33;
  color: white;
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.45rem;
}
</style>