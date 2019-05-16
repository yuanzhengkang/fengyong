<template>
    <div class="headGoBack">
        <div class = 'goback'>
            <img v-if="goBackBoo" @click='goback' src="../assets/image/back.png" alt="">
            <p>{{title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'headGoBack',
    props: ["goBackBoo","title","path"],
    methods: {
        goback() {
            if(this.path) {
                this.$router.push(this.path)
            }else {
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.headGoBack{
    position: relative;
    height: .43rem;
    .goback{
        height: .43rem;
        position: fixed;
        left: 0;
        right: 0;
        z-index: 998;
        background: #fff;
        img{
            height: .18rem;
            position: absolute;
            top: .14rem;
            left: .14rem;
            z-index: 1;
        }
        p{
            font-size: .18rem;
            text-align: center;
            line-height: .435rem;
            background: #fff;
        }
    }
    .goback::after{
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #E4E4E4;
        transform: scaleY(0.5);
    }
}
</style>
