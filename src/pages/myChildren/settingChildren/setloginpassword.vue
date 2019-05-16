<!--  修改登录手机号  -->
<template>
  <div class="setloginphone">
    <headgoback title="修改登录密码" goBackBoo="true"></headgoback>
    <div class="container">
      <div class="container_box">
        <div class="phone">
          <span>当前密码</span>
          <input type="text" maxlength="15" placeholder="请输入当前账号登录密码" v-model="oldpassword">
        </div>
        <div class="phone">
          <span>设置新密码</span>
          <input :type="boo?'password':'text'" maxlength="15" placeholder="6-15位数字、字母组合" v-model="newpassword">
          <img :src="boo?require('../../../assets/image/ic_eye_close.png'):require('../../../assets/image/ic_eye_open.png')" alt="" @click="active()">
        </div>
      </div>
      <div class="button" :class="highlight?'button':'button2'" @click="submit()">完成</div>
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
      verify: '',
      highlight: true,
      boo: true,
      oldpassword: '',
      newpassword: ''
    }
  },
  watch:{
    //监听数据
    oldpassword(val) {
      console.log(val)
      this.setButtonStyle()
    },
    newpassword(val) {
      console.log(val)
      this.setButtonStyle()
    }
  },
  methods: {
    //点击眼睛更改图片样式以及input的类型
    active() {
      this.boo = !this.boo
    },
    //点击完成按钮,发送ajax请求
    submit() {
      // if(this.highlight = false) {
        let data = {
          loginName: this.$store.state.loginUser.phone,
          oldPassword: this.oldpassword,
          newPassword: this.newpassword
        };
        this.$ajax.verifypassword(data).then(res=>{
          if(res.data.status.statuscode != 0) {
            this.$toast('错误:'+res.data.status.statusReason)
          }
        }).catch(err=>{
          console.log(err)
        })
      // }
    },
    //设置提交按钮的高亮
    setButtonStyle() {
      if(this.oldpassword.length>=6 && this.newpassword.length>=6){
        this.highlight = false
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
          width: .17rem;
          height: .17rem;
        }
        span{
          min-width: .9rem;
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