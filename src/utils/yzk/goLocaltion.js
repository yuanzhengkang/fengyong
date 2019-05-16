// 跳转订单详情
function letGo(ref) {
	if(ref.mainOrderNo){
		this.$store.commit('setMainOrderNo', ref.mainOrderNo)
		this.$router.push('/orderdetails')
	}else{
		this.$router.push('/oder')
	}
}

export default {
	letGo
}
