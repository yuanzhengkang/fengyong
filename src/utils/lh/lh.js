import api from '../api'
import store from '../../vuex/store'
/**
 * 收藏
 */
 function detailsCollect() {
  let obj = {
    url: '/b2b-app-web/goodsColl/collected',
    params: {
      userId:2189687,
      skuId:133069,
      source:0
    },
    method: 'post'
  }
  return api(obj)
 }
 /**
  * 商品详情数据
  */
 function commodityDetails(skuId) {
  let obj = {
    url: "/b2b-app-web/goodsDetail/"+ skuId + "/51/2189687/15463/14948/66958",
    method: "get"
  }
  return api(obj)
 }
 /**
  * 规格参数
  */
 function parameters(data) {
  let obj = {
    url: "/b2b-app-web/html/getGoodsParamsBySkuId/" + data,
    params: {
      toreGlobalId:15463,
      storeGroupId:66958
      },
      data: {
        storeGlobalId:15463,
        storeGroupId:66958
      },
    method: "get"
  }
  return api(obj)
 }
 /**
  * 优惠卷
  */
 function coupons(data) {
  let obj = {
    url: "/b2b-app-web/myCouponList",
    method: "post",
    data,
  }
  return api(obj)
 }
export default {
  detailsCollect,
  commodityDetails,
  parameters,
  coupons
}