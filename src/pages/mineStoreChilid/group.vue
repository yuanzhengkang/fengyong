<!-- 团购管理 -->
<template>
    <div class='group'>
        <headGoBack goBackBoo="true" title='团购管理'></headGoBack>
        <div class='container'>
            <router-link :to="item.to" tag="div" class="every" v-for="(item,index) in con" :key="index">
                <span>{{item.span}}</span>
                <img :src="item.img" alt="">
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
            con:[
                    {
                        span:'团长招募',
                        img:require('../../assets/image/ic-next-left.png'),
                        to:'/recruitCommander'
                    },  
                    {
                        span:'活动管理',
                        img:require('../../assets/image/ic-next-left.png'),
                        to:'/activityManagement'
                    }
            ]
        };
    },
    methods: {

    },
}
</script>
<style lang='scss' scoped>
.group{
    .container{
        position: absolute;
        top: .43rem;
        bottom: 0;
        width: 100%;
        background: #eee;
        .every{
            height: .445rem;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 1px;
                background: #eee;
                transform: scaleY(.5);
            }
            &:nth-of-type(1):after{
                height: 0;
            }
            span{
                font-size: .14rem;
                color:#333333;
                padding-left: .14rem;
            }
            img{
                width: .12rem;
                height: .12rem;
                padding-right: .1rem;
            }
        }
        .hover{
            opacity: .9;
        }
    }
}

</style>