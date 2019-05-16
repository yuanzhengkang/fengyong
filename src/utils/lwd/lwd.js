import api from '../api'

import store from '../../vuex/store'



// 常购清单 收藏店铺
function collect(index) {
    let obj = {
        url: '/b2b-app-web/dealerColl/add',
        data: {
            dealerId: store.state.setcustId,
            userId: store.state.loginUser.id
        },
        method: 'post'
    }
    return api(obj)

}
//  常购清单  取消收藏
function abrogatecollect(index) {
    let obj = {
        url: '/b2b-app-web/dealerColl/del',
        data: {
            dealerId: store.state.setcustId,
            userId: store.state.loginUser.id
        },
        method: 'post'
    }
    return api(obj)
}
//常购 右侧 点击跳转
function skip() {
    let obj = {
        url: '/b2b-app-web/getUsualGoodsByDealerId',
        data: {
            dealerId: store.state.dealerId,
            groupStoreId: store.state.loginUser.groupId,
            merchantId: store.state.getByUser.merchantId,
            shopId: store.state.loginUser.orgId,
            stationId: store.state.getByUser.stationId,
            userId: store.state.loginUser.id
        },
        method: 'post'
    }
    return api(obj)
}
//我的小店
function store1() {
    let obj = {
        url: '/ms-web/shopInfoController/totalInfo/' + store.state.Myshop.id,
        method: 'get'
    }
    return api(obj)
}
//我的小店


function getApp() {

    let obj = {
        url: "/fw-scm-wxplatform-web/wxApp/getMpInfoForApp",
        data: {
            merchantId: "14948",
        },
        method: 'post'
    }
    return api(obj)
}

// 我的小店
function last() {
    let obj = {
        url: '/ms-web/shopInfoController/InsertShopInfoByMerchant',
        data: {},
        params: {
            orgId: store.state.getByUser.orgId,
            groupId: store.state.getByUser.groupId,
            merchantId: store.state.getByUser.merchantId,

        },
        method: 'post'
    }

    return api(obj)
}



// 我的小店 店铺管理

function management() {
    let obj = {
        url: '/fw-scm-wxplatform-web/wxApp/getMpState?merchantId=' + store.state.getByUser.merchantId,
        method: 'post',

    }
    return api(obj)
}

//我的 小店 保存
function save() {

    let obj = {

        url: "/ms-web/shopInfoController/updateShopInfoById",
        data: {
            contactsName: store.state.contactsName,
            contactsPhone: store.state.phone,
            id: store.state.Myshop.id,
            remark: store.state.Myshop.remark,
            shopName: store.state.shopName,
        },
        method: 'post'

    }
    return api(obj)
}
//图片
function logo() {
    let obj = {
        url: '/b2b-app-web/uploadCompressPicByFile',
        method: 'post',
    }
    return api(obj)
}
//图片
function price() {

    let obj = {
        url: '/ms-web/shopInfoController/updateShopInfoById',
        method: 'post',
        data: {
            id: '6694',
            logo: 'http://b2bbucket-1254060329.picbj.myqcloud.com//img/' + store.state.parce,
        }



    }
    return api(obj)
}

//门店完成

function achieve() {

    let obj = {
        url: '/ms-web/shopInfoController/getListStoreByGroup',

        params: {
            groupId: store.state.Myshop.groupId,
            stareIndex: 0,
            pageNum: 100
        },
        method: 'post',
    }
    return api(obj)


}
export default {
    collect,
    abrogatecollect,
    skip,
    store1,
    management,
    save,
    getApp,
    last,
    logo,
    price,
    achieve
}