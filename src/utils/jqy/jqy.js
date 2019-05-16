import api from '../api'
 //我的——> 设置
function getCallCenter() {
    let obj = {
        url: '/b2b-app-web/getCallCenter',
        data: '',
        method: 'post'
    }
    return api(obj)
}
//我的——> 设置——> 修改昵称
function setnickUpdate(data) {
    let obj = {
        url: '/b2b-app-web/user/nickUpdate',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//我的——> 设置——> 给手机发送验证码
function getcode(data) {
    let obj = {
        url: '/b2b-app-web/user/getUpdatePhoneCode',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//我的——> 设置——> 手机验证-验证码
function verifycode(data) {
    let obj = {
        url: '/b2b-app-web/user/updatePhoneCodeValid',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//我的——> 设置——> 修改密码-提交
function verifypassword(data) {
    let obj = {
        url: '/b2b-app-web/user/passUpdate',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//团购管理——> 团长招募
function recruitCommander(data) {
    let obj = {
        url: '/ms-web/groupBuy/app/getAppGroupBuyActivityList',
        params: data,
        method: 'get'
    }
    return api(obj)
}
//团购管理——> 活动管理
function activityManagement(data) {
    let obj = {
        url: '/ms-web/groupBuy/app/getMerchantGroupBuyActivityList',
        params: data,
        method: 'get'
    }
    return api(obj)
}
//客户管理
function service(data) {
    let obj = {
        url: '/ms-web/memberController/selectShopTagAndCount',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//客户管理——> 全部客户
function serviceSearch(data) {
    let obj = {
        url: '/ms-web/memberController/customerQuery',
        params: data,
        method: 'post'
    }
    return api(obj)
}
//经营分析
function run(data) {
    let obj = {
        url: '/ms-web/weCat/monthAccess',
        params: data,
        method: 'get'
    }
    return api(obj)
}

export default {
    getCallCenter,
    setnickUpdate,
    getcode,
    verifycode,
    verifypassword,
    recruitCommander,
    activityManagement,
    service,
    serviceSearch,
    run
}