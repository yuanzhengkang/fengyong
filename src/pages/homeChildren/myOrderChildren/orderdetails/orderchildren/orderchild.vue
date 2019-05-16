<!-- 全部 -->
<template>
	<div class='orderchild'>
		<div class="footer" v-for='(i,index) in divs' :key='index'>
			<div class='footer_icone'>
				<div class='footer_iconeIcone'><img src="../../../../../assets/image/autotrophy.png" alt=""><span class='spanOne'>订单编号：</span><span>{{i.outOrderNo}}</span></div>
				<div class='div_two'>{{i.orderStateDesc}}</div>
			</div>
			<div class='footer_ictwo'>
				<img :src="s.picUrl" alt="" v-for='(s,indes) in i.orderGoodsVoList' :key='indes'>
				<span v-if='i.orderGoodsVoList.length <= 1' class='orderGoodspans'>{{i.orderGoodsVoList[0].goodsName}}</span>
			</div>
			<div class='footer_icthree'>
				<div class='footer_icthree_divOne'>共<span>{{i.orderGoodsVoList.length}}</span>件</div>
				<div>订单金额：￥<span>{{i.payableAmount}}</span>.<span>{{i.payableAmount}}</span></div>
			</div>
			<div class='footer_icfour'>
				<div class='footer_icfour_div'>再次购买</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				divs: null,
				pageNum:1
			}
		},
		methods:{
			getAllOrder(){
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					pageNum: 1,
					pageSize: 10,
					siteId: this.$store.state.getByUser.stationId
				}
				this.$ajax.myOrder(data).then(res => {
					// console.log(res)
					if (res.data.status.statusCode === 0) {
						this.divs = res.data.result.list;
					}
				})
			}
		},
		created(){
			// this.getAllOrder()
		}
	}
</script>

<style scoped lang='scss'>
	.orderchild{
		background:#f2f1f6;
		.footer{
			background:#fff;
			margin:0 0 0.1rem 0;
			.footer_icone{
				display:flex;
				align-items: center;
				justify-content: space-between;
				padding:0.12rem 0.14rem;
				font-size:0.14rem;
				color:#686868;
				
				.footer_iconeIcone{
					display:flex;
					align-items: center;
					
					.spanOne{
						margin:0 0 0 0.1rem;
					}
					.spanTwo{
						color:#DD3333;
					}
					img{
						width:0.16rem;
						height:0.16rem;
					}
				}
				.div_two{
					color:#DD3333;
				}
			}
			.footer_ictwo{
				background:#f8f8f8;
				padding:0.12rem 0.14rem;
				display:flex;
				color:#818181;
				img{
					width:0.54rem;
					height:0.54rem;
					margin:0 0.05rem;
				}
				img:first-child{
					margin:0 0.05rem 0 0;
				}
				.orderGoodspans{
					margin:0 0 0 0.1rem;
				}
			}
			.footer_icthree{
				display:flex;
				align-items: center;
				justify-content: flex-end;
				padding:0.12rem 0.14rem;
				color:#686868;
				
				.footer_icthree_divOne{
					margin:0 0.1rem;
				}
			}
			.footer_icfour{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding:0.12rem 0.14rem;
				.footer_icfour_div{
					display:flex;
					align-items: center;
					justify-content: center;
					color:#DD3333;
					border:1px solid #DD3333;
					padding:0.08rem 0.12rem;
				}
			}
		}
	}
</style>
