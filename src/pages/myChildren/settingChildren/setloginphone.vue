<!--  修改登录手机号  -->
<template>
  <div class="setloginphone">
    <headgoback title="修改登录手机号" goBackBoo="true"></headgoback>
    <div class="container">
      <div class="container_box">
        <div class="phone">
          <img src="../../../assets/image/telSelected.png" alt="">
          <span>当前手机号</span>
          <i>18349179063</i>
        </div>
        <div class="phone">
          <img :src='verify ? require("../../../assets/image/verifySelected.png") : require("../../../assets/image/verify.png")' alt="">
          <span>验证码</span>
          <input type="number" placeholder="请输入短信验证码" v-model="verify" maxlength="6">
          <p @click="sendcode()" v-if="style">获取验证码</p>
          <p class="p" v-else>{{number}}s重新发送</p>
        </div>
      </div>
      <div class="button" :class="highlight?'button':'button2'" @click="verifyCode">下一步</div>
    </div>
  </div>
</template>

<script>
import headgoback from '../../../commonComponents/headGoBack'
export default {
  components:{
    headgoback
  },
  data() {
    return {
      highlight: true,
      verify: '',
      number: 60,
      style: true
    }
  },
  watch: {
    //监听验证码框输入的数据,根据是否输入验证码来改变图标以及按钮的样式
    verify(val,oldVal) {
      if(val) {
        this.highlight = false;
      }else {
        this.highlight = true;
      }
    }
  },
  methods: {
    //给手机发送验证码/手机获取验证码
    sendcode(){
      this.style = !this.style
      let timer = setInterval(()=>{
        this.number --
        if(this.number == 0) {
            clearInterval(timer);
            timer = null;
            this.number = 60;
            this.style = true;
        }
      },1000)
      if(this.style == false) {
        let data = {
        phone: this.$store.state.loginUser.phone
        };
        this.$ajax.getcode(data).then(res=>{
          if(res.data.status.statusCode === 0) {
            console.log(res);
            this.$toast.success('验证码已发送,请注意查收');
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    //验证验证码
    verifyCode() {
      if(this.highlight == false) {
        let data = {
          phone: this.$store.state.loginUser.phone,
          code: 223433
        };
        this.$ajax.verifycode(data).then(res=>{
          if(res.data.status.statusCode == 0) {
            console.log(res);
            if(res.data.result == false) {
              this.$toast('此处接口暂无，敬请期待！！！');
            }else{
              this.$router.push('/')
            }
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
}

</script>
<style scoped lang="scss">
.setloginphone{
  .container{
    position: absolute;
    top: .43rem;
    bottom: 0;
    width: 100%;
    background: #f2f1f6;
    .container_box{
      margin-top: .065rem;
      box-sizing: border-box;
      padding: 0 .16rem;
      background: #fff;
      .phone{
        height: .445rem;
        position: relative;
        display: flex;
        align-items: center;
        &:nth-child(1)::after{
          height: 0;
        }
        &::after{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          background: #eee;
          transform: scaleY(.5);
        }
        img{
          width: .2rem;
          height: .2rem;
        }
        span{
          min-width: .9rem;
          margin-left: .08rem;
          font-size: .15rem;
        }
        i{
          margin-left: .08rem;
          font-size: .15rem;
        }
        input{
          height: 0.445rem;
          text-overflow: clip;
          overflow: hidden;
          white-space: nowrap;
          font-family:UICTFontTextStyleBody;
          margin-left: .08rem;
          flex:1;
          font-size: .15rem;
          background: transparent;
        }
        p{
          margin-right: .12rem;
          font-size: .14rem;
          color:#333;
          height: .445rem;
          line-height: .445rem;
        }
        .p{
          margin-right: .02rem;
          font-size: .14rem;
          color: #3e9cfa;
          height: .445rem;
          line-height: .445rem;
        }
      }
    }
    .button{
      background-color:#e99;
      color:#f4c2c2;
      width: 3.47rem;
      height: .44rem;
      margin:0 auto;
      margin-top: .4rem;
      border-radius: .04rem;
      display:flex;
      justify-content:center;
      align-items:center;
      color:#f4c2c2;
      font-size: .16rem;
      box-sizing:border-box;
    }
    .button2{
      background-color:#d33;
      color:#fff;
    }
  }
}
</style>