<!--  经营分析-->
<template>
    <div class='run'>
        <headGoBack goBackBoo="true" title='经营分析'></headGoBack>
        <div class="container">
            <div class="content">
                <div class="content_top">
                    <i></i>
                    <img src="../../assets/image/ic_ba_line.png" alt="">
                    <span>流量</span>
                    <i></i>
                </div>
                <div class="content_center">
                    <p :class="activeClass==index&&'p'" v-for="(item,index) in arr" :key="index" @click='tabChange(index)'>
                        <i></i>
                        <span>{{item}}&nbsp;:</span>
                    </p>
                </div>
                <div ref='myChart' class="content_bottom">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    data() {
        return {
            arr: ['访客数','浏览量'],
            activeClass: 0,
        };
    },
    created () {
        this.ajax();
    },
    methods: {
        ajax() {
            let data = {
                shopId: 6694
            };
            this.$ajax.run(data).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        tabChange(index) {
            this.activeClass = index
        },
        drawLine(){
            let myChart = this.$echarts.init(this.$refs.myChart)
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [400, 200, 300, 500, 600, 600, 700],
                    type: 'line'
                }]
            })
        },
    },
    mounted() {
        console.log(this)
        this.drawLine()
    }
}
</script>
<style lang='scss' scoped>
.run{
    .container{
        position: absolute;
        top: .43rem;
        bottom: 0;
        width: 100%;
        background: #3D3838;
        .content{
            .content_top{
                margin-top: .3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                height: .4rem;
                font-size: .14rem;
                color:rgba(255,255,255,0.80);
                i{
                    width: .9rem;
                    height: .01rem;
                    background: #666;
                }
                img{
                    width: .18rem;
                    height: .18rem;
                    margin-right: .05rem;
                    margin-left: .08rem;
                }
                span{
                    margin-right: .08rem;
                }
            }
            .content_center{
                margin-top: .3rem;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                p{
                    display:flex;
                    align-items:center;
                    width: 1.68rem;
                    height: .44rem;
                    border-radius: .04rem;
                    font-size: .16rem;
                    background: #fff;
                    i{
                        width: .03rem;
                        height: .16rem;
                        border-radius: .08rem;
                        background: #ccc;
                        margin-right: .05rem;
                        margin-left: .1rem;
                    }
                    span{
                        font-size: .16rem;
                        color:#999;
                    }
                }
                .p{
                    background: #d33;
                    i{
                        background: #fff;
                    }
                    span{
                        color: #fff;
                    }
                }
            }
            .content_bottom{
                width: 94%;
                height: 2.6rem;
                background:white;
                border-radius:8px;
                margin: .2rem auto;
            }
        }
    }
}
</style>