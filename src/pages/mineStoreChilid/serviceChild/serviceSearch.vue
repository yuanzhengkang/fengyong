<template>
  <div class="serviceSearch">
      <headGoBack goBackBoo="true" title='客服管理'></headGoBack>
      <div class="container">
          <div class="content">
              <div class="search">
                  <img src="../../../assets/image/ic_search_gary.png" alt="">
                  <input type="text" placeholder="手机号/微信号" v-model="con">
              </div>
              <div class="null">
                  <img src="../../../assets/image/ic_search_no_data.png" alt="">
                  <span>暂无信息</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            con: ""
        }
    },
    created() {
        this.ajax();
    },
    watch: {
        con(val,oldVal) {
            let data2 = {
                merchantId: 14948,
                tagId: 0,
                keyWord: val,
                pageIndex: 1,
                pageSize: 1000
            };
            this.ajax(data2)
        }
    },
    methods: {
        ajax(data2) {
            let data = {
                merchantId: 14948,
                tagId: 0,
                pageIndex: 1,
                pageSize: 1000
            };
            if(data2) {
                this.$ajax.serviceSearch(data2).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$ajax.serviceSearch(data).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        
    }
}
</script>

<style lang="scss" scoped>
.serviceSearch{
    .container{
        position: absolute;
        top: .43rem;
        bottom: 0;
        width: 100%;
        background: #eee;
        .content{
            padding: .07rem .14rem;
            box-sizing: border-box;
            .search{
                height: .3rem;
                border-radius: .04rem;
                width: 100%;
                background:#fff;
                display: flex;
                align-items: center;
                img{
                    width: .12rem;
                    height: .12rem;
                    margin: 0 .1rem;
                }
                input{
                    width: 2.5rem;
                    height: .26rem;
                    &::placeholder{
                        color: #666;
                        font-size: .14rem;
                    }
                }
            }
            .null{
                margin: 0 auto;
                margin-top: 1.7rem;;
                display: flex;
                flex-flow: column;
                align-items: center;
                color: #999;
                img{
                    width: 1rem;
                    height: 1rem;
                }
            }
        }
    }
}
</style>