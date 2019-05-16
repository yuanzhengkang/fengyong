<!-- 客户管理 -->
<template>
    <div class='service'>
        <headGoBack goBackBoo="true" title='客服管理'></headGoBack>
        <div class="container">
            <router-link to="/serviceSearch" tag="div" class="content">
                <span>全部客户</span>
                <p>0</p>
            </router-link>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    data() {
        return {

        };
    },
    created () {
        this.ajax()
    },
    methods:{
        ajax() {
            let data = {
                shopId: 6694
            };
            this.$ajax.service(data).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.service{
    .container{
        position: absolute;
        top: .43rem;
        bottom: 0;
        width: 100%;
        background: #eee;
        .content{
            height: .44rem;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 .13rem;
            box-sizing:border-box;
            font-size: .14rem;
            span{
                color:#666;
            }
            p{
                color:#333;
            }
        }
    }
}

</style>