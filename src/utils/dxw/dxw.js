import api from '../api'
// 供应商home
function dealerColl(userId,dealerId) {
    let obj = {
        url: '/b2b-app-web/dealerColl/collectStatus?userId='+ userId +'&dealerId='+ dealerId,
        method: 'post'
    }
    return api(obj)
}
// 添加收藏
function add(data) {
    let obj = {
        url: '/b2b-app-web/dealerColl/add',
        data,
        method: 'post'
    }
    return api(obj)
}
// 取消收藏
function del(data) {
    let obj = {
        url: '/b2b-app-web/dealerColl/del',
        data,
        method: 'post'
    }
    return api(obj)
}
// 供应商商品分类
function getDealerClassByDealerId(custId) {
    let obj = {
        url: '/b2b-app-web/getDealerClassByDealerId/' + custId,
        method: 'post'
    }
    return api(obj)
}
// 供应商 商品品牌
function getBrandByDealerId(custId) {
    let obj = {
        url: '/b2b-app-web/getBrandByDealerId/' + custId,
        method: 'post'
    }
    return api(obj)
}
// 基本工商信息
function getDealerFileInfoById(dealeNameId,id) {
    let obj = {
        url: '/b2b-app-web/getDealerFileInfoById/' + dealeNameId + '/' + id,
        method: 'get'
    }
    return api(obj)
}
// 
function queryList(status) {
    let obj = {
        url: '/ms-web/shopGoods/listForAdmin?shopId=6694&storeId=66958&goodsType=&status='+status+'&salesCategoryId=&currentPage=1&pageSize=10&sortType=5',
        method: 'post'
    }
    return api(obj)
}

export default {
    dealerColl,
    add,
    del,
    getDealerClassByDealerId,
    getBrandByDealerId,
    getDealerFileInfoById,
    queryList
}