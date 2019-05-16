<!-- 商品 -->
<template>
    <div>
        <headGoBack goBackBoo="true" title='商品管理'></headGoBack>
        <div class="adminHeader">
            <div class="admin-left">
                <span :class="index == ink? 'index':''" v-for="(item,index) in lis" :key="index" @click="btn(index)">{{item}}</span>
            </div>
            <router-link to='/inputSeeck' tag='div' class="admin-right">
                <div>
                    <img src="./../../assets/image/ic_search.png" alt="">
                </div>
                <span>搜索商品</span>
            </router-link>
        </div>
        <div class="goodsList">
            <div class="goodsTop">
                <div class="top" @click="pullDown">
                    <span>98645849649197</span>
                    <img src="./../../assets/image/ic-down-arr.png" alt="">
                </div>
                <div class="list" v-show="pulldown">
                    <div class="top">
                        <span class="checked">98645849649197</span>
                        <img src="./../../assets/image/wChecked.png" alt="">
                    </div>
                </div>
                <div class="tabScreen">
                    <div class="swiper-tab">
                        <div :class="index == lnk? 'on':''" v-for="(item,index) in kis" :key="index" @click="btn1(index)">{{item}}</div>
                    </div>
                    <div class="screen" @click="filtrate">
                        <span>筛选</span>
                        <img src="./../../assets/image/ic-down-arr.png" alt="">
                    </div>
                </div>
            </div>
            <div class="swiper-box">
                <div class="swiper-item" v-for="(item,index) in goodslist" :key="index">
                    <img class="img" :src="item.goodsMasterMap" alt="">
                     <div class="left">
                        <div class="name">
                            <span>{{item.goodsName}}</span>
                        </div>
                        <div class="twoChild">
                            <span>{{item.specificationName}}</span>
                            <span>销量</span>
                            <span>{{item.isPlat}}{{item.measurementUnit}}</span>
                        </div>
                        <div class="thirdChild">
                            <div>  
                                <span class="price">未设置售卖价格</span>
                                <div class="include">
                                    <span class="one">赚</span>
                                    <span class="two">￥9.8</span>
                                </div>
                            </div>
                            <div class="option" >
                                <img src="./../../assets/image/drop.png" alt="" @click="unfold(index)">
                                <div class="installChild" v-show="index == inx">
                                    <img src="./../../assets/image/rectangle-top.png" alt="">
                                    <ul class="installChild-child">
                                        <li>
                                            <img src="./../../assets/image/wClassifyOn.png" alt="">
                                            <span>分类至</span>
                                        </li>
                                        <li>
                                            <img src="./../../assets/image/wTopStand.png" alt="">
                                            <span>上架</span>
                                        </li>
                                        <li>
                                            <img src="./../../assets/image/wSPUbtmStand.png" alt="">
                                            <span>SPU下架</span>
                                        </li>
                                        <li>
                                            <img src="./../../assets/image/wChangePrice.png" alt="">
                                            <span>改价</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shopNone" v-show="show">
                    <div>
                        <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//8aecbdf091c442449d596ad3ffca2c4f.o6zAJs40K6GJbyizSOz14zgmmCiA.aDVbCTsN3mUJ5ad2b7482351a4260fcd93f103dee234.png" alt="">
                        <span>抱歉！暂无售卖中商品</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="adminFooter">
            <div @click="popp">新增商品</div><div>分类管理</div><div>批量管理</div>
        </div>
        <div class="filter" v-show="hide">
            <div class="filter-child">
                <div class="scroll-div">
                    <div>
                        <span>服务</span>
                        <div>自营</div>
                    </div>
                    <div>
                        <span>分类</span>
                        <div class="list-child">
                            <div class="pitchOn">全部</div>
                            <img src="./.././../assets/image/wChecked.png" alt="">
                        </div>
                        <div class="list-child">
                            <div>未分类</div>
                        </div>
                    </div>
                </div>
                <div class="btm">
                    <div @click="confirm">重置</div>
                    <div @click="confirm">确定</div>
                </div>
            </div>
        </div>
        <div class="increased" v-show="hiow">
            <div class="pop-content">
                <div class="view-pop-one">手动新增</div>
                <div class="view-pop-two">
                    <img src="./../../assets/image/scan-code.png" alt="">扫码新增
                </div>
                <div class="view-pop-three" @click="ppop">
                    取消
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            lis: ['商品','货源'],
            ink: 0,
            pulldown: false,
            kis: ['售卖中','未上架'],
            lnk: 0,
            goodslist: [],
            show: true,
            hide: false,
            inx: 25,
            status: 1,
            hiow: false,
        };
    },
    methods: {
        //点击切换商品、货源
        btn(index){
            this.ink = index;
        },
        //点击切换售卖中、未上架
        btn1(index){
            this.lnk = index;
            if(this.lnk == 0){
                this.status = 1;
            }else{
                this.status = 0;
            }
            this.get();
        },
        //下拉 展开
        pullDown(){
            this.pulldown = !this.pulldown;
        },
        //初始化渲染数据
        get(){
            this.$ajax.queryList(this.status).then((res)=>{
                if(res.data.result){
                    this.show = false;
                }else{
                    this.show = true;
                }
                this.goodslist = res.data.result;
            });
        },
        //三个点
        unfold(index){
            if(this.inx == index){
                this.inx = 25;
            }else {
                this.inx = index;
            }
        },
        //筛选
        filtrate(){
            this.hide = true;
        },
        confirm(){
            this.hide = false;
        },
        popp(){
            this.hiow = true;
        },
        ppop(){
            this.hiow = false;
        }
    },
    mounted(){
        this.get();
    }
}
</script>
<style lang='scss' scoped>
.adminHeader {
    height: .6rem;
    padding: .15rem .14rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #d33 0%,#f36539 100%);
    .admin-left {
        width: 1.2rem;
        height: .3rem;
        display: flex;
        border-radius: .14rem;
        overflow: hidden;
        span {
            display: block;
            width: 50%;
            height: 100%;
            font-size: .16rem;
            background:#ca382e;
            color:#fff;
            text-align: center;
            line-height: .3rem;
        }
        .index {
            color:#D33;
            background:#fff;
        }
    }
    .admin-right {
        width: 2.17rem;
        height: .3rem;
        border-radius: .14rem;
        display: flex;
        align-items: center;
        background:#fff;
        div {
            padding-left: .1rem;
            padding-right: .12rem;
            box-sizing: border-box;
            img {
                width: .14rem;
                height: .14rem;
                display: block;
            }
        }
        span {
            font-size: .14rem;
            color:#CCC;
        }
    }
}
.goodsList {
    width:100%;
    position: relative;
    padding-top: .88rem;
    box-sizing: border-box;
    .goodsTop {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        .top {
            height: .44rem;
            padding:0 .15rem 0 .15rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #F2F1F6;
            background:#fff;
            span {
                display: block;
                font-size: .14rem;
                color:#030303;
                padding-right: .11rem;
                box-sizing: border-box;
            }
            img {
                width: .1rem;
                height: .1rem;
                display: block;
            }
        }
        .list {
            width: 100%;
            background:rgba(0, 0, 0, 0.7);
            position: absolute;
            top: .44rem;
            left: 0;
            height: 4.9rem;
            .top {
                height: .44rem;
                display: flex;
                align-items: center;
                border-bottom: 1px #F2F1F6 solid;
                background:#fff;
                justify-content: space-between;
                span {
                    display: block;
                    font-size: .14rem;
                    padding-right: .11rem;
                    box-sizing: border-box;
                    color: #d33;
                }
                img {
                    width: .14rem;
                    height: .1rem;
                }
            }
        }
        .tabScreen {
            width:100%;
            height: .44rem;
            background:#fff;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #F2F1F6;
            .swiper-tab {
                width: 2.875rem;
                height: .44rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                div {
                    height: .44rem;
                    line-height: .44rem;
                    font-size: .14rem;
                    display: inline-block;
                    color:#333;
                    box-sizing: border-box;
                }
                .on {
                    color:#D33;
                    border-bottom:2px solid #D33;
                }
            }
            .screen {
                width: .875rem;
                height: .3rem;
                border-left: 1px #F2F1F6 solid;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    font-size: .14rem;
                    color:#333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    padding-right: .11rem;
                    box-sizing: border-box;
                }
                img {
                    width: .1rem;
                    height: .1rem;
                    display: block;
                }
            }
        }
    }
    .swiper-box {
        width: 100%;
        overflow: scroll;
        height: 4.46rem;
        box-sizing: border-box;
        .swiper-item {
            width: 100%;
            height: 1.25rem;
            padding: .15rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background:#fff;
            border-bottom:1px solid #f2f1f6;
            .img {
                width: 1rem;
                height: 1rem;
                display: block;
            }
            .left {
                width: 2.32rem;
                height: 1rem;
                display: flex;
                flex-direction: column;
                .name {
                    position:relative;
                    span {
                        font-size: .14rem;
                        color:#333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        line-height: .17rem;
                    }
                }
                .twoChild {
                    padding-top: 3px;
                    box-sizing:border-box;
                    span {
                        font-size: .11rem;
                        color:#666;
                    }
                    :nth-child(1) {
                        padding-right: .15rem;
                    }
                }
                .thirdChild {
                    width: 100%;
                    height: .35rem;
                    display: flex;
                    justify-content:s pace-between;
                    align-items: center;
                    box-sizing: border-box;
                    padding-top: 0px;
                    div {
                        display: flex;
                        align-items: center;
                        .price {
                            display: block;
                            font-size: .12rem;
                            color:#D33;
                            padding-right: .11rem;
                        }
                        .include {
                            display:flex;
                            align-items:center;
                            border:1px solid #d33;
                            border-radius: 2px;
                            .one { 
                                background:#d33;
                                color:#fff;
                                font-size: .09rem;
                                width: .11rem;
                                height: .11rem;
                                display: block;
                                text-align: center;
                                line-height: .11rem;
                            }
                            .two {
                                font-size: .1rem;
                                line-height: .11rem;
                                padding:0 3px;
                                color:#d33;
                                box-sizing: border-box;
                            }
                        }
                    }
                    .option {
                        width: .15rem;
                        padding: .1rem .15rem;
                        position: relative;
                        left: .5rem;
                        >img {
                            width: 100%;
                            display: block;
                            height: .15rem;
                        }
                        .installChild {
                            width: 2rem;
                            height: .49rem;
                            position: absolute;
                            left: -1.72rem;
                            top: .2rem;
                            z-index: 2;
                            >img {
                                width: 100%;
                                height: 100%;
                            }
                            .installChild-child {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                justify-content: space-between;
                                position: absolute;
                                left: 0;
                                top: 0;
                                li {
                                    width: 25%;
                                    height: 100%;
                                    display:flex;
                                    padding-top: .12rem;
                                    box-sizing:border-box;
                                    flex-direction:column;
                                    align-items:center;
                                    img {
                                        width: .12rem;
                                        height: .12rem;
                                        display: block;
                                    }
                                    span {
                                        font-size: .1rem;
                                        color:#fff;
                                        padding-top: .03rem;
                                        box-sizing: border-box;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .shopNone {
            width: 100%;
            height: 100%;
            background: #F2F1F6;
            padding-top: .61rem;
            box-sizing: border-box;
            div {
                display:flex;
                flex-direction:column;
                align-items:center;
                img {
                    width: 1rem;
                    height: 1rem;
                    display: block;
                } 
                span {
                    padding-top: .2rem;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: .14rem;
                    color:#999;
                }
            }
        }
    }
}
.adminFooter {
    width: 2.56rem;
    height: .4rem;
    background:rgba(0, 0, 0, 0.7);
    border-radius: .25rem;
    display: flex;
    position: fixed;
    left: .6rem;
    bottom: .15rem;
    z-index: 0;
    box-shadow: 0 2px 4px 0 #999;
    div {
        width: 33.3%;
        height: .4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;
        font-size: .14rem;
    }
}
.filter {
    width: 100%;
    height: 100%;
    margin-top: .42rem;
    background:rgba(0, 0, 0, 0.7);
    border-top: 1px solid #CCC;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    display: flex;
    justify-content: flex-end;
    .filter-child {
        width: 3.35rem;
        height: 100%;
        background:#fff;
        position: relative;
        .scroll-div {
            width: 100%;
            position: absolute;
            top: 0;
            bottom: .4rem;
            >div {
                span {
                    font-size: .16rem;
                    color:#666;
                    display: block;
                    padding: .25rem 0 .14rem .15rem;
                    box-sizing: border-box;
                }
                >div {
                    width: .65rem;
                    height: .32rem;
                    border: 1px solid #CCC;
                    font-size: .14rem;
                    color:#666;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: .15rem;
                    box-sizing: border-box;
                    position: relative;
                }
                .list-child {
                    width: 100%;
                    height: .44rem;
                    margin-left: 0;
                    display: flex;
                    border:1px solid #f2f1f6;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    div {
                        height: .44rem;
                        line-height: .44rem;
                        font-size: .14rem;
                        color:#333;
                        padding-left: .15rem;
                        box-sizing: border-box;
                    }
                    .pitchOn {
                        color:#D33;
                    }
                    img {
                        width: .14rem;
                        height: .1rem;
                        display: block;
                        margin-right: .15rem;
                    }
                }
            }
        }
        .btm {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: .4rem;
            background:#fff;
            display: flex;
            div {
                width: 50%;
                height: .4rem;
                font-size: .18rem;
                color:#333;
                border-top: 1px solid #f2f1f6;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            :nth-child(2){
                background:#D33;
                color:#fff;
            }
        }
    }
}
.increased {
    width: 100%;
    height: 100%;
    margin-top: .42rem;
    background: #7F7F7F;
    opacity: .9;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    display: flex;
    justify-content: flex-end;
    .pop-content {
        width: 90%;
        height: 1.735rem;
        margin: 0 auto;
        margin-top: 4.35rem;
        font-size: .19rem;
        color:#333;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: .55rem;
            background-color:#fff;
        }
        .view-pop-one {
            border-top-left-radius: .1rem;
            border-top-right-radius: .1rem;
        }
        .view-pop-two {
            position: relative;
            border-bottom-left-radius: .1rem;
            border-bottom-right-radius: .1rem;
            img {
                position: absolute;
                top: .2rem;
                left: 32%;
                width: .16rem;
                height: .16rem;
            }
        }
        .view-pop-three {
            color:#d33;
            margin-top: .08rem;
            border-radius: .1rem;
        }
    }
}
</style>