<template>
    <div>
        <van-tabbar v-model="active" active-color="#d33" >
            <van-tabbar-item :icon="item.icon" :to="item.to" v-for="(item,index) in icons" :key="index">{{item.con}}</van-tabbar-item>
        </van-tabbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
export default {
    data(){
        return {
            active: 0,
            icons: [
                {icon: 'home-o', to: '/parentSupplier', con: '首页'},
                {icon: 'apps-o', to: '/parentSupplier/supplierClassify', con: '分类'},
                {icon: 'fire-o', to: '/parentSupplier/supplierBrand', con: '品牌'},
                {icon: 'chart-trending-o', to: '/parentSupplier/supplierRecord', con: '档案'},
            ],
        }
    },
    watch: {
        $route() {
            let name = this.$route.name;
            if(name == 'supplierHome'){
                this.active = 0;
            }else if(name=='supplierClassify'){
                this.active = 1;
            }else if(name=='supplierBrand'){
                this.active = 2;
            }else if(name=='supplierRecord'){
                this.active = 3;
            }
        }
    },
    created() {
        let name = this.$route.name;
        if(name == 'supplierHome'){
            this.active = 0;
        }else if(name=='supplierClassify'){
            this.active = 1;
        }else if(name=='supplierBrand'){
            this.active = 2;
        }else if(name=='supplierRecord'){
            this.active = 3;
        }
    }
}
</script>
