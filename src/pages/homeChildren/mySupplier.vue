<!--  我的供应商  -->
<template>
    <div>
        <commonTab title="我的供应商" :url='url'></commonTab>
        <div class="view-dealer-item">
            <div class="view-dealer-info" v-for="(item,index) in resault" :key="index">
                <div class="view-dealer-title">
                    <div class="view-dealer-name">
                        {{item.name}}
                    </div>
                    <div class="view-dealer-to">进入店铺</div>
                    <img src="./../../assets/image/ic_phone_white.png" @click="callUp(item.contactTel)" alt="" style="width: .16rem;height: .16rem;padding-left: .14rem;">
                </div>
                <div class="view-dealer-data" @click="skip(index)">
                    <div class="view-dealer-data-left">
                        <span>近30天采购金额(元)</span>
                        <span>{{item.saleMonthNum}}</span>
                    </div>
                    <div class="view-dealer-data-left">
                        <span>近一年采购金额(元)</span>
                        <span>{{item.saleYearNum}}</span>
                    </div>
                </div>
            </div>
        </div>
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
import {mapMutations} from 'vuex'
import commonTab from './mySupplierChildren/commonTab'
export default {
    data(){
        return {
            url: '/home',
            resault: '',
            show: true,
            hide: false,
            tel: '',
            custIds: [],
            dealerNames: [],
            ids: [],
        }
    },
    methods: {
        ...mapMutations(['setCustId']),
        get(){
            let state = this.$store.state;
            let data = {
                cityId: state.getByUser.cityId,
                districtId: state.getByUser.districtId,
                merchantId: state.getByUser.merchantId,
                provinceId: state.getByUser.provinceId,
                stationId: state.stationId,
                storeId: state.myUser.id,
                streetId: state.getByUser.streetId,
                userId: state.id
            }
           this.$ajax.mySupplier(data).then(res=>{
               this.resault = res.data.result;
               for(var i=0;i<this.resault.length;i++){
                   this.custIds.push(this.resault[i].custId);
                   this.dealerNames.push(this.resault[i].name);
                   this.ids.push(this.resault[i].id);
               }
           })
        },
        // 给供应商打电话
        callUp(tel){
            this.tel = tel;
            this.hide = true;
        },
        // 取消、确定
        confirm(){
            this.hide = false;
        },
        // 跳转至供应商 首页
        skip(index){
            let obj = {
                custId: this.custIds[index],
                dealerName: this.dealerNames[index],
                id: this.ids[index],
            }
            this.setCustId(obj);
            this.$router.push('/parentSupplier');
        },
    },
    mounted(){ 
        this.get();
    },
    components: {
        commonTab,
    }
}
</script>

<style scoped lang="scss">
.view-dealer-item {
    display: flex;
    flex-direction: column;
    position: relative;
    border-top: 1px solid hsl(0, 0%, 96%);
    .view-dealer-info{
        position: relative;
        margin: .12rem;
        height: 1rem;
        box-sizing: border-box;
        background: linear-gradient(90deg, #DD3333 0%, #F46839 100%);
        border-radius: .02rem;
        padding: .15rem;
        display: flex;
        flex-direction: column;
        color: #fff;
        justify-content: space-between;
        &:nth-child(1) {
            margin-top: .55rem;
        }
        .view-dealer-title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .view-dealer-name {
                font-size: .16rem;
                font-weight: 600;
                letter-spacing: 0.53px;
                width: 2.24rem;
                height: .18rem;
                line-height: .18rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .view-dealer-to{
                width: .52rem;
                height: .16rem;
                border: 1px solid #FFFFFF;
                border-radius: .08rem;
                font-size: .1rem;
                line-height: .16rem;
                text-align: center;
            }
        }
        .view-dealer-data {
            display: flex;
            justify-content: center;
            align-items: center;
            .view-dealer-data-left {
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
                &:nth-child(2){
                    margin-left: .3rem;
                }
            }
            :nth-child(1){
                opacity: 0.9;
                font-size: 12px;
                color: rgba(255,255,255,0.90);
            }
            :nth-child(2){
                font-size: 19px;
                margin-top:4px;
                color: rgba(255,255,255,0.90);
            }
        }
    }
}
.mengCeng {
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: .8;
    width: 100%;
    background: black;
}
.main {
        position: absolute;
        left: 50%;
        top: 50%;
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