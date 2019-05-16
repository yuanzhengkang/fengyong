import api from '../api'

function myOrder(data){
	let obj = {
		url:'/b2b-app-web/getAllOrder',
		data,
		method:'post'
	}
	return api(obj)
}
function goodsDetail(data){
	let obj = {
		url:'/b2b-app-web/goodsDetail',
		data,
		method:'get'
	}
	return api(obj)
}
function getCancelReason(data){
	let obj = {
		url:'/b2b-app-web/getCancelReason',
		data,
		method:'get'
	}
	return api(obj)
}
function cancelOrder(data){
	let obj = {
		url:'/b2b-app-web/cancelOrder',
		params:{
			data
		},
		method:'post'
	}
	return api(obj)
}
function searchOrderList(data){
	let obj = {
		url:'/b2b-app-web/searchOrderList',
		data,
		method:'post'
	}
	return api(obj)
}
function buyAgain(data){
	let obj = {
		url:'/b2b-app-web/buyAgain',
		params: data,
		method:'post'
	}
	return api(obj)
}
function orderlist(data){
	let obj = {
		url:'/ms-web/order/orderlist',
		data,
		method:'post'
	}
	return api(obj)
}
function orderNumGroupByState(data){
	let obj = {
		url:'/ms-web/order/orderNumGroupByState',
		data,
		method:'get'
	}
	return api(obj)
}
function getListOfShopByGroupId(data){
	let obj = {
		url:'/b2b-app-web/getListOfShopByGroupId',
		params:data,
		method:'post'
	}
	return api(obj)
}
function queryEmployeeList(data){
	let obj = {
		url:'/ms-web/employeeManage/queryEmployeeList',
		data,
		method:'post'
	}
	return api(obj)
}
function addStaffForApp(data){
	let obj = {
		url:'/ms-web/employeeManage/addStaffForApp',
		data,
		method:'post'
	}
	return api(obj)
}
export default {
    myOrder,
	goodsDetail,
	getCancelReason,
	cancelOrder,
	searchOrderList,
	buyAgain,
	orderlist,
	orderNumGroupByState,
	getListOfShopByGroupId,
	queryEmployeeList,
	addStaffForApp
}