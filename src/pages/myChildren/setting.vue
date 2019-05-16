<!-- 设置页 -->
<template>
    <div class="setting">
        <headGoBack title="设置" goBackBoo="true"></headGoBack>
        <div class="container">
            <div class="content">
                <div class="photo_name">
                    <div class="photo">
                        <p>头像</p>
                        <img src="../../assets/image/photo.png" alt="">
                    </div>
                    <router-link to="/setnickname" tag="div" class="name">
                        <span>昵称</span>
                        <p><i>{{loginUser.nickname}}</i><img src="../../assets/image/ic-next-left.png" alt=""></p>
                    </router-link>
                </div>
                <div class="alter">
                    <router-link to="/setloginphone" tag="div" class="alter_tel">
                        <span>修改登录手机号</span>
                        <p><i>{{loginUser.phone}}</i><img src="../../assets/image/ic-next-left.png" alt=""></p>
                    </router-link>
                    <router-link to="/setloginpassword" tag="div" class="alter_password">
                        <span>修改登录密码</span>
                        <img src="../../assets/image/ic-next-left.png" alt="">
                    </router-link>
                </div>
                <div class="service_tel" @click="hint()">
                    <span>客服电话</span>
                    <p>{{tel}}</p>
                </div>
            </div>
            <div class="button">
                <div class="exit" @click="exit()">退出登录</div>
            </div>
        </div>
        <router-view/>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import Vue from 'vue';
Vue.use(Dialog);
export default {
    data() {
        return {
            tel: '',
            loginUser: {
                phone: this.$store.state.loginUser.phone,
                nickname: this.$store.state.loginUser.nickname
            }
        }
    },
    mounted() {
        this.get_CallCenter();
        this.hide_phone();
    },
    methods: {
        //进入页面请求数据
        get_CallCenter() {
            this.$ajax.getCallCenter().then(res=>{
                console.log(res)
                this.tel = res.data.result
            }).catch(err=>{
                console.log(err)
            })
        },
        //退出登录按钮
        exit() {
            this.$store.commit('logOut')
            this.$router.push('/');
        },
        //正则——隐藏手机号第四位到第八位
        hide_phone() {
            let tel = this.$store.state.loginUser.phone;
            tel = "" + tel;
            let reg=/(\d{3})\d{4}(\d{4})/;
            let tel1 = tel.replace(reg, "$1****$2");
            this.loginUser.phone = tel1;
        },
        //客服电话提示信息
        hint() {
            function beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 500);
                } else {
                    done();
                }
            }
            Dialog.confirm({
                message: '拨打 ' + this.tel + '？ 【仅为模拟】',
                messageAlign: 'center',
                confirmButtonColor: 'green',
                beforeClose
            });
        }
    }
}
</script>
<style scoped lang="scss">
    .setting{
        .container{
            position: absolute;
            top: .43rem;
            bottom: 0;
            width: 100%;
            background: #f2f1f6;
            .content{
                .photo_name{
                    .photo{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        background: #fff;
                        padding: .135rem .14rem;
                        margin-top: .1rem;
                        position: relative;
                        &::after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background: #f2f1f6;
                            transform: scaleY(.5);
                        }
                        p{
                            font-size: .17rem;
                            color: #666;
                        }
                        img{
                            width: .32rem;
                            height: .32rem;
                            border: .5px solid #f2f1f6;
                            border-radius: 50%;
                        }
                    }
                    .name{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        background: #fff;
                        padding: .14rem;
                        position: relative;
                        &::after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background: #f2f1f6;
                            transform: scaleY(.5);
                        }
                        span{
                            font-size: .17rem;
                            color: #666;
                        }
                        p{
                            i{
                                font-size: .17rem;
                                margin-right:.1rem;
                                color:#333;
                            }
                            img{
                                width: .12rem;
                                height: .12rem;
                            }
                        }
                    }
                }
                .alter{
                    margin-top: .1rem;
                    .alter_tel{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        background: #fff;
                        padding: .14rem;
                        position: relative;
                        &::after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background: #f2f1f6;
                            transform: scaleY(.5);
                        }
                        span{
                            font-size: .17rem;
                            color: #666;
                        }
                        p{
                            i{
                                font-size: .17rem;
                                margin-right:.1rem;
                                color:#333;
                            }
                            img{
                                width: .12rem;
                                height: .12rem;
                            }
                        }
                    }
                    .alter_password{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        background: #fff;
                        padding: .14rem;
                        position: relative;
                        &::after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background: #f2f1f6;
                            transform: scaleY(.5);
                        }
                        span{
                            font-size: .17rem;
                            color: #666;
                        }
                        img{
                            width: .12rem;
                            height: .12rem;
                        }
                    }
                }
                .service_tel{
                    margin-top: .1rem;
                    font-size: .17rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    background: #fff;
                    padding: .14rem;
                    position: relative;
                    &::after{
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 1px;
                        background: #f2f1f6;
                        transform: scaleY(.5);
                    }
                    span{
                        color: #666;
                    }
                    p{
                        color:rgb(33,173,251);
                    }
                }
            }
            .button{
                margin-top:2rem;
                .exit{
                    width: 3.47rem;
                    height: .44rem;
                    margin: 0 auto;
                    background-color:#d33;
                    border-radius:.04rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    font-size: .16rem;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>