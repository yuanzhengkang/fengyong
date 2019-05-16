<!-- 取消订单 -->
<template>
	<div class="cancelorder">
		<headGoBack title='我的订单' :goBackBoo='goBackBoo'></headGoBack>
		<div class="footer">
			<span class='footerIcone'>温馨提示:</span>
			<span>1.订单取消后无法恢复</span>
			<span>2.订单已支付的金额将返回原支付渠道中</span>
			<span>3.拆弹后取消订单,使用的优惠券将不再返还</span>
		</div>
		<div class="cO_reasons">
			<div class='cO_reasonsIcdiv'>
				请选择取消订单的原因<span>(必选)</span>
			</div>
			<div class='cO_reasonsIcdivOne' v-for='(i,index) in reasonsIcdivOne' :key='index' @click='click(index,i)'>
				<span :class='["cO_reasonsIcspan",index+1 == current ? "active":""]'>
					<img src="../../../../assets/image/ic_checked.png" alt="">
				</span>
				<div class='div'>
					<span>{{i.itemName}}</span>
				</div>
			</div>
		</div>
		<div class="nulls"></div>
		<div class="commits" v-if='current' @click='commits(ref)'>
			提交
		</div>
		<div class="commit" v-else>
			提交
		</div>
	</div>
</template>

<script>
	import headGoBack from '../../../../commonComponents/headGoBack.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				goBackBoo: true,
				reasonsIcdivOne: null,
				current: null,
				res: 1,
				ref: null,
				judge:null
			}
		},
		methods: {
			getAjax() {
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					orderNo: this.$store.state.mainOrderNo
				}
				this.$ajax.getCancelReason(data).then(res => {
					if (res.data.status.statusCode === 0) {
						this.reasonsIcdivOne = res.data.result;
					}
				})
			},
			click(res, ref) {
				this.current = res + 1;
				this.ref = ref;
				// console.log(res)
			},
			commits(res) {
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					orderNo: this.$store.state.mainOrderNo,
					orderCancelReason: parseInt(res.itemCode),
					ancelReason: encodeURIComponent(res.itemName)
				}
				axios.post('https://web-gateway.newbeescm.com/b2b-app-web/cancelOrder' + '?merchantId=14948&orderNo=' + data.orderNo +
					'&orderCancelReason=' + data.orderCancelReason + '&cancelReason=' + data.ancelReason).then(res => {
					this.judge = res.data.result;
					// console.log(this.reasonsIcdivOne == undefined)
				})
					this.$router.push('/MyOderChildrenIcone')
			}
		},
		components: {
			headGoBack
		},
		created() {
			this.getAjax()
		}
	}
</script>

<style scoped lang='scss'>
	.cancelorder {
		background: #f2f1f6;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		.footer {
			background: #fff;
			display: flex;
			/* align-items: center; */
			flex-direction: column;
			justify-content: center;
			padding: 0.14rem 0.16rem;

			span {
				padding: 0.05rem 0;
				color: #686768;
			}

			.footerIcone {
				font-size: 0.16rem;
				color: black;
			}
		}

		.cO_reasons {
			margin: 0.1rem 0 0 0;
			background: #fff;

			.cO_reasonsIcdiv {
				padding: 0.14rem 0.16rem;
				border-bottom: 1px solid #eeeeee;
				color: #3c4245;

				span {
					color: #ccc;
					margin: 0 0.05rem;
				}
			}

			.cO_reasonsIcdivOne {
				display: flex;
				align-items: center;

				/* padding: 0.14rem 0; */
				.cO_reasonsIcspan {
					display: inline-block;
					width: 0.15rem;
					height: 0.15rem;
					border: 1px solid #ccc;
					border-radius: 50%;
					margin: 0 0 0 0.1rem;
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						width: 0.15rem;
						height: 0.15rem;
						display: none;
					}
				}

				.active {
					display: inline-block;
					width: 0.15rem;
					height: 0.15rem;
					border: none;
					border-radius: 50%;
					margin: 0 0 0 0.1rem;
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						width: 0.15rem;
						height: 0.15rem;
						display: block;
					}
				}

				.div {
					padding: 0.14rem 0.06rem;
					border-bottom: 1px solid #f4f4f4;
					color: #3c4245;
					/* height:0.28rem; */
					width: 100%;
					display: flex;
					align-items: center;
				}


			}

			.cO_reasonsIcdivOne:last-child {
				.div {
					border: none;
				}
			}
		}

		.nulls {
			height: 1rem;
			background: #f2f1f6;
		}

		.commit {
			background: #e29193;
			position: fixed;
			bottom: 0;
			height: 0.44rem;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			color: #fff;
			font-size: 0.16rem;
			line-height: 0.44rem;
			text-align: center;

		}

		.commits {
			background: #DD3333;
			position: fixed;
			bottom: 0;
			height: 0.44rem;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			color: #fff;
			font-size: 0.16rem;
			line-height: 0.44rem;
			text-align: center;
		}
	}
</style>
