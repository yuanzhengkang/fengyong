<!--  修改昵称  -->
<template>
  <div class="setnickname">
    <headgoback title="修改昵称" goBackBoo="true"></headgoback>
    <div class="container">
      <div class="container_box">
        <input type="text" v-model="nickname" maxlength="20" placeholder="请输入2-20字符" @input="getvalue($event)">
      </div>
      <div class="button" :class="active_color?'button2':''" @click="save_amend()">完成</div>
    </div>
  </div>
</template>

<script>
import headgoback from '../../../commonComponents/headGoBack'
export default {
  components:{
    headgoback
  },
  data () {
    return {
      active_color: false,//控制确认按钮的颜色改变
      nickname: '',
      new_nickname: ''
    }
  },
  created () {
    this.nickname = this.$store.state.loginUser.nickname;
  },
  methods: {
    //过滤且判断要改的新昵称
    getvalue(e) {
      this.new_nickname = e.target.value;
      if(e.target.value.length != 0 && e.target.value.length >= 2 && e.target.value != this.$store.state.loginUser.nickname) {
        this.active_color = true;
      }else{
        this.active_color = false;
      }
    },
    //点击完成，高亮完成按钮，并返回 我的->设置 页，且全局改变为改变后的新昵称
    save_amend() {
      if(this.active_color == true) {
        let data = {
          nickName: this.new_nickname,
          userId: this.$store.state.id
        };
        this.$ajax.setnickUpdate(data).then(res=>{
          this.$store.commit('setnewNickName',res.data.result.nickname)
          if(res.data.status.statusCode === 0 && this.$store.state.loginUser.nickname == res.data.result.nickname){
            this.$toast('修改成功');
            this.$router.push('/setting');
          }
        }).catch(err=>{
          console.log(err)
        })
        
      }
    }
  }
}

</script>
<style scoped lang="scss">
.setnickname{
  .container{
    position: absolute;
    top: .43rem;
    bottom: 0;
    width: 100%;
    background: #f2f1f6;
    .container_box{
      margin-top: .075rem;
      padding:0 .16rem;
      background: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      input{
        text-indent: .1rem;
        flex: 1;
        font-size: .15rem;
        height: .44rem;
      }
    }
    .button{
      width: 3.47rem;
      height: .44rem;
      background: #e99;
      color: #f4c2c2;
      margin: .4rem auto;
      border-radius: .04rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .16rem;
    }
    .button2{
      background: #d33;
      color: #fff;
    }
  }
}
</style>