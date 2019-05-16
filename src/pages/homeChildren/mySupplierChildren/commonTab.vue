<template>
        <div class = 'goback'>
            <img src="./../../../assets/image/back.png" alt="" @click="goback">
            <p>{{title}}</p>
        </div>
</template>

<script>
export default {
    name: 'headGoBack',
    props: ["title","url"],
    methods: {
        goback() {
            this.$router.push(this.url);
        }
    }
}
</script>

<style scoped lang="scss">
.goback {
    height: .43rem;
    position: fixed;
    background: #fff;
    left: 0;
    right: 0;
    z-index: 99;
    img {
        height: .18rem;
        position: absolute;
        top: .14rem;
        left: .14rem;
    }
    p {
        width: 48%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin: 0 auto;
        font-family: PingFang-SC-Medium;
        font-size: .18rem;
        letter-spacing: 2px;
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
</style>
