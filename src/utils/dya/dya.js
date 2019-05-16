import api from '../api'
//供应商
function searchReleaseDealerList(data) {
    let obj = {
        url: '/b2b-app-web/searchReleaseDealerList',
        data,
        method: 'post'
    }
    return api(obj)
}
function searchGoodsList(data) {
    let obj = {
        url: '/b2b-app-web/searchGoodsList',
        data,
        method: 'post'
    }
    return api(obj)
}
function goodsDetail(data) {
    let obj = {
        url: '/b2b-app-web/goodsDetail/'+data,
        method: 'get'
    }
    return api(obj)
}
function addShopping(data) {
    let obj = {
        url: '/b2b-app-web/join',
        data,
        method: 'post'
    }
    return api(obj)
}
function collects(data) {
    let obj = {
        url: '/b2b-app-web/dealerColl/collects',
        params: data,
        method: 'post'
    }
    return api(obj)
}
function confirmAnOrder(data) {
    let obj = {
        url: '/b2b-app-web/confirmOrder',
        data: data,
        method: 'post'
    }
    return api(obj)
}
export default {
    searchReleaseDealerList,
    searchGoodsList,
    goodsDetail,
    addShopping,
    collects,
    confirmAnOrder
}