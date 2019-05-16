<!--  小方格商品搜索  -->
<!-- 分类也用 -->
<template>
    <div :class="{'goodSeeck':true,'goodSeeckHide': goodSeeckHideClass}">
        <headGoBack title='搜索' :goBackBoo='goBackBoo' path='/home'></headGoBack>
        <div class="undefinedBox"></div>
        <header>
            <router-link to='/inputSeeck' tag='div'>
                <img src="../assets/image/ic_search.png" alt="">
            </router-link>
        </header>
        <div class="goodsBox" v-if="pageBoo">
            <div class="tabs">
                <ul class='tabBox'>
                    <li v-for='(item,index) in tabsArr' :key='index' @click='tabChange(item.name)'
                    :class="activeIndex==index&&'activeClass'"
                    >
                        {{item.name}}
                        <div v-if='item.img' :class="item.className">
                            <img :src="item.img" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sorry" v-if="sorryBoo">
                <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//d80ae01f25bc40428d41a174dedd9fc3.o6zAJs40K6GJbyizSOz14zgmmCiA.j7VAdYIylCRBa75746f9c0d3bbdf2d3896c8b34de27d.png" alt="">
                <p>抱歉,没有搜索到相关商品</p>
            </div>
            <p class="sorryTitle" v-if="sorryBoo">-&nbsp;最近浏览&nbsp;-</p>
            <div class="content" v-for="item in goodSeeckData">
                <router-link tag='img' :to="{name:'commodityDetails',query:{'skuId':item.goodsId}}" :src="item.mainPic || item.picsUrl | picsUrl" alt=""/>
                <div>
                <router-link tag='p' :to="{name:'commodityDetails',query:{'skuId':item.goodsId}}">{{item.goodsName}}</router-link>
                <div>
                    <router-link  tag='div' :to="{name:'commodityDetails',query:{'skuId':item.goodsId}}">
                    <p>
                        <span>￥<span>{{item.orderPrice|addZero}}</span></span>
                        <span>1{{item.quantityUnit}}起批</span>
                    </p>
                    <p>{{item.dealerName}}</p>
                    </router-link>
                    <shoppingCar :goodsId = 'item.goodsId'></shoppingCar>
                </div>
                </div>
            </div>
            <div class="sidebarLeft" v-if='tabSidebarBoo' @click='clear'></div>
            <div class="sidebarRight" v-if='tabSidebarBoo'>
                <p @click='borderBoo=!borderBoo'
                :class="borderBoo?'title':'noBorderTitle'">仅显示有货</p>
                <p class="price">价格区间</p>
                <div class="seachInput">
                    <div><input type="number" 
                    placeholder="最低价" v-model='minNum'></div>
                    <div>—</div>
                    <div><input type="number" 
                    placeholder="最高价" v-model='maxNum'></div>
                </div>
                <div class="btnBox">
                    <div class="reset" @click='reset'>重置</div>
                    <div class="confirm" @click='confirm'>确定</div>
                </div>
            </div>
        </div>
        <div class="supplierBox" v-if="!pageBoo">
            <div class="tabs">
                <ul class='tabBox'>
                    <li v-for='(item,index) in supplierTabsArr' :key='index'
                    :class="activeIndex==index&&'activeClass'"
                    @click='supplierChange(index)'
                    >
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <div class="content" v-for="item in dealerData">
                <div class="title">
                    <p class="titleName">{{item.dealerName}}</p>
                    <div class="titleRight">
                        <router-link @click.native='toParent(item.dealerOrgId)' to='/parentSupplier' tag='div'>
                            <p>进入店铺</p>
                            <img src="../assets/image/ic_pointer.png" alt="">
                        </router-link>
                        <img @click='alertShowTel(item.dealerPhone)' src="../assets/image/dianpu.png" alt="">
                    </div>
                </div>
                <div class="contentBox">
                    <div class="contentActive">
                        <p>经营品牌：</p>
                        <div class="contentImg">
                            <div @click='toDetailsOfTheBrand(list,item)' v-for="(list,index) in item.brands" v-if='index<4'>
                                <div>
                                    <img :src="list.brandLogoUrl" alt="">
                                </div>
                                <p>{{list.brandName}}</p>
                            </div>
                        </div>
                    </div>
                    <router-link to='/parentSupplier/supplierBrand' class="rightArrow" v-if="item.brands.length>=4">
                        <img src="../assets/image/ic-next-left.png" alt="">
                    </router-link>
                    <p>
                        月成交额：<span>{{item.thirtyDaiesturnover}}</span>
                    </p>
                    <p>
                        月买家数：<span>{{item.thirtyDaiesBuyers}}</span>
                    </p>
                </div>
            </div>
        </div>
        <rotateNav></rotateNav>
    </div>
</template>
<script>
import headGoBack from '../commonComponents/headGoBack'
import Vue from 'vue'
import { Dialog } from 'vant';
Vue.use(Dialog)
export default {
    data() {
        return {
            goodSeeckHideClass: false,
            goBackBoo: true,
            activeIndex: 0,
            upImg: true,
            tabsArr: [
                {name: '默认',img: '',className:''},
                {name: '销量',img: '',className:''},
                {name: '价格',img: require('../assets/image/storeNav/ic_sort_defult.png'),className:'tabPrice'},
                {name: '筛选',img: require('../assets/image/ic_fil.png'),className:''},
            ],
            supplierTabsArr: [
                {name: '供应商'},
                {name: '人气'},
            ],
            tabSidebarBoo: false,
            obj: {
                brandId: this.$store.state.brandId,
                cityId: this.$store.state.getByUser.cityId,
                countyId: this.$store.state.getByUser.districtId,
                groupStoreId: this.$store.state.myUser.id,
                merchantId: this.$store.state.getByUser.merchantId,
                orderBy: "shelvesTime",
                orderWay: 1,
                pageNum: 1,
                pageSize: 10,
                provId: this.$store.state.getByUser.provinceId,
                stationId: this.$store.state.stationId,
                status: 1,
                stock: 1,
                storeId: this.$store.state.myUser.storeId,
                town: this.$store.state.getByUser.streetId,
                userId: this.$store.state.id,
            },
            goodSeeckData: '',
            borderBoo: true,
            minNum: '',
            maxNum: '',
            sorryBoo: false,
            pageBoo: true,
            dealerData: ''
        }
    },
    components: {
        headGoBack
    },
    methods: {
        getGoodSeeckData() {
            this.$ajax.getGoodSeeckData(this.obj).then(res=>{
                if(res.data.status.statusCode===0){
                    if(!res.data.result.goodses) {
                        this.sorryBoo = true
                        let data = {
                            dealerId: this.$store.state.getByUser.id,
                            groupStoreId: this.$store.state.myUser.storeId,
                            merchantId: this.$store.state.getByUser.merchantId,
                            pageNum:1,
                            pageSize:20,
                            shopId: this.$store.state.getByUser.id,
                            stationId: this.$store.state.stationId,
                            userId: this.$store.state.myUser.createUser
                        }
                        this.$ajax.getGoodsRecordByUserId(data).then(msg=>{
                            if(res.data.status.statusCode===0){
                                this.goodSeeckData = msg.data.result
                            }
                            console.log(msg)
                        })
                    }else{
                        this.goodSeeckData = res.data.result.goodses
                        this.sorryBoo = false
                    }
                }
            })
        },
        tabChange(name) {
            delete this.obj.brandName
            delete this.obj.goodsName
            this.obj.orderWay = 1
            this.tabsArr[2].img = require('../assets/image/storeNav/ic_sort_defult.png')  
            if(name=='默认'){
                this.activeIndex = 0
                this.obj.orderBy = "shelvesTime"
                this.getGoodSeeckData()
            }else if(name=='销量'){
                this.activeIndex = 1
                this.obj.orderBy = "salesVolume"
                this.getGoodSeeckData()
            }else if(name=='价格'){
                this.activeIndex = 2
                if(this.upImg) {
                    this.upImg = false
                    this.tabsArr[2].img = require('../assets/image/storeNav/ic_sort_up.png')   
                    this.obj.orderWay = 0
                }else{
                    this.upImg = true
                    this.tabsArr[2].img = require('../assets/image/storeNav/ic_sort_down.png') 
                    this.obj.orderWay = 1
                }
                this.obj.orderBy = "orderPrice"
                this.getGoodSeeckData()
            }else if(name='筛选'){
                this.activeIndex = 3
                this.tabSidebarBoo = true
                this.borderBoo = true
                this.goodSeeckHideClass = true
            }
        },
        clear() {
            this.activeIndex = 0
            this.tabSidebarBoo = false
            this.goodSeeckHideClass = false
        },
        confirm() {
            if(this.maxNum>=this.minNum){
                if(this.maxNum&&this.minNum){
                    this.obj.minPrice = this.minNum
                    this.obj.maxPrice = this.maxNum
                }else{
                    delete this.obj.minPrice
                    delete this.obj.maxPrice
                }
                this.getGoodSeeckData()
                this.tabSidebarBoo = false
                this.activeIndex = 0
            }else if(this.minNum>this.maxNum){
                this.$toast('输入的价格区间有误')
            }else if(!this.minNum && !this.maxNum){
                this.tabSidebarBoo = false
                this.activeIndex = 0
            }
        },
        reset() {
            this.minNum = ''
            this.maxNum = ''
        },
        supplierChange(index) {
            this.activeIndex = index
        },
        getDealerData() {
            let data = {
                orderBy: "thirtyDaiesturnover",
                pageNum: 1,
                pageSize: 10,
                stationId: this.$store.state.stationId
            }
            this.pageBoo = false
            this.$ajax.searchReleaseDealerList(data).then(res=>{
                console.log(res)
                if(res.data.status.statusCode===0){
                    this.dealerData = res.data.result.items
                }
            })
        },
        alertShowTel(phone) {
            Dialog.confirm({
                message: '拨打'+phone+'仅为模拟'
            })
        },
        toParent(id){
            this.$store.commit('setCustId',id)
        },
        //路由跳转带参数
        toDetailsOfTheBrand(list,item) {
            this.$router.push({
                    name: 'detailsOfTheBrand',
                    params: {
                        id: list.brandId, 
                        name: list.brandName,
                        dealerId: item.dealerId
                    }
                })
        }
    },
    created() {
        if(this.$store.state.goodsName&&this.$store.state.brandName){
            this.obj.goodsName = this.$store.state.goodsName
            this.obj.brandName = this.$store.state.brandName
            this.pageBoo = true
            this.getGoodSeeckData()
        }else if(this.$store.state.dealeName){
            this.obj.dealerName= this.$store.state.dealeName
            this.getDealerData()
        }else if(this.$store.state.saletype.secondSaletypeName){
            delete this.obj.brandId
            this.obj.saletype= this.$store.state.saletype
            this.getGoodSeeckData()
        }else{
            this.getGoodSeeckData()
        }
    },
    beforeDestroy() {
        this.$store.commit('deleteGoodsName')
    }
}
</script>
<style scoped lang="scss">
.goodSeeck{
    .undefinedBox{
        height: .84rem;
    }
    >header{
        background: linear-gradient(to right, #d33 0%,#F46839 100%);
        padding: .07rem .14rem;
        box-sizing: border-box;
        position: fixed;
        top: .43rem;
        left: 0;
        right: 0;
        z-index: 99;
        >div{
            width: 100%;
            border-radius: .14rem;
            background: #fff;
            display: flex;
            align-items: center;
            font-size: .24rem;
            height: .3rem;
            >img{
                width: .14rem;
                height: .14rem;
                margin-left: .1rem;
            }
        }
    }
    .goodsBox{
        .tabs{
            position: fixed;
            font-size: .14rem;
            top: .87rem;
            left: 0;
            right: 0;
            z-index: 99;
            background: #fff;
            .tabBox{
                padding: .13rem 0;
                text-align: center;
                display: grid;
                grid-template-columns: repeat(4,25%);
                >li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    >div{
                        margin-left: .05rem;
                        width: .12rem;
                        height: .12rem;
                        >img{
                            width: 100%;
                            height: 100%;
                        }  
                    }
                    .tabPrice{
                        width: .07rem;
                        height: .09rem;
                        line-height: .08rem;
                    }
                }
                .activeClass{
                    color: #d33;
                }
            }
        }
        .tabs::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #f2f1f6;
            transform: scaleY(0.5);
        }
        .sorry{
            background: #f2f1f6;
            padding: .3rem 0;
            text-align: center;
            >img{
                width: 1.34rem;
                height: .74rem;
            }
            >p{
                color: #666;
                margin-top: .3rem;
            }
        }
        .sorryTitle{
            position: relative;
            height: .4rem;
            font-size: 0.14rem;
            color: #666;
            text-align: center;
            line-height: .4rem;
        }
        .sorryTitle::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #f2f1f6;
            transform: scaleY(.5);
        }
        .content{
            padding: .13rem .14rem;
            background: #fff;
            box-sizing: border-box;
            position: relative;
            display: flex;
            justify-content: space-between;
            >img{
                width: 1rem;
                height: 1rem;
            }
            >div{
                width: 2.35rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                >p{
                font-size: .14rem;
                }
                >div{
                height: .36rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                >div{
                    >p:nth-child(1){
                    width: 1.06rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    >span:nth-child(1){
                        color:#d33;
                        font-size: .14rem;
                        >span{
                            font-size: .18rem;
                        }
                    }
                    >span:nth-child(2){
                        color:#ccc;
                    }
                    }
                    >p:nth-child(2){
                    margin-top: .1rem;
                    color:#ccc;
                    }
                }
                >img{
                    width: .16rem;
                    height: .16rem;
                }
                }
            }
        }
        .content::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #eee;
            transform: scaleY(.5);
        }
        .sidebarLeft,.sidebarRight{
            position: absolute;
            top: .43rem;
            bottom: 0;
            z-index: 99;
        }
        .sidebarLeft{
            opacity: 0.6;
            left: 0;
            right: 3.25rem;
            background: black;
        }
        .sidebarRight{
            left: .5rem;
            right: 0;
            background: #fff;
            padding: .15rem .14rem 0 .14rem;
            .title{
                color:#d33;
                border:1px solid #d33;
                width: 1.4rem;
                height: .32rem;
                line-height: .32rem;
                text-align: center;
                margin-bottom: .14rem;
            }
            .noBorderTitle{
                border: none;
                width: 1.4rem;
                height: .34rem;
                line-height: .34rem;
                text-align: center;
                margin-bottom: .14rem;
                background: #f8f8f8;
                padding-left: .01rem;
            }
            .price{
                font-size: .14rem;
                margin: .14rem 0;
            }
            .seachInput{
                display: grid;
                grid-template-columns: 1.3rem 1fr 1.3rem;
                grid-template-rows: .32rem;
                >div{
                    text-align: center;
                    line-height: .32rem;
                    >input{
                        height: .32rem;
                        background: #f8f8f8;
                        text-align: center;
                    }
                    >input::placeholder{
                        font-size: .12rem;
                    }
                }
            }
            .btnBox{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: .4rem;
                font-size: .16rem;
                >div{
                    text-align: center;
                    height: 100%;
                    line-height: .4rem;
                }
                >.reset{
                    background: #fff;
                    color: black;
                }
                >.confirm{
                    background: #d33;
                    color: #fff;
                }
            }
            .btnBox::after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: 1px;
                background: #ddd;
            }
        }
    }
    .supplierBox{
        background-color:#f2f1f6;
        .tabs{
            position: fixed;
            font-size: .14rem;
            top: .87rem;
            left: 0;
            right: 0;
            z-index: 99;
            background: #fff;
            .tabBox{
                padding: .13rem 0;
                text-align: center;
                display: grid;
                grid-template-columns: repeat(2,50%);
                >li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .activeClass{
                    color: #d33;
                }
            }
        }
        .tabs::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: #f2f1f6;
            transform: scaleY(0.5);
        }
        .content{
            background: #fff;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: .5rem 1.5rem;
            margin-bottom: .1rem;
            .title{
                position: relative;
                padding: .14rem .15rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .titleName{
                    font-size: .16rem;
                }
                .titleRight{
                    display: flex;
                    width: .86rem;
                    justify-content: space-between;
                    align-items: center;
                    >div{
                        width: .64rem;
                        height: .2rem;
                        background:#FF8668;
                        border-radius: .1rem;
                        color: #fff;
                        padding: .03rem;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        >p{
                            font-size: .12rem;
                        }
                        >img{
                            width: .05rem;
                            height: .05rem;
                            transform: rotateZ(90deg);
                        }
                    }
                    >img{
                        width: .16rem;
                        height: .16rem;
                    }
                }
            }
            .title::after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 1px;
                transform: scaleY(.5);
                background: #f2f1f6;
            }
            .contentBox{
                position: relative;
                .contentActive{
                    height: .77rem;
                    display: flex;
                    background: #fafafa;
                    align-items: center;
                    padding: .05rem .14rem;
                    color:  #666;
                    font-size: .14rem;
                    margin: .1rem 0;
                    >p{
                        font-size: .12rem;
                    }
                    .contentImg{
                        width: 2.5rem;
                        height: .77rem;
                        display: grid;
                        grid-template-columns: repeat(4,.51rem);
                        grid-template-rows: .72rem;
                        justify-content: space-between;
                        >div{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            >div{
                                height: .51rem;
                                border: 1px solid #ccc;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: #fff;
                                >img{
                                    width: .35rem;
                                }    
                            }
                            >p{
                                font-size: .12rem;
                                text-align: center;
                            }
                        }
                    }
                }
                .rightArrow{
                    position: absolute;
                    right: 3.5%;
                    top: 22%;
                    >img{
                        width: .16rem;
                        height: .16rem;
                    }
                }
                >p{
                    margin: .1rem 0;
                    padding-left: .14rem;
                }
            }
        }
    }
}
.goodSeeckHide{
    height: 6.67rem;
    overflow-y: hidden;
}
</style>