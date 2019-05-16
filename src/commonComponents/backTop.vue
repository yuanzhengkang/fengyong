<template>
    <!-- 返回顶部 -->
    <!-- <div class="backTop" @click="backTop" :style = "show ? 'transform: translateY(0)' : ''"> -->
        <img class="backTop" @click="backTop" :style = "show ? 'transform: translateY(0)' : ''" src="./../assets/image/Group@3x.png" alt="">
    <!-- </div> -->
</template>

<script>
export default {
    data(){
        return {
            scrollTop: 0,
            show: false
        }
    },
    methods: {
        // 返回顶部
        backTop(){
            let that = this;
            var scrollToptimer = setInterval(function () {
                // 速度由快到慢
                var speed = that.scrollTop / 5;
                document.documentElement.scrollTop -= speed;
                // 触发滚轮事件
                window.onmousewheel = function(){
                    clearInterval(scrollToptimer);
                }
                if (document.documentElement.scrollTop == 0) {
                    clearInterval(scrollToptimer);
                }
            }, 30);
        }
    },
    mounted(){
        let that = this;
        // 监听滚动条的变化
        window.addEventListener('scroll',function(){
            that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(that.scrollTop >= 300){
                that.show = true;
            }else{
                that.show = false;
            }
        },false);
    }
}
</script>

<style scoped lang="scss">
.backTop {
    display: block;
    position: fixed;
    bottom: 1.3rem;
    right: .25rem;
    z-index: 99;
    width: .45rem;
    height: .45rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.65s linear;
    transform: translateY(2.85rem);
}
// .show {
//   display: block;
// }
</style>
