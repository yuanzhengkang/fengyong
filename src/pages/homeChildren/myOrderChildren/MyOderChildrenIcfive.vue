<!-- 已完成 -->
<template>
	<div class='MyOderChildrenIcfive'>
		<div class='MyOderChildrenIcthreeIcone'>
			<img src="../../../assets/image/ic_no_order.png" alt="">
			<p>您还没有相关订单</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				divs:null
			}
		},
		methods:{
			getOrderCompleted(){
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					pageNum: 1,
					pageSize: 10,
					siteId: this.$store.state.getByUser.stationId
				}
				this.$ajax.getOrderCompleted(data).then(res => {
					if (res.data.status.statusCode === 0) {
						this.divs = res.data.result.list;
						// console.log(res)
					}
				})
			}
		},
		created(){
			this.getOrderCompleted()
		}
	}
</script>

<style scoped lang='scss'>
	.MyOderChildrenIcfive{
		.MyOderChildrenIcthreeIcone{
			position: absolute;
			top:1.33rem;
			right:0;
			left:0;
			bottom:0;
			background:#f2f1f6;
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			img{
				width:0.4rem;
				height:0.43rem;
				margin:0 0 0.25rem 0;
			}
			p{
				color:#666666;
			}
		}
	}
</style>
