<!-- 订单详情 -->
<template>
	<div class="orderdetails" v-if='personal'>
		<headGoBack title='订单详情' goBackBoo='true'></headGoBack>
		<div class="oD_banner">
			<img src="../../../../assets/image/ic_cancel.png" alt="">
			<span class='oD_banner_spac'>{{personal.orderStateDesc}}</span>
			<span v-if='!(personal.cancelReason)' class='spanS'>剩余&nbsp;&nbsp;{{zhanshiTime}}:{{time}}</span>
		</div>
		<div class="oD_other">
			<div>
				<span>取消 / 退款进度</span>:<span class='orderStateDescs'>&nbsp;&nbsp;{{personal.orderStateDesc}}</span>
			</div>
			<div class='oD_other_spanIctwo'>
				<span>取消原因</span>:<span class='cancelReason'>{{personal.cancelReason}}</span>
			</div>
			<div class='oD_other_spanIcthree' v-if=''>
				<span>取消时间</span>:<span class="orderTimeText">{{personal.orderTimeText}}</span>
			</div>
		</div>
		<div class="addMess">
			<div class='addMessIcone'>
				<img src="../../../../assets/image/ic_local.png" alt="">
				<span>{{personal.primaryName}}</span>
				<span>{{personal.primaryPhone}}</span>
			</div>
			<div class='addMessIctwo'>
				<span>门店：</span><span>{{personal.shopName}}</span>
			</div>
			<div class='addMessIcthree'>
				<span>收货地址：</span><span>{{personal.address}}</span>
			</div>
		</div>
		<div class="oD_goodLists" v-for='(i,index) in personals' :key='index'>
			<div class='ordersItemHeader'>
				<img src="../../../../assets/image/ic_details_shop.png" alt="">
				<span>{{i.dealerName}}</span>
				<img src="../../../../assets/image/ic_next_grayArrow.png" alt="">
			</div>
			<div class='oD_goodItem' v-for='(s,index) in i.orderGoodsVos' :key='index'>
				<img :src="s.picUrl" alt="">
				<div class='oD_goodItemic'>
					<div class='oD_goodItemicon'>
						<span>{{s.goodsName}}</span>
					</div>
					<div class='oD_goodItemictw'>
						<span class='oD_goodItemictw_text'><span class='daoler'>￥</span><span class='Price'>{{s.originalPrice}}</span> x{{s.totalQuantity}}{{s.secondUnit}}</span><span
						 class='Prices'>￥{{s.originalTotalPrice | money}}</span>
					</div>
				</div>
			</div>
			<div class='oD_notes'>
				<span>付款方式：</span><span>在线支付</span>
			</div>
			<div class='oD_notes'>
				<span>订单备注：</span>
			</div>
		</div>
		<div class="oD_other">
			<div class='oD_otherico'>
				<span>订单编号：</span>
				<span>{{personal.outOrderNo}}</span>
				<span class='copys' @click='copysClick' :data-clipboard-text='personal.outOrderNo'>复制</span>
			</div>
			<div class='oD_otherict'>
				<span>下单时间：</span>
				<span>{{personal.orderTimeText}}</span>
			</div>
		</div>
		<div class="oD_pay">
			<div>
				<span>总商品金额：</span><span>￥{{personal.payableAmount | money}}</span>
			</div>
			<div>
				<span>已省：</span><span>-￥{{personal.couponQuanAmount | money}}</span>
			</div>
			<div>
				<span>优惠券：</span><span>-￥{{personal.orderLevel | money}}</span>
			</div>
			<div>
				<span>应付总金额：</span><span class='oD_pay_moneys'>￥{{personal.paymentAmount | money}}</span>
			</div>
		</div>
		<div class="orderItemDeal" v-if='!(personal.cancelReason)'>
			<div @click='goBack(personal)'>取消订单</div>
			<div>立即付款</div>
		</div>
		<div class='agin' v-if='personal.cancelReason'>
			<div>再次购买</div>
		</div>
	</div>
</template>

<script>
	import headGoBack from '../../../../commonComponents/headGoBack.vue'
	import Clipboard from 'clipboard'
	export default {
		data() {
			return {
				footers: null,
				personal: null,
				personals:null,
				time:null,
				zhanshiTime:0,
				spanTime:false
			}
		},
		methods: {
			getApi() {
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					orderNo: this.$store.state.mainOrderNo
				}
				this.$ajax.getOrderDetail(data).then(res => {
					console.log(res)
					if (res.data.status.statusCode === 0) {
						this.personal = res.data.result;
						this.personals = res.data.result.orderDealerVoList;
						this.mainOrderNo = res.data.result.mainOrderNo;
						
						let setTime = setInterval(()=>{		
							let _this = this;
							let date = new Date().getTime();
							let time = new Date(res.data.result.orderTimeText).getTime()+30*60*1000;
							let miao = (time - date) / 1000;
							this.time = (miao % 60).toString().slice(0,2);	 					//秒数
							this.zhanshiTime = (miao / 60).toString().slice(0,2);						//分数
							// console.log('111')
							
							
							if(date > time){
								time += time+24*60*60*1000		//为了防止23.00 - 00.00的BUG
							}
							if(this.zhanshiTime <= 0){
								this.zhanshiTime = '00'
							}
							if(this.time <= 0){
								this.time = '00'
							}
							if(this.time.toString().split('.')[0]){
								this.time = '0' + this.time.toString().split('.')[0]
							}
							if(this.zhanshiTime.toString().split('.')[0]){
								this.zhanshiTime = '0' + this.zhanshiTime.toString().split('.')[0]
							}
							if(this.time.length>=3){
								this.time = this.time.toString().slice(1,3)
							}
							if(this.zhanshiTime.length>=3){
								this.zhanshiTime = this.zhanshiTime.toString().slice(1,3)
							}
							if(this.zhanshiTime == '00' && this.time == '00'){
								this.spanTime = false
								clearInterval(setTime)
							}else{
								this.spanTime = true
							}
						},1000)
					}
				})
				this.$ajax.wayBillDetail(data).then(res => {
					// console.log('data', res)
					if (res.data.status.statusCode === 0) {
						this.footers = res.data.result.orderGoodsVoList;
					}
				})
				
			},
			copysClick() {
				var clipboard = new Clipboard('.copys')
				clipboard.on('success', e => {
					this.$toast('复制成功')
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					this.$toast('该浏览器不支持自动复制')
					clipboard.destroy()
				})
			},
			goBack(ref){
				this.$store.commit('setMainOrderNo', ref.orderNo)
				this.$router.push('/cancelorder')
			}
		},
		components: {
			headGoBack
		},
		created() {
			this.getApi()
		},
		filters: {
			money(res) {
				// console.log(res.toString().split('.').length)
				if (res.toString().split('.').length <= 2) {
					return res.toString().split('.')[0] + '.' + '00'
				} else {
					return res.toString().split('.')[0] + '.' + res.toString().split('.')[1].slice(0, 2)
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	.orderdetails {
		background: #f2f1f6;

		.oD_banner {
			height: 0.75rem;
			display: flex;
			align-items: center;
			background-image: linear-gradient(-90deg, #F46839 3%, #DD3333 100%);
			padding: 0 0.14rem;

			img {
				width: 0.2rem;
				height: 0.2rem;
				margin: 0 0.09rem 0 0;
			}

			.oD_banner_spac {
				/* font-weight: bold; */
				font-size: 0.18rem;
				color: #fff;
				/* font-weight: 700; */
			}
			.spanS{
				color:#fff;
				font-size:0.18rem;
				position:absolute;
				right:0.1rem;
			}
		}

		.oD_other {
			font-size: 0.15rem;
			margin: 0.1rem 0 0.1rem 0;
			padding: 0.12rem 0.14rem;
			background: #fff;
			display: flex;
			flex-direction: column;
			
			div {
				margin: 0 0 0.1rem 0;
				.orderStateDescs{
					color:#6eb7ab;
				}
			}
			
			.oD_other_spanIctwo{
				.cancelReason{
					margin:0 0.05rem;
				}
			}
			.oD_other_spanIcthree{
				.orderTimeText{
					margin:0 0.05rem;
				}
			}

			div:last-child {
				margin: 0;
			}
		}

		.addMess {
			padding: 0.12rem 0.14rem;
			background: #fff;

			.addMessIcone {
				display: flex;
				align-items: center;

				span:nth-of-type(1) {
					margin: 0 0.16rem 0 0.1rem;
				}

				img {
					width: 0.14rem;
					height: 0.16rem;
				}
			}

			.addMessIctwo {
				margin: 0.14rem 0 0.06rem 0;
			}

			.addMessIctwo,
			.addMessIcthree {
				font-family: PingFangSC-Regular;
				font-size: 0.12rem;
				color: #666666;
				letter-spacing: -0.22px;
			}
		}

		.oD_goodLists {
			margin: 0.1rem 0;
			background: #fff;

			.ordersItemHeader {
				padding: 0.12rem 0.14rem;
				display: flex;
				align-items: center;

				img:nth-of-type(1) {
					width: 0.16rem;
					height: 0.16rem;
				}

				span {
					margin: 0 0.08rem 0 0.1rem;
					font-size: 0.15rem;
				}

				img:last-child {
					width: 0.06rem;
					height: 0.12rem;
				}
			}

			.oD_goodItem {
				padding: 0.12rem 0.14rem;
				display: flex;
				justify-content: space-between;
				border-top: 1px solid #eeeeee;
				border-bottom: 1px solid #eeeeee;

				img {
					width: 1rem;
					height: 1rem;
				}

				.oD_goodItemic {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin: 0 0.1rem;
					flex: 1;

					.oD_goodItemictw {
						display: flex;
						justify-content: space-between;

						.oD_goodItemictw_text {
							color: #666666;
							font-size: 0.12rem;
						}

						.daoler {
							color: #DD3333;
						}

						.Price {
							color: #DD3333;
							font-size: 0.16rem;
						}

						span {
							font-size: 0.13rem;
						}

						.Prices {
							font-size: 0.16rem;
							color: #DD3333;
						}
					}

					.oD_goodItemicon {
						span {
							font-size: 0.14rem;
						}
					}
				}
			}

			.oD_notes {
				padding: 0.12rem 0.14rem;
				border-bottom: 1px solid #eeeeee;
				display: flex;
				justify-content: space-between;
			}
		}

		.oD_other {
			font-size: 0.13rem;

			.oD_otherico {
				display: flex;
				align-items: center;

				span:nth-of-type(2) {
					margin: 0 0.06rem 0 0;
				}

				.copys {
					padding: 0.04rem 0.04rem;
					background: #1ea5f7;
					color: #fff;
				}
			}

			.oD_otherict {
				display: flex;
				align-items: center;

				span:nth-of-type(2) {
					margin: 0 0.06rem 0 0;
				}
			}
		}

		.oD_pay {
			padding: 0.12rem 0.14rem;
			background: #fff;

			div {
				font-size: 0.14rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0.06rem 0;

				.oD_pay_moneys {
					color: #DD3333;
					font-size: 0.17rem;
				}
			}
		}

		.orderItemDeal {
			padding: 0.12rem 0.14rem;
			font-size: 0.14rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background: #fff;
			border-top: 1px solid #eeeeee;

			div {
				padding: 0.1rem 0.15rem;
			}

			div:first-child {
				margin: 0 0.1rem 0 0;
				border: 1px solid #999999;
				color: #000000;
			}

			div:last-child {
				border: 1px solid #DD3333;
				color: #DD3333;
			}
		}
		.agin{
			background:#fff;
			display:flex;
			align-items: center;
			justify-content: flex-end;
			padding:0.12rem 0.14rem;
			div{
				padding:0.11rem 0.15rem;
				color:#DD3333;
				border:1px solid #DD3333;
				font-size:0.14rem;
			}
		}
	}
</style>
