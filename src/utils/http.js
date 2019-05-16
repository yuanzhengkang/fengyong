import api from './api'
import store from '../vuex/store'
import dxw from './dxw/dxw'
import yzk from './yzk/yzk'
import lh from './lh/lh'
import jqy from './jqy/jqy'
import lwd from './lwd/lwd'
import dya from './dya/dya'
//登录接口
function login(tel, pas) {
    let obj = {
        url: '/b2b-app-web/user/login',
        params: {
            loginName: tel,
            password: pas,
        },
        method: 'post'
    }
    return api(obj)
}
//首页接口
function home(
    //不登陆时的默认参数
    data = {
        "merchantId": 0,
        "siteid": 22,
        "storeCustId": 0,
        "terminal": 3,
        "storeId": 0
    }
) {
    let obj = {
        url: '/b2b-app-web/getListB2bIndex',
        data,
        method: 'post'
    }
    return api(obj)
}
//首页接口需要的数据   下面两个接口
function homeData(id) {
    // store.commit('setCommodityDetailsUserId', id)
    let obj = {
        url: '/b2b-app-web/app/merchant/getByUserId/' + id,
        method: 'post'
    }
    return api(obj).then(res => {
        if (res.data.result) {
            store.commit('setByUser', res.data.result)
            if (res.data.result.merchantId && res.data.result.groupId && res.data.result.stationId) {
                let getGroupIdObj = {
                    url: '/b2b-app-web/getListOfShopByGroupId',
                    params: {
                        groupId: res.data.result.groupId
                    },
                    method: 'post'
                }
                return api(getGroupIdObj).then(msg => {
                    store.commit('setMyUser', msg.data.result.items[0])
                    return {
                        "merchantId": res.data.result.merchantId,
                        "siteid": res.data.result.stationId,
                        "storeCustId": msg.data.result.items[0].id,
                        "terminal": 3,
                        "storeId": msg.data.result.items[0].storeId
                    }
                })
            } else {
                return '数据错误'
            }
        } else {
            return '数据错误'
        }
    })
}
//分类页面左边列表数据
function list(id) {
    let obj = {
        url: '/b2b-app-web/getSortInfoByStationIdV2/' + id,
        method: 'post'
    }
    return api(obj)
}
//分类页右边内容数据
function listRight(data) {
    let obj = {
        url: '/b2b-app-web/getBrandInfo',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//我的页 数据
function myData(data) {
    let obj = {
        url: '/b2b-app-web/countOrder',
        params: data,
        method: 'get'
    }
    return api(obj)
}
//我的浏览记录
function getGoodsRecordByUserId(data) {
    let obj = {
        url: '/b2b-app-web/getGoodsRecordByUserId',
        data: data,
        method: 'post'
    }
    return api(obj)
}
//购物车接口
function getShopping(data) {
    let obj = {
        url: '/b2b-app-web/getShoppingCart',
        data: data,
        params: data,
        method: 'get'
    }
    return api(obj)
}
//购物车选中和取消选中接口
function modifyCheckState(data) {
    let obj = {
        url: '/b2b-app-web/modifyCheckState',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//购物车数量加减
function modifyGoodsNum(data) {
    let obj = {
        url: '/b2b-app-web/modify',
        data: data,
        method: 'post'
    }
    return api(obj)
}
//单项全选 与 购物车全选
function slectedAll(data) {
    let obj = {
        url: '/b2b-app-web/modifyCheckState',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//领券中心接口
function togoo(data) {
    let obj= {
        url: '/b2b-app-web/page/merchantCoupleList',
        data:data,
        method: 'post',
    }
    return api(obj)
}
//小方格数据接口
function getGoodSeeckData(data) {
    let obj = {
        url: '/b2b-app-web/searchGoodsList',
        data: data,
        method: 'post'
    }
    return api(obj)
}
// 购物清单 右侧
function keepList(data) {
    let obj = {
        url: '/b2b-app-web/getUsualDealerByUserId/2189687/51',
        method: 'get'
    }
    return api(obj)
}

// 购物清档  左侧
function keepList1(data) {
    let obj = {
        url: '/b2b-app-web/usualGoodsByUserId',
        data: {
            groupStoreId:  store.state.loginUser.groupId,
            merchantId: store.state.getByUser.merchantId,
            shopId: store.state.loginUser.orgId,
            stationId: store.state.getByUser.stationId,
            userId: store.state.loginUser.id,
        },
        method: 'post'
    }
    return api(obj)
}
//我的订单 待付款
function getOrderPendingPayments(data){
	let obj = {
		url:'/b2b-app-web/getOrderPendingPayment',
		data,
		method:'post'
	}
	return api(obj)
}
// 我的 供应商
function mySupplier(data){
	let obj = {
		url:'/b2b-app-web/getMyDealerRecordList',
		data,
		method:'post'
	}
	return api(obj)
}

// 我的 供应商 searchGoodsList
function supplierSearchGoodsList(data){
	let obj = {
		url:'/b2b-app-web/searchGoodsList',
		data,
		method:'post'
	}
	return api(obj)
}
//我的订单 子路由
function getToReceived(data){
	let obj = {
		url:'/b2b-app-web/getToReceived',
		data,
		method:'post'
	}
	return api(obj)
} 
//我的订单 子路由
function getOrderCompleted(data){
	let obj = {
		url:'/b2b-app-web/getOrderCompleted',
		data,
		method:'post'
	}
	return api(obj)
} 
//我的订单 子路由
function getToSend (data){
	let obj = {
		url:'/b2b-app-web/getToSend',
		data,
		method:'post'
	}
	return api(obj)
} 

//我的订单 订单详情
function getOrderDetail(data){
	let obj = {
		url:'/b2b-app-web/getOrderDetail',
		params: data,
		method:'get'
	}
	return api(obj)
}
 
 //我的订单  订单详情
 function wayBillDetail(data){
	 let obj = {
	 	url:'/b2b-app-web/wayBillDetail',
	 	params: data,
	 	method:'get'
	 }
	 return api(obj)
 }
export default{
    login,
    home,
    homeData,
    list,
    listRight,
    myData,
    getGoodsRecordByUserId,
    getShopping,
    modifyCheckState,
    modifyGoodsNum,
    slectedAll,
    togoo,
    getGoodSeeckData,
    keepList,
    keepList1,
    getOrderPendingPayments,
    mySupplier,
	getToReceived,
	getOrderCompleted,
	getToSend,
	getOrderDetail,
	wayBillDetail,
    getToSend,
    supplierSearchGoodsList,
    ...dxw,
    ...yzk,
    ...lh,
    ...jqy,
    ...lwd,
    ...dya,
    
}
