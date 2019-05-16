<template>
    <div>
        <commonTab :title="this.$store.state.dealerName" :url='url'></commonTab>
        <van-tabs style="width: 100%; position: absolute; top: .45rem; bottom: 0;" title-active-color='#d33' :line-width="57" :line-height="2" title-inactive-color='#333'>
            <van-tab title="基本信息">
                <div class="bas">
                    <div class="basic">
                        <span>{{item.custName}}</span>
                        <div>
                            <span>收藏人数：</span>
                            <span v-if="item.businessInfo">{{item.businessInfo.status}}人</span>
                        </div>
                        <div>
                            <span>业务类型：</span>
                            <span>{{item.businessType}}</span>
                        </div>
                        <div>
                            <span>渠道类型：</span>
                            <span>{{item.channelTypeDesc}}</span>
                        </div>
                        <div>
                            <span>经营品牌：</span>
                            <span>{{item.brandsType}}</span>
                        </div>
                    </div>
                    <div class="basic">
                        <div>
                            <span>联系人：</span>
                            <span>{{item.contactsName}}</span>
                        </div>
                        <div>
                            <span>所属地区：</span>
                            <span>中国</span>
                        </div>
                    </div>
                    <div class="phone" @click="callUp">
                        <img src="./../../../assets/image/ic_my_phone.png" alt="">
                        <span>联系电话</span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="工商信息" v-if="item.businessInfo">
                <div class="bas">
                    <div class="basic">
                        <div>
                            <span>企业资质：</span>
                            <span class="attestation">已认证</span>
                        </div>
                        <div>
                            <span>注册号：</span>
                            <span>{{item.businessInfo.regCode}}</span>
                        </div>
                        <div>
                            <span>成立时间：</span>
                            <span>{{date}}</span>
                        </div>
                        <div>
                            <span>注册资本：</span>
                            <span>{{item.businessInfo.regCapital}}</span>
                        </div>
                        <div>
                            <span>注册地址：</span>
                            <span>{{item.businessInfo.regAddress}}</span>
                        </div>
                        <div>
                            <span>经营范围：</span>
                            <span>{{item.businessInfo.scope}}</span>
                        </div>
                        <div>
                            <span>企业类型：</span>
                            <span>{{item.businessInfo.companyType}}</span>
                        </div>
                        <div>
                            <span>邮箱：</span>
                            <span>{{item.businessInfo.email}}</span>
                        </div>
                    </div>
                    <div class="phone" @click="callUp">
                        <img src="./../../../assets/image/ic_my_phone.png" alt="">
                        <span>联系电话</span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <!-- 自定义蒙层 -->
        <div class="mengCeng" v-show="hide"></div>
        <div class="main" v-show="hide">
            <div class="main-top">拨打 {{tel}}? 【仅为模拟】</div>
            <div class="main-bottom">
                <div class="main-bottom-left" @click="confirm">取消</div>
                <div class="main-bottom-right" @click="confirm">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import commonTab from './commonTab.vue'
import Vue from 'vue'
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
export default {
    data(){
        return {
            url: '/parentSupplier',
            item: '',
            date: '',
            hide: false,
            tel: '',
        }
    },
    methods: {
        get(){
            let state = this.$store.state;
            this.$ajax.getDealerFileInfoById(state.dealeNameId,state.id).then(res=>{
                this.item = res.data.result;
                this.date = new Date(this.item.businessInfo.regDate).toLocaleString();
                this.tel = res.data.result.phone;
            })
        },
        // 给供应商打电话
        callUp(){
            this.hide = true;
        },
        // 取消、确定
        confirm(){
            this.hide = false;
        },
    },
    mounted() {
        this.get();
    },
    components: {
        commonTab,
    }
}
</script>

<style scoped lang="scss">
.bas {
    height: 5.77rem;
    background: #F2F1F6;
}
.basic {
    width: 100%;
    background:#fff;
    margin-bottom: .11rem;
    padding: .15rem;
    box-sizing: border-box;
    span {
        font-size: .14rem;
        color:#333;
    }
    div {
        margin: 0;
        padding: .075rem 0;
        box-sizing: border-box;
        span {
            color:#666;
            display: inline-block;
            vertical-align: top;
        }
        :nth-child(2) {
            max-width: 2.7rem;
        }
        .attestation {
            font-size: .12rem;
            color:#fff;
            background:#fbb999;
            padding: .03rem;
            box-sizing: border-box;
        }
    }
} 
.phone {
    width: 100%;
    height: .44rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    img {
        width: .16rem;
        height: .16rem;
    }
    span {
        font-size: .14rem;
        color: #333;
        padding-left: .1rem;
    }
}
.mengCeng {
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: .8;
    z-index: 100;
    width: 100%;
    background: black;
}
.main {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 100;
        transform: translate(-50%,-50%);
        border-radius: .05rem;
        width: 70%;
        height: 1rem;
        background: #fff;
        .main-top {
            width: 100%;
            height: 50%;
            text-align: center;
            line-height: .5rem;
            color: #A2A2A2;
            font-size: .15rem;
        }
        .main-bottom {
            width: 100%;
            height: 50%;
            border-top: 1px solid #ccc;
            line-height: .5rem;
            text-align: center;
            font-size: .2rem;
            display: flex;
            .main-bottom-left {
                height: 100%;
                width: 50%;
                border-right: 1px solid #ccc;
            }
            .main-bottom-right {
                height: 100%;
                width: 50%;
                color: #3CC51F;
            }
        }
    }

</style>
