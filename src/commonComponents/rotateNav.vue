<template>
  <div>
    <section class = "rotateNav">
            <div class = "navigationMain" v-if = "navigationShow" @click = "changeShow()">
                <img src="../assets/image/ic_tabs.png" alt="">
                <span>快速导航</span>
            </div>
            <div class = "navigationList" v-if = "!navigationShow" @click = "changeShow()">
                <div><img src="../assets/image/ic_clear_img.png" alt=""></div>
                <p @click = "goHome()"><img src="../assets/image/ic_tabsGrunp(5).png" alt=""><span class = "numParent" v-if = "false"><span class = "numChildren">2</span></span></p>
                <p @click = "goList()"><img src="../assets/image/ic_tabsGrunp(3).png" alt=""><span class = "numParent" v-if = "false"><span class = "numChildren">2</span></span></p>
                <p @click = "goShopping()"><img src="../assets/image/ic_tabsGrunp(4).png" alt=""><span class = "numParent" v-if = "goodsNum"><span class = "numChildren">{{goodsNum}}</span></span></p>
                <p @click = "goMy()"><img src="../assets/image/ic_tabsGrunp(6).png" alt=""><span class = "numParent" v-if = "false"><span class = "numChildren">2</span></span></p>
                <p @click = "goSmallShop()"><img src="../assets/image/ic_tabsGrunp(1).png" alt=""><span class = "numParent" v-if = "false"><span class = "numChildren">2</span></span></p>
            </div>
        </section>
  </div>
</template>

<script>
import { state, mapState } from 'vuex'
export default {
  data() {
    return{
      navigationShow: true,
    }
  },
  methods: {
    /**
     * 改变导航
     */
    changeShow() {
        this.navigationShow = !this.navigationShow
    },
    /**
     * home页
     */
    goHome() {
        this.$router.push("/home")
    },
    /**
     * 列表页
     */
    goList() {
        this.$router.push("/list")
    },
    /**
     * 购物车页
     */
    goShopping() {
        this.$router.push("/shopping")
    },
    /**
     * 我的页
     */
    goMy() {
        this.$router.push("/my")
    },
    /**
     * 我的小店页
     */
    goSmallShop() {
        this.$router.push("/minestore")
    },
  },
  computed: {
   ...mapState(['goodsNum']),
  },
}

</script>
<style scoped lang = "scss">
  .rotateNav{
        position: fixed;
        right: 0.22rem;
        bottom: 0.77rem;
        z-index: 999;
        .navigationMain{
            width: 0.45rem;
            height: 0.45rem;
            position: relative;
            transition: all 0.26s linear;
            img{
                width: 100%;
                height: 100%;
            }
            span{
                width: 0.3rem;
                color: #FFFFFF;
                font-size: 0.13rem;
                position: absolute;
                left: 50%;
                margin-left: -0.15rem;
                top: 50%;
                margin-top: -0.13rem;
            }
        }
        .navigationList{
            width: 1.6rem;
            height: 1.6rem;
            position: relative;
            // background: #8abdcc;
            // transition: all 0.5s linear;
            div{
                position: absolute;
                width: 0.4rem;
                height: 0.4rem;
                bottom: 0;
                right: 0;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            p{
                width: 0.35rem;
                height: 0.35rem;
                border-radius: 50%;
                background:rgba(3,3,3,0.40);
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                img{
                    width: 0.17rem;
                    height: 0.17rem;
                }
                .numParent{
                    position: relative;
                    .numChildren{
                        position: absolute;
                        top: -0.19rem;
                        right: -0.13rem;
                        width: 0.15rem;
                        height: 0.15rem;
                        color: #FFFFFF;
                        background:#d33;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
            p:nth-of-type(1){
                top: 0;
                right: -0.02rem;
            }
            p:nth-of-type(2){
                top: 0.14rem;
                left: 50%;
            }
            p:nth-of-type(3){
                top: 0.4rem;
                left: 25%;
            }
            p:nth-of-type(4){
                bottom: 0.44rem;
                left: 10%;
            }
            p:nth-of-type(5){
                bottom: -0.02rem;
                left: 1%;
            }
        }
    }
</style>