<!-- 订单404 -->
<template>
	<div class="oder">
		<headGoBack title="订单详情" :goBackBoo='goBackBoos'></headGoBack>
		<div class="four">
			<span class='four_icone'>404</span>
			<span class='four_ictwo'>获取页面数据错误!</span>
			<span class='four_icthree' @click='reload'>
				重新加载
			</span>
			<span class='four_icfour' @click='goBack'><u>返回</u></span>
		</div>
	</div>
</template>

<script>
	import headGoBack from '../../../../commonComponents/headGoBack.vue'
	export default{
		data(){
			return{
				goBackBoos:true
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			reload(){
				location.reload()
			}
		},
		components: {
			headGoBack
		},
	}
</script>

<style scoped lang='scss'>
	.oder{
		.four{
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position:absolute;
			top:50%;
			bottom:50%;
			left:0;
			right:0;
			font-size:1rem;
			.four_icone{
				
			}
			.four_ictwo{
				font-size:0.4rem;
			}
			.four_icthree{
				font-size:0.16rem;
				padding:0.14rem 0.17rem;
				display:inline-block;
				color:#fff;
				background: #3385ff;
				margin:0.15rem 0 0 0 ;
			}
			.four_icfour{
				margin:0.05rem 0;
				font-size:0.14rem;
			}
		} 
	}
</style>
