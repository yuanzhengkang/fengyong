<!--  顶部搜索框搜索页  -->
<template>
    <div class = "inputSeeck">
        <HeadGoBack :goBackBoo="true" title="搜索" @click = "back()"></HeadGoBack>
        <header>
            <div class = "headTitle">
                <span @click = "catalogueMethod(index)" v-for = "(item, index) in catalogue" :key = "index" :style = "catalogueNum == index ? 'color: #DD3333;' : ''">{{item}}</span>
            </div>
            <div class = "headInp">
                <!-- <img class = "headBack" src="../../assets/image/back.png" alt="" @click = "back()"> -->
                <p>
                    <img  class = "iconTop" src="../../assets/image/icon-wTop.png" alt="" :style = "catalogueNum == 0 ? '' : 'left: 0.7rem'">
                    <img class = "headSearchImg" src="../../assets/image/ic_search.png" alt="">
                    <input type="headText" v-model="sourseContent" :placeholder="catalogueNum == 0 ? '搜索商品' : '搜索供应商'">
                    <img @click = "deleteInpCont" v-if = "deleteBoolean" class = "deleteContent" src="../../assets/image/ic_clear_img.png" alt="">
                </p>
                <span class = "headSearch" @click = "gomySupper()">搜索</span>
            </div>
        </header>
        <section class = "searchHistory" v-if = "this.searchData.length">
            <div class = 'navSearch'>
                搜索历史
                <img src="../../assets/image/ic_del.png" alt="" @click = "clearHistory()">
            </div>
            <div class = "resultContent">
                <span v-for = "(item,index) in searchData" :key = "index" @click = "gomySupperElse(item)">{{item}}</span>
            </div>
        </section>
    </div>
</template>
<script>
import HeadGoBack from '@/commonComponents/headGoBack'
export default {
    components: {
        HeadGoBack
    },
    data() {
        return{
            catalogue:["商品","供应商"],
            catalogueNum: "0",
            sourseContent: "",
            deleteBoolean: "",
            searchData:"",
            // commodityData:"",
            // dealerData:""
        }
    },
    methods: {
        /**
         * 点击目录（商品，供应商）更换颜色 数据
         */
        catalogueMethod(index) {
            this.catalogueNum = index
            this.searchDataList()
            this.sourseContent = ""
        },
        /**
         * 返回上一页
         */
        back() {
            this.$router.push("/")
        },
        /**
         * 清空输入内容
         */
        deleteInpCont() {
            this.sourseContent = ""
        },
        /**
         * 跳转页面
         */
        gomySupper() {
            if(this.sourseContent) {
                this.searchDataList()
                this.$router.push("/goodSeeck")
                this.sourseContent = ""
            }else {
                this.$toast('输入内容不能为空');
            }
        },
        /**
         *搜索历史记录
         */
        searchDataList() {
            if(this.catalogueNum == 0) {
                this.searchData = this.$store.state.searchCommodity
                this.$store.commit("setGoodsName", this.sourseContent)
                this.$store.commit("setBrandName", this.sourseContent)
                if(this.sourseContent) {
                    this.$store.commit("setSearchCommodity", this.sourseContent)
                }
            }else if(this.catalogueNum == 1) {
                this.searchData = this.$store.state.searchSupplier
                this.$store.commit("setDealeName", this.sourseContent)
                if(this.sourseContent) {
                    this.$store.commit("setSearchSupplier", this.sourseContent)
                }
            }
        },
        /**
         * 清空历史记录
         */
        clearHistory() {
            this.$dialog.confirm({
                message: '确定删除全部搜索历史吗？',
                "confirmButtonColor": "#DD3333"
            }).then(() => {
                this.$store.commit("searchClearData", this.catalogueNum)
                this.searchData = ""
                this.searchDataList()
            }).catch(() => {})
        },
        /**
         * 点击记录跳转
         */
        gomySupperElse(item) {
            if(this.catalogueNum == 0) {
                this.$store.commit("setGoodsName", item)
                this.$store.commit("setBrandName", item)
            }else if(this.catalogueNum == 1) {
                this.$store.commit("setDealeName", item)
            }
            this.$router.push("/goodSeeck")
        }
    },
    mounted() {
        this.searchDataList()
    },
    watch: {
        /**
         * 搜索内容
         */
        sourseContent(newVal, oldVue) {
            newVal.length > 0 ? this.deleteBoolean = true : this.deleteBoolean = ""
        }
    }
}
</script>
<style scoped lang="scss">
.inputSeeck{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #F2F1F6;
    header{
        height: 0.804rem;
        background: rgba(255,255,255,0.90);
        padding: 0.14rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .headTitle{
            margin: 0 0 0.05rem 0.02rem;
            font-size: 0.14rem;
            color: #333333;
            span:nth-child(2){
                margin-left: 0.24rem;
            }
        }
        .headInp{
            display: flex;
            height: 0.33rem;
            align-items: center;
            p{
                width: 78%;
                height: 0.28rem;
                background: #bf9292;
                margin: 0 0.14rem 0 0;
                padding: 0 0 0 0.094rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                background: #FFFFFF;
                border: 0.5px solid #afaeae;
                border-radius: 0.05rem;
                display: flex;
                align-items: center;
                position: relative;
                .iconTop{
                    position: absolute;
                    top: -0.073rem;
                    left: 0.12rem;
                    background: #FFFFFF;
                    width: 0.1rem;
                    height: 0.1rem;
                    transition: all 0.15s linear;
                }
                .headSearchImg{
                    width: 0.13rem;
                    height: 0.13rem;
                    margin-right: 0.096rem;
                    transition: all 0.15s linear;
                }
                input{
                    width: 80%;
                    &::-webkit-input-placeholder{
                        font-size: 0.14rem;
                        color: #999999;
                    }
                }
                .deleteContent{
                    width: 0.14rem;
                    height: 0.14rem;
                }
            }
            .headSearch{
                font-size: 0.16rem;
                color: #DD3333;
                display: flex;
            }
        }
    }
    .searchHistory{
        background: #FFFFFF;
        position: relative;
        padding: 0.196rem 0.14rem 0.09rem 0.14rem;
        box-sizing: border-box;
        .navSearch{
            display: flex;
            justify-content: space-between;
            font-size: 0.14rem;
            color: #333333;
            margin-bottom: 0.14rem;
            img{
                width: 0.12rem;
                height: 0.12rem;
            }
        }
        .resultContent{
            span{
                padding: 0.03rem 0.1rem;
                background: #F2F1F6;
                border-radius: 0.12rem;
                font-size: 0.12rem;
                color: #666666;
                margin: 0 0.1rem 0.1rem 0;
                display: inline-block;
                max-width: 1.3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        &::after{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border-bottom: 1px solid #E4E4E4;
            transform: scaleY(0.5);
        }
    }
}
</style>