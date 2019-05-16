<!--订单  -->
<template>
	<div class='indent'>
		<headGoBack goBackBoo="true" title='订单管理'></headGoBack>
		<div class="title">
			<div class='title_icOne' @click='letGo'>
				<img src="../../assets/image/ic_search_gary.png" alt=""><span class='title_icOne_span'>搜索订单编号、商品名称</span>
			</div>
		</div>
		<van-tabs v-model="current" class='vant' title-active-color = "#DD3333" @click='getUrl'>
			<van-tab v-for="(i,index) in mas" :title=i.value :key='index' class='vants'>
				<div class='vantss'><img src="../../assets/image/ic_search_no_data.png" alt="">
					<p>你还没有相关订单</p>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';

	export default {
		data() {
			return {
				mas: [{
					value: '全部'
				}, {
					value: '待支付'
				}, {
					value: '门店待收货'
				}, {
					value: '待配送'
				}, {
					value: '配送中'
				}, {
					value: '待取货'
				}, {
					value: '已完成'
				}, {
					value: '已取消'
				}],
				current:0,
				divs:null,
				footers:null
			};
		},
		methods: {
			letGo() {
				this.$router.push('/orderchild')
			},
			getUrl() {
				let obj = {
					currentPage: 1,
					noMore: false,
					noOrder: false,
					orderStatus: ["PENDING_PAYMENT", "STORE_WAITING_RECEIPT", "CONSIGNMENT", "DISTRIBUTION", "COMPLETED", "CANCEL", "STOCKING","PICKUP","DETELE"],
					pageSize: 10,
					shopId: 6694
				}
				let sun = {
					shopId:this.$store.state.myUser.storeId
				}
				this.$ajax.orderlist(obj).then(res => {
					// console.log(res)
					if(res.data.status.statusCode === 0){
						this.divs = res.data.result
					}
				})
				this.$ajax.orderNumGroupByState(sun).then(res => {
					if(res.data.status.statusCode === 0){
						this.footers = res.data.result
					}
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	.indent {
		.title {
			padding: 0.12rem 0.14rem;
			background: #f2f1f6;

			.title_icOne {
				background: #fff;
				display: flex;
				align-items: center;
				padding: 0.07rem 0.09rem;
				border-radius: 0.04rem;

				img {
					width: 0.14rem;
					height: 0.14rem;
				}

				.title_icOne_span {
					color: #cdcece;
					margin: 0 0.07rem;
				}
			}
		}
		.vant {
			position: absolute;
			width: 100%;
			top: 1rem;
			left: 0;
			right: 0;
			bottom: 0;
			background: #f2f1f6;

			.vants {
				color:red !important;
				.vantss {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					margin: 20% 0;

					img {
						width: 1rem;
						height: 1rem;
					}
					p{
						color:#828283;
					}
				}
			}
		}
		
	}
</style>
