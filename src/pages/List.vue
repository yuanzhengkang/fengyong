<template>
  <div class="list">
    <header>
      <p>商品分类</p>
      <img src="../assets/image/search.png" alt="">
    </header>
    <div class='content' v-if="leftListData.length>0">
      <ul class='leftList'>
        <li v-for="(item,index) in leftListData" 
        :class="leftListIndex==index && 'liSelected'" 
        @click='changeList(index)'>{{item.sName}}</li>
      </ul>
      <div class='rightContent'>
        <div class='rightHeader'>
          <p class='rightHeaderTitle'>
              {{leftListData[leftListIndex].sName}}
          </p>
          <div class='rightHeaderChildren' v-for="(list,index) in leftListData[leftListIndex].stationSaleTypeModels">
            <img @click='toGoodsSeeck(list.sName)' :src='list.sPic' alt=""/>
            <p>{{list.sName}}</p>
          </div>
        </div>
        <div class='rightBrand'>
          <p class='rightHeaderTitle'>热门品牌</p>
          <div class='rightHeaderChildren' v-for="item in rightContentData" @click='toBrandSeeck(item.brandId)'>
              <img :src='item.logoUrl' alt=""/>
              <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftListData: [],
      leftListIndex: 0,
      rightContentData: []
    }
  },
  methods: {
    changeList(i) {
      this.leftListIndex = i
      this.getRightData(i)
    },
    getLeftData() {
        this.$ajax.list(this.$store.state.stationId||22).then(res=>{
          this.leftListData = res.data.result.list
          this.getRightData(0)
        }) 
    },
    getRightData(i) {
      let data = {
        firstSaleTypeId: this.leftListData[i].id,
        num:100 ,
        stationId: this.$store.state.stationId
      }
      this.$ajax.listRight(data).then(res=>{
        this.rightContentData = res.data.result
      })        
    },
    toBrandSeeck(brandId) {
      this.$store.commit('setBrandId',brandId)
      this.$router.push('/goodSeeck')
    },
    toGoodsSeeck(sName) {
      console.log(sName)
      this.$store.commit('setSaletype',{secondSaletypeName: sName})
      this.$router.push('/goodSeeck')
    }
  },
  created() {
    this.getLeftData()
  }
}
</script>

<style scoped lang="scss">
.list{
  header{
    height: .44rem;
    position: relative;
    >p{
      font-size: 0.18rem;
      color: #030303;
      text-align: center;
      line-height: .44rem;
    }
    >img{
      width: .16rem;
      height: .16rem;
      position: absolute;
      right: .14rem;
      top: .14rem;
    }
  }
  header::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
    background: #e4e4e4;
  }
  .content{
    display: flex;
    .leftList{
      width: .96rem;
      height: 5.73rem;
      overflow-y: auto;
      background: #F2F2F2;
      li{
          height: .5rem;
          line-height: .5rem;
          text-align: center;
          font-size: 0.14rem;
          color: #666666;
      }
      .liSelected{
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        font-size: 0.14rem;
        color: #666666;
        background: #fff;
      }
    }
    .rightContent{
      width: 2.79rem;
      .rightHeader{
        padding: .15rem;
        overflow: hidden;
        >.rightHeaderTitle{
            text-indent: .05rem;
          }
        .rightHeaderChildren{
            width: .62rem;
            float: left;
            margin: .15rem 0;
            text-align: center;
            img{
              width: .62rem;
            }
            p{
              text-align: center;
            }
        }  
      }
      .rightBrand{
        padding: .15rem;
        .rightHeaderTitle{
          padding: 0;
          text-indent: .05rem;
        }
        .rightHeaderChildren{
          width: .71rem;
          float: left;
          margin: .05rem;
          border: 1px solid #dedede;
          text-align: center;
          img{
            width: .62rem;
            margin: 0 auto;
          }
          p{
            text-align: center;
            margin-bottom: .1rem;
          }
        }
      }
    }    
  }
}
</style>
