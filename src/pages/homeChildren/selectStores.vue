<!--  左上角门店选择页  -->
<template>
    <div class="selectStores">
        <headGoBack title="门店选择" goBackBoo="true" path="/Home"></headGoBack>
        <div class="container">
            <div class="content">
                <div class="every">
                    <span>{{Stores}}</span>  
                    <img src="../../assets/image/ic_hook.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Stores: this.$store.state.loginUser.id
        }
    }
}
</script>
<style scoped lang="scss">
    .selectStores{
        .container{
            width: 100%;
            position: absolute;
            top: .43rem;
            bottom: 0;
            background: #f2f1f6;
            .content{
                margin-top: .1rem;
                .every{
                    height: .48rem;
                    background: #fff;
                    box-sizing: border-box;
                    padding: .05rem .25rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    &::after{
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 1px;
                        background: #f2f1f6;
                        transform: scaleY(.5);
                    }
                    span{
                        font-size: .14rem;
                        color: #333;
                    }
                    img{
                        width: .23rem;
                        height: .23rem;
                    }
                }
            }
        }
    }
</style>