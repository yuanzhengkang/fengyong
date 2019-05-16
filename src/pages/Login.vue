<template>
    <div class = 'login'>
        <HeadGoBack :goBackBoo="goBackBoo" title="登录"></HeadGoBack>
        <div class = 'logo'>
            <img src="../assets/image/logo.png" alt="logo">
        </div>
        <div class = 'loginFrom'>
            <div class = "tel">
                <img :src="telImg" alt="手机号">
                <input type="text" 
                maxlength="11" 
                @focus="inputFocueTel=true"
                @blur='inputFocueTel=false'
                @input = 'telChange'
                ref = 'telInput'
                placeholder="手机号码">
                <img class="theArrow" @click='telOptionBoo=!telOptionBoo' src="../assets/image/theArrow.png" alt="">
                <img v-if="inputFocueTel" class="clear" @click='clearTel' src="../assets/image/clear.png" alt="">
                <ul class="telOption" v-show='telOptionBoo'>
                    <li v-for='item in this.$store.state.userInfo' @click='inputPushValue(item)'>
                        {{item.tel}}
                    </li>
                </ul>
            </div>
            <div class = "pas">
                <img :src="pasImg" alt="">
                <input :type="pasType" 
                @focus="inputFocuePas=true"
                @blur='inputFocuePas=false'
                @input = 'pasChange'
                ref = "pasInput"
                placeholder="请输入密码">
                <img :src="showPasImg" @click='showPas' :class="showClass" alt="">
                <img v-if="inputFocuePas" class="clear" @click='clearPas' src="../assets/image/clear.png" alt="">
            </div>
            <div class = "loginBtnBox">
                <div @click='loginToPath' :class="loginBtnClass">
                    登录
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadGoBack from '@/commonComponents/headGoBack'
import { Promise } from 'q';
export default {
    name: 'login',
    data() {
        return {
            goBackBoo: false,
            telImg: require('../assets/image/tel.png'),
            pasImg: require('../assets/image/pas.png'),
            loginBtnClass: 'loginBtn',
            tel: '',
            pas: '',
            //防抖boo
            antiShake: null,
            showPasImg: require('../assets/image/showPas.png'),
            showClass: 'hidePas',
            pasType: 'password',
            pasTypeBoo: false,
            telOptionBoo: false,
            inputFocueTel: false,
            inputFocuePas: false,
        }
    },
    components: {
        HeadGoBack
    },
    created() {
        if(this.$route.query.name) {
            this.$store.commit('setName',this.$route.query.name)
        }
    },
    methods: {
        //手机输入
        telChange(e) {
            if(!this.antiShake) {
                this.antiShake = setTimeout(()=>{
                    this.antiShake = null
                    let telreg = new RegExp(/^1[345678]\d{9}$/)
                    let telValue = e.target.value
                    if(telreg.test(telValue)){
                        this.telImg = require('../assets/image/telSelected.png')
                        this.tel = telValue
                    }else{
                        this.telImg = require('../assets/image/tel.png')
                        this.tel = ''
                    }
                },500) 
            }else {
                clearTimeout(this.antiShake)
                this.antiShake = null
            }
        },
        //密码输入
        pasChange(e) {
            if(!this.antiShake) {
                this.antiShake = setTimeout(()=>{
                    this.antiShake = null
                    let pasreg = /^[a-zA-Z0-9]{6,16}$/
                    let pasValue = e.target.value
                    if(pasreg.test(pasValue)){
                        this.pasImg = require('../assets/image/pasSelected.png')
                        this.pas = pasValue
                    }else{
                        this.pasImg = require('../assets/image/pas.png')
                        this.pas = ''
                    }
                },500) 
            }else {
                clearTimeout(this.antiShake)
                this.antiShake = null
            }
        },
        //显示隐藏密码
        showPas() {
            if(this.pas.length>8) {
                if(this.pasTypeBoo) {
                    this.pasType = 'password'
                    this.pasTypeBoo = false
                    this.showPasImg = require('../assets/image/showPas.png')
                    this.showClass = 'hidePas'
                }else{
                    this.pasType = 'text'
                    this.pasTypeBoo = true
                    this.showPasImg = require('../assets/image/showPasSelected.png')
                    this.showClass = 'showPas'
                }    
            }
            
        },
        //清空
        clearTel() {
            this.$refs.telInput.value = ''
            this.telImg = require('../assets/image/tel.png')
        },
        clearPas() {
            this.$refs.pasInput.value = ''
            this.pasImg = require('../assets/image/pas.png')
        },
        //跳转
        loginToPath() {
            if(this.loginBtnClass === "loginBtnSelected") {
                this.$ajax.login(this.tel,this.pas).then(res=>{
                    if(res.data.status.statusCode === 0) {
                        //登录成功以后设置id，token，保存手机号和密码
                        this.$ajax.homeData(res.data.result.id).then(msg=>{
                            this.$store.commit('setStationId',msg.siteid)
                        })
                        this.$store.commit('setLoginUser',res.data.result)
                        this.$store.commit('setToken',res.data.result.token)
                        this.$store.commit('setUserInfo',{tel:this.tel,pas:this.pas})
                        this.$store.commit('setId',res.data.result.id)
                        this.$store.commit('setLoginBoo',true)
                        this.$toast('登录成功')
                        this.getHomeData().then(res=>{
                            this.$router.push(this.$store.state.pathName)
                        })
                    }else{
                        this.$toast(res.data.status.statusReason)
                    }
                })
            }
        },
        //按钮
        btnSelected() {
            if(this.tel&&this.pas) {
                this.loginBtnClass = "loginBtnSelected"
            }else {
                this.loginBtnClass = "loginBtn"
            }    
        },
        inputPushValue(item) {
            this.$refs.telInput.value = item.tel
            this.$refs.pasInput.value = item.pas
            this.tel = item.tel
            this.telImg = require('../assets/image/telSelected.png')
            this.pas = item.pas
            this.pasImg = require('../assets/image/pasSelected.png')
            this.telOptionBoo = false
        },
        getHomeData() {
            if(this.$store.state.loginBoo) {
                return this.$ajax.homeData(this.$store.state.id).then(res=>{
                this.$store.commit('setStationId',res.siteid)
                if(res != '数据错误') {
                    this.$ajax.home(res).then(msg=>{
                    this.homeData = msg.data.result
                    this.$store.commit('setHomeData',msg.data.result)
                    Promise.resolve(res)
                    }) 
                }else {
                    //没登录请求
                    this.$ajax.home().then(res=>{
                    this.homeData = res.data.result
                    this.getShoppingData()
                        this.getRouter()
                    })  
                }
                })
            }else {
                //没登录请求
                this.$ajax.home().then(res=>{
                this.homeData = res.data.result
                this.getShoppingData()
                    this.getRouter()
                })  
            }
        },
    },
    watch: {
        tel() {
            this.btnSelected()
        },
        pas() {
            this.btnSelected()
        }
    }
}
</script>

<style scoped lang="scss">
.login{
    .logo{
        height: 1.98rem;
        display: flex;
        align-items: center;
        justify-content: center;
        >img{
            width: .7rem;
        }
    }
    .loginFrom{
        width: 100%;
        .clear{
            float: right;
            margin-right: .4rem;
        }
        .tel{
            width: 3.1rem;
            margin: 0 auto;
            margin-bottom: .21rem;
            position: relative;
            >img{
                width: .16rem;
                height: .16rem;
                vertical-align: middle;
            }
            >input{
                margin-left: .18rem;
                margin-bottom: .11rem;
            }
            .theArrow{
                float: right;
                margin-right: .1rem;
            }
            .telOption{
                position: absolute;
                left: 0;
                right: 0;
                top: .27rem;
                z-index: 99;
                height: 1.52rem;
                overflow-y: auto;
                background: #FFFFFF;
                padding-left: .3rem;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
                >li{
                    margin: .18rem 0;
                    font-size: .16rem;
                    color: #333333;
                }
            }
        }
        .tel::after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #CCCCCC;
        }
        .pas{
            width: 3.1rem;
            margin: 0 auto;
            position: relative;
            >img{
                width: .16rem;
                height: .16rem;
                vertical-align: middle;
            }
            >input{
                margin-left: .18rem;
                margin-bottom: .11rem;
            }
            .hidePas{
                width: .16rem;
                height: .06rem;
                float: right;
                margin-right: .1rem;
                margin-top: .05rem;
            }
            .showPas{
                float: right;
                margin-right: .1rem;
            }
        }
        .pas::after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #CCCCCC;
        }
        .loginBtnBox{
            .loginBtn{
                width: 3.11rem;
                height: .44rem;
                margin: 0 auto;
                margin-top: .29rem;
                background: rgb(221,51,51);
                border-radius: .04rem;
                opacity: 0.5;
                font-family: PingFangSC-Regular;
                font-size: .18rem;
                color: #FFFFFF;
                letter-spacing: .02rem;
                text-align: center;
                line-height: .44rem;
            }
            .loginBtnSelected{
                width: 3.11rem;
                height: .44rem;
                margin: 0 auto;
                margin-top: .29rem;
                background: rgb(221,51,51);
                border-radius: .04rem;
                font-family: PingFangSC-Regular;
                font-size: .18rem;
                color: #FFFFFF;
                letter-spacing: .02rem;
                text-align: center;
                line-height: .44rem;
            }
        }
    }
}
</style>
