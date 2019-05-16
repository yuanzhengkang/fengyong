<!-- 对账单 -->
<template>
    <div class='bill'>
        <headGoBack goBackBoo="true" title='对账单'></headGoBack>
        <div class="tabs">
            <ul class='tabBox'>
                <li v-for='(item,index) in billTabsArr' :key='index'
                :class="activeIndex==index&&'activeClass'"
                @click='billChange(index)'
                >
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="undefined"></div>
        <div v-if="filtrateBoo" class="billFiltrate">
            <p @click='selected1=true;selected2=false' :class='selected1&&"selected"'>日账单</p>
            <p @click='selected1=false;selected2=true' :class='selected2&&"selected"'>月账单</p>
        </div>
        <div class="details">
            <p v-if="!selected2">今日</p>
            <p v-if="selected2">当月</p>
            <div @click='billImgChange'>
                <p>筛选</p>
                <img :class="(imgBoo || billFiltrateBoo)&&'imgTop'" src="../../assets/image/ic-next-left.png" alt="">
            </div>
        </div>
        <div v-if="!imgBoo&&!billFiltrateBoo" class="sorry">
            <img src="http://b2bbucket-1254060329.picbj.myqcloud.com//8aecbdf091c442449d596ad3ffca2c4f.o6zAJs40K6GJbyizSOz14zgmmCiA.aDVbCTsN3mUJ5ad2b7482351a4260fcd93f103dee234.png" alt="">
            <p>没有找到相关记录</p>
        </div>
        <div v-if="imgBoo" class="filtrate">
            <p>
                订单号
            </p>
            <input type="text" placeholder="请输入订单号">
            <p>
                起止时间
            </p>
            <div class="time">
                <p @click="onSelect">{{startTime}}</p>
                <p class="line">-</p>
                <p @click="onSelect2">{{endTime}}</p>
                <van-actionsheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
                >
                    <van-datetime-picker
                    type="date"
                    @confirm='onConfirm'
                    @cancel='onCancel'
                    :min-date="minDate"
                    />
                </van-actionsheet>
                <van-actionsheet
                v-model="show2"
                :actions="actions"
                @select="onSelect2"
                >
                    <van-datetime-picker
                    type="date"
                    @confirm='onConfirm2'
                    @cancel='onCancel2'
                    :min-date="minDate"
                    />
                </van-actionsheet>
            </div>
            <p>
                类型
            </p>
            <div class="order">
                <p @click='clickAll'>全部<img v-if="pImgBoo" src="../../assets/image/autotrophy.png" alt=""></p>
                <p @click='clickPimg1'>订单入账<img v-if="pImgBoo1" src="../../assets/image/autotrophy.png" alt=""></p>
                <p @click='clickPimg2'>交易抽佣<img v-if="pImgBoo2" src="../../assets/image/autotrophy.png" alt=""></p>
            </div>
            <p class="select">
                选择门店
            </p>
            <div @click='allClick' class="all">
                全部
                <img v-if="door" src="../../assets/image/ic_hook.png" alt="">
            </div>
            <div @click='doorClick' class="store">
                {{this.$store.state.myUser.storeName}}
                <img v-if="!door" src="../../assets/image/ic_hook.png" alt="">
            </div>
            <div class="btnBottom">
                <p @click='clear'>清空</p>
                <p @click='imgBoo=false'>确定</p>
            </div>
        </div>
        <div v-if='billFiltrateBoo' class="billSummary">
            <p>
                起止时间
            </p>
            <div class="time">
                <p @click="onSelect">{{startTime}}</p>
                <p class="line">-</p>
                <p @click="onSelect2">{{endTime}}</p>
                <van-actionsheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
                >
                    <van-datetime-picker
                    type="date"
                    @confirm='onConfirm'
                    @cancel='onCancel'
                    :min-date="minDate"
                    />
                </van-actionsheet>
                <van-actionsheet
                v-model="show2"
                :actions="actions"
                @select="onSelect2"
                >
                    <van-datetime-picker
                    type="date"
                    @confirm='onConfirm2'
                    @cancel='onCancel2'
                    :min-date="minDate"
                    />
                </van-actionsheet>
            </div>
            <p>
                选择门店
            </p>
            <div @click='allClick' class="all">
                全部
                <img v-if="door" src="../../assets/image/ic_hook.png" alt="">
            </div>
            <div @click='doorClick' class="store">
                {{this.$store.state.myUser.storeName}}
                <img v-if="!door" src="../../assets/image/ic_hook.png" alt="">
            </div>
            <div class="btnBottom">
                <p @click='clear'>清空</p>
                <p @click='imgBoo=false;billFiltrateBoo=false'>确定</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            billTabsArr: [
                {name: '账单明细'},
                {name: '账单汇总'},
            ],
            activeIndex: 0,
            imgBoo: false,
            //  👇插件数据
            minDate: new Date(2000, 1 , 1),
            maxDate: new Date(2019, 10, 1),
            show: false,
            show2: false,
            actions: [
                {
                name: '选项'
                },
            ],
            // 👆
            startBoo: false,
            endBoo: false,
            startTime: '开始时间',
            endTime: '结束时间',
            pImgBoo: true,
            pImgBoo1: true,
            pImgBoo2: true,
            door: true,
            billFiltrateBoo: false,
            filtrateBoo: false,
            selected1: true,
            selected2: false,
        };
    },
    methods: {
        billChange(index) {
            this.activeIndex = index
            this.clear()
            if(index != 0){
                this.imgBoo = false
                this.filtrateBoo = true
            }else if(index == 0){
                this.filtrateBoo = false
            }
        },
        billImgChange() {
            if(this.activeIndex===0){
                this.imgBoo = !this.imgBoo
            }else{
                this.billFiltrateBoo = !this.billFiltrateBoo
            }
        },
        onSelect(item) {
            this.show = !this.show;
        },
        onSelect2(item) {
            this.show2 = !this.show2;
        },
        onConfirm(item) {
            this.show = false
            let time = item.format("yyyy-MM-dd");
            this.startTime = time
        },
        onCancel() {
            this.show = false
        },
        onConfirm2(item) {
            this.show2 = false
            let time = item.format("yyyy-MM-dd");
            this.startTime = time
        },
        onCancel2() {
            this.show2 = false
        },
        onConfirm2(item) {
            this.show2 = false
            let time = item.format("yyyy-MM-dd");
            this.endTime = time
        },
        onCancel2() {
            this.show2 = false
        },
        clickAll() {
            if(this.pImgBoo){
                this.pImgBoo = false
                this.pImgBoo1 = false
                this.pImgBoo2 = false 
            }else{
                this.pImgBoo = true
                this.pImgBoo1 = true
                this.pImgBoo2 = true 
            }
        },
        clickPimg1() {
            this.pImgBoo1 = !this.pImgBoo1
            if(this.pImgBoo1&&this.pImgBoo2){
                this.pImgBoo = true
            }else{
                this.pImgBoo = false
            }
        },
        clickPimg2() {
            this.pImgBoo2 = !this.pImgBoo2
            if(this.pImgBoo1&&this.pImgBoo2){
                this.pImgBoo = true
            }else{
                this.pImgBoo = false
            }
        },
        allClick() {
            this.door = true
        },
        doorClick() {
            this.door = false
        },
        clear(){
            this.startBoo= false
            this.endBoo= false
            this.startTime= '开始时间'
            this.endTime= '结束时间'
            this.pImgBoo= true
            this.pImgBoo1= true
            this.pImgBoo2= true
            this.door= true
        }
    }
}
</script>
<style lang='scss' scoped>
.bill{
    height: 6.67rem;
    overflow: hidden;
    .tabs{
        position: fixed;
        font-size: .14rem;
        top: .43rem;
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
    .undefined{
        height: .4rem;
    }
    .details{
        padding: 0 .15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:#f8f8f8;
        height: .44rem;
        font-size: .14rem;
        >div{
            width: .44rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            >img{
                width: .09rem;
                height: .09rem;
                transform: rotateZ(90deg);
                transition: all .5s;
            }
            >.imgTop{
                transform: rotateZ(270deg);
            }
        }
    }
    .sorry{
        height: 4.6rem;
        background: #f2f1f6;
        display: grid;
        grid-template-columns: 1rem;
        grid-template-rows: 1rem auto;
        justify-content: center;
        padding-top: .8rem;
        >img{
            width: 1rem;
            height: 1rem;
        }
        >p{
            color:#999;
        }
    }
    .filtrate{
        height: 4.6rem;
        background: #fff;
        padding: .2rem .15rem 0 .15rem;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: .16rem .27rem .16rem .34rem .16rem .31rem .31rem .44rem .44rem;
        grid-row-gap: .16rem;
        >p{
            color: #666;
            font-size: .13rem;
            display: flex;
            align-items: center;
        }
        >input,.all,.store{
            height: 100%;
            border-bottom: 1px solid #f2f1f6;
        }
        >.time{
            display: flex;
            justify-content: space-around;
            border: 1px solid #ccc;
            border-radius: .03rem;
            font-size: .15rem;
            color: #999;
            >p{
                width: .84rem;
                text-align: center;
                line-height: .34rem;
            }
            .line{
                width: .07rem;
            }
        }
        .all,.store{
            font-size: .15rem;
            line-height: .44rem;
            >img{
                width: .17rem;
                height: .17rem;
            }
        }
        .all{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f2f1f6;
        }
        .store{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: -15px;
        }
        .order{
            display: flex;
            >p{
                width: .83rem;
                height: .31rem;
                border: 1px solid #d33;    
                box-sizing: border-box;
                margin-right: .15rem;
                text-align: center;
                line-height: .31rem;
                font-size: .14rem;
                position: relative;
                >img{
                    width: .16rem;
                    height: .16rem;
                    position: absolute;
                    top: -1px;
                    right: -1px;
                }
            }
        }
        .btnBottom{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: .43rem;
            >p{
                text-align: center;
                line-height: .43rem;
                font-size: .15rem;
            }
            >p:nth-of-type(1){
                background:#eee;
                color:#666;
            }
            >p:nth-of-type(2){
                background:#d33;
                color:#fff;
            }
        }
    }
    .billFiltrate{
        display: flex;
        padding: .13rem .14rem;
        >p{
            width: .6rem;
            height: .24rem;
            margin-right: .2rem;
            text-align: center;
            line-height: .24rem;
            background:#f8f8f8;
            color:#666;
        }
        .selected{
            background:#d33;
            color:#fff;
        }
    }
    .billSummary{
        padding: 0 .15rem;
        >p{
            color:#666;
            margin: .2rem 0;
            font-size: .12rem;
        }
        >.time{
            display: flex;
            justify-content: space-around;
            border: 1px solid #ccc;
            border-radius: .03rem;
            font-size: .15rem;
            color: #999;
            >p{
                width: .84rem;
                text-align: center;
                line-height: .34rem;
            }
            .line{
                width: .07rem;
            }
        }    
        .all,.store{
            font-size: .15rem;
            line-height: .44rem;
            >img{
                width: .17rem;
                height: .17rem;
            }
        }
        .all{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f2f1f6;
        }
        .store{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f2f1f6;
            border-bottom: 1px solid #f2f1f6;
        }    
        .btnBottom{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: .43rem;
            >p{
                text-align: center;
                line-height: .43rem;
                font-size: .15rem;
            }
            >p:nth-of-type(1){
                background:#eee;
                color:#666;
            }
            >p:nth-of-type(2){
                background:#d33;
                color:#fff;
            }
        }
    }
}


</style>