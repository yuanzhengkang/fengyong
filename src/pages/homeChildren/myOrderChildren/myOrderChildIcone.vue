<!-- 全部 -->
<template>
	<div class='myOrderChildIcone'>
		<div class='myOrderChildIconeDiv' v-if='divs'>
			<div class="div" v-for='(s,index) in divs' :key='index'>
				<div class="divIcone">
					<div class="divIcone_icone"><img src="../../../assets/image/ic_homeq.png" alt=""><span>蜂网</span></div>
					<div class="divIcone_ictwo">{{s.orderStateDesc}}</div>
				</div>
				<div class="orderItemBody" @click='letGo(divs[index])'>
					<div class="goodDesc">
						<img :src="i.picUrl" alt="" v-for='(i,index) in s.orderGoodsVoList' :key='index'>
						<span v-if='!(s.orderGoodsVoList.length>1)'>{{s.orderGoodsVoList[0].goodsName}}</span>
					</div>
				</div>
				<div class='orderItemFooter'>
					<span class='spanIcone'>共{{s.goodsNum}}种</span><span>订单金额：￥<span>{{s.payableAmount | sps}}</span><span>.{{s.payableAmount | spi}}</span></span>
				</div>
				<div class='orderItemDeal'>
					<div class='orderItemDealdiv' @click='byShopping(s)'>再次购买</div>
				</div>
			</div>
			<div class="botm" v-if='divs'>
				已经没有更多订单了~
			</div>
		</div>
		<div class='MyOderChildrenIcthreeIcone' v-else>
			<img src="../../../assets/image/ic_no_order.png" alt="">
			<p>您还没有相关订单</p>
		</div>
	</div>
</template>

<script>
	import goLocaltion from '../../../utils/yzk/goLocaltion'
	export default {
		data() {
			return {
				divs: null,
				pageNum:1
			}
		},
		methods: {
			goLocaltion() {
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					pageNum: 1,
					pageSize: 10,
					siteId: this.$store.state.getByUser.stationId
				}
				this.$ajax.myOrder(data).then(res => {
					console.log(res)
					if (res.data.status.statusCode === 0) {
						this.divs = res.data.result.list;
					}
				})
			},
			...goLocaltion,
			handleScroll() {
				let _this = this;
				let scrollTop = document.documentElement.scrollTop //||document.body.scrollTop
				let windowHeight = document.documentElement.clientHeight //|| document.body.clientHeight
				let scrollHeight = document.documentElement.scrollHeight// ||document.body.scrollHeight
				if(scrollTop+windowHeight >= scrollHeight - 1){
					let data = {
						merchantId: 14948,
						pageNum: _this.pageNum ++,
						pageSize: 10,
						siteId: 51
					}
					this.$ajax.myOrder(data).then(res => {
						if (res.data.status.statusCode === 0) {
							res.data.result.list.forEach((item)=> {
								_this.divs.push(item)
							})
						}
					})
					
				}
			},
			byShopping(res){
				let data = {
					orderNo:res.orderNo,
					siteId:res.siteId,
					shopId:res.shopId,
					provId:res.provinceId,
					cityId:res.cityId,
					countyId:510116000000,
					streetId:510116003000
				}
				this.$ajax.buyAgain({
					orderNo:res.orderNo,
					siteId:res.siteId,
					shopId:res.shopId,
					provId:res.provinceId,
					cityId:res.cityId,
					countyId:510116000000,
					streetId:510116003000
				}).then(res => {
					if(res.data.status.statusCode === 0){
						
					}
				})
				this.$router.push({
					path:'shopping',
					query:{
						data:data
					}
				})
			}
		},
		created() {
			this.goLocaltion()
			window.addEventListener('scroll', this.handleScroll)
		},
		filters: {
			sps(res) {
				if (isNaN(res)) {
					return res
				} else {
					return res.toString().split('.')[0]
				}
			},
			spi(res) {
				if (!isNaN(res)) {
					if (res.toString().split('.').length < 2) {
						return "00"
					} else {
						return res.toString().split('.')[1].slice(0, 2)
					}
				} else {
					return res
				} 
			}
		}
	}
</script>

<style scoped lang='scss'>
	.myOrderChildIcone {
		background: #f2f1f6;

		.myOrderChildIconeDiv {

			.div {
				/* border:1px solid red; */
				font-size: 0.14rem;
				background: #fff;
				margin: 0 0 0.1rem 0;

				.divIcone {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 0.14rem;
					padding: 0.12rem 0.14rem;

					.divIcone_icone {
						display: flex;
						align-items: center;
						color: #333333;

						img {
							width: 0.24rem;
							height: 0.24rem;
						}
					}

					.divIcone_ictwo {
						color: #DD3333;
					}
				}

				.orderItemBody {
					background: #f8f8f8;
					padding: 0.12rem 0.14rem;
					
					img {
						width: 0.54rem;
						height: 0.54rem;
					}

					.goodDesc {
						display: flex;
						align-items: center;
						overflow:hidden;
						
						img {
							margin: 0 0.05rem 0 0;
						}

						span {
							display: inline-block;
							height: 0.52rem;
						}
					}
				}

				.orderItemFooter {
					padding: 0.12rem 0.14rem;
					text-align: right;
					font-size: 0.14rem;
					color: #666666;

					.spanIcone {
						margin: 0 0.15rem 0 0;
					}
				}

				.orderItemDeal {
					border-top: 1px solid #f8f8f8;
					padding: 0.12rem 0.14rem;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.orderItemDealdiv {
						width: 0.9rem;
						height: 0.32rem;
						border: 1px solid red;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #DD3333;
					}
				}
			}
		}

		.botm {
			height: 0.44rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.12rem;
			color: #999999;
		}

		.MyOderChildrenIcthreeIcone {
			position: absolute;
			top: 1.33rem;
			right: 0;
			left: 0;
			bottom: 0;
			background: #f2f1f6;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			img {
				width: 0.4rem;
				height: 0.43rem;
				margin: 0 0 0.25rem 0;
			}

			p {
				color: #666666;
			}
		}

	}
</style>
