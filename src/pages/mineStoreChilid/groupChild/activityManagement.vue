<!-- 活动管理 -->
<template>
  <div class="activityManagement">
    <headGoBack goBackBoo="true" title='团购管理'></headGoBack>
    <div class="container">
        <div class="content">
            <img src="../../../assets/image/ic_search_no_data.png" alt="">
            <span>暂无活动</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    created() {
        this.ajax()
    },
    methods: {
        ajax() {
            let data = {
                merchantId:14948,
                pageSize:10,
                pageIndex:1
            };
            this.$ajax.activityManagement(data).then(res =>{
                console.log(res)
            }).catch(err =>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.activityManagement{
    .container{
        position: absolute;
        top: .43rem;
        bottom: 0;
        width: 100%;
        background: #eee;
        .content{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            width: 100%;
            height: 4rem;
            color:#666;
            font-size: .13rem;
            img{
                width: 1rem;
                height: 1rem;
            }
            span{
                margin-top: .15rem;
            }
        }
    }
}
</style>