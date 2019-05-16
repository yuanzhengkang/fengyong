<template>
    <div>
        <commonTab :title="this.$store.state.dealerName" :url='url'></commonTab>
        <div class="classify">
            <div class="storeClassify" v-for="(item,index) in classifys" :key="index" @click="skip(item)">
                <div class="list">
                    <span>{{item.sName}}</span>
                    <img src="./../../../assets/image/ic-next-left.png" alt="">
                </div>
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
            classifys: [],
        }
    },
    methods: {
        get(){
            this.$ajax.getDealerClassByDealerId(this.$store.state.custId).then(res=>{
                this.classifys = res.data.result;
           })
        },
        skip(item){
            this.$router.push({
                name: 'detailsOfTheBrand',
                params: {
                    id: item.id, 
                    name: item.sName,
                    dealerName: this.$store.state.dealerName,
                    supplier: true
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
.classify {
    width: 100%;
    position: absolute;
    top: .45rem;
    bottom: 0;
    background: #F2F1F6;
    .storeClassify {
        width: 100%;
        height: .6rem;
        padding: .15rem;
        box-sizing: border-box;
        background:#fff;
        margin-bottom: .07rem;
        margin-top: .03rem;
        .list {
            width:100%;
            display:flex;
            justify-content:space-between;
            padding-top: .02rem;
            padding-bottom: .11rem;
            font-size: .14rem;
            color:#333;
            img {
                width: .13rem;
                height: .13rem;
            }
        }
    }
}
</style>
