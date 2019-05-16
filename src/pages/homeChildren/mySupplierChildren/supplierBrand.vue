<template>
    <div>
        <commonTab :title="this.$store.state.dealerName" :url='url'></commonTab>
        <div class="brandList">
            <div class="brand" v-for="(item,index) in brands" :key="index" @click="skip(item)">
                <img :src="item.logoUrl" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import commonTab from './commonTab.vue'
export default {
    data(){
        return {
            url: '/parentSupplier',
            brands:  [],
        }
    },
    methods: {
        get(){
            this.$ajax.getBrandByDealerId(this.$store.state.custId).then(res=>{
                this.brands = res.data.result;
           })
        },
        skip(item){
            this.$router.push({
                name: 'detailsOfTheBrand',
                params: {
                    id: item.brandId, 
                    name: item.name,
                    dealerId: item.dealerId,
                    supplier: false
                }
            })
        }
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
.brandList {
    width:100%;
    background: #F2F1F6;
    padding-bottom: .9rem;
    position: absolute;
    top: .43rem;
    bottom: .45rem;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    .brand {
        width: 25%;
        height: .91rem;
        border-right: 1px solid #EEE;
        border-bottom: 1px solid #EEE;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img {
            width: .6rem;
            height: .46rem;
        }
        span {
            display: block;
            width: .82rem;
            height: .12rem;
            font-size: .12rem;
            color:#666;
            line-height: .12rem;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
    }
}
</style>
