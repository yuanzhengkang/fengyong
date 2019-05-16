<!-- 待发货 -->
<template>
	<div class='MyOderChildrenIcthree'>
		<div class="footer" v-for='(s,index) in divs' :key='index' v-if='divs'>
			<div class="visbel" v-for='(i,index) in s.orderGoodsVoList' :key='index'>
				<div class='visbel_icone'>
					<div class='visbel_icone_img'><img src="../../../assets/image/ic_homeq.png" alt=""><span class='dealerName'>{{s.dealerName}}</span><img src="" alt=""></div>
					<div class='visbel_icone_img_span'>待发货</div>
				</div>
				<div class='visbel_ictwo' @click='letGo(divs[index])'>
					<div><img :src="i.picUrl" alt=""></div>
					<div>{{i.goodsName}}</div>
				</div>
				<div class='visbel_icthree'>
					<div class='visbel_icthree_div'>共<span>{{s.orderGoodsVoList.length}}</span>种</div>
					<div class='visbel_icthree_div_ictw'>订单金额：￥<span class='visbel_icthree_div_span'>{{i.preferentialTotalPrice | sps}}</span>.<span>{{i.preferentialTotalPrice | spi}}</span></div>
				</div>
				<div class='visbel_icfour'>
					<div @click='cancelOrder(s)'>取消订单</div>
				</div>
			</div>
		</div>
		<div class="after" v-if='divs'></div>
		<div class='MyOderChildrenIcthreeIcone' v-if='!divs'>
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
				divs: null
			}
		},
		methods: {
			goTosend() {
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					pageNum: 1,
					pageSize: 10,
					siteId: this.$store.state.getByUser.stationId
				}
				this.$ajax.getToSend(data).then(res => {
					if (res.data.status.statusCode === 0) {
						if(res.data.result.list.length){
							this.divs = res.data.result.list;
						}
						// console.log(res)
					}
				})
			},
			...goLocaltion,
			cancelOrder(res){
				this.$store.commit('setMainOrderNo',res.orderNo)
				this.$router.push('/cancelorder')
			}
		},
		created() {
			this.goTosend()
		},
		filters:{
			sps(res){
				return res.toString().split('.')[0]
			},
			spi(res){
				if(res.toString().split('.').length < 2){
					return "00"
				}else{
					return res.toString().split('.')[1].slice(0,2)
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	.MyOderChildrenIcthree {
		background: #f2f1f6;
		height: 100%;
		overflow: hidden;

		.footer{
			margin:0 0 0.1rem;
			background:#fff;
			.visbel{
				/* padding:0.09rem 0.14rem; */
				.visbel_icone{
					padding:0.14rem 0.14rem;
					display:flex;
					justify-content: space-between;
					align-items: center;
					
					.visbel_icone_img{
						font-size:0.14rem;
						display:flex;
						align-items: center;
						img:first-child{
							width:0.24rem;
							height:0.24rem;
						}
						.dealerName{
							margin:0 0.05rem;
						}
					}
					.visbel_icone_img_span{
						color:#DD3333;
					}
				}
				.visbel_ictwo{
					padding:0.14rem 0.14rem;
					background:#f8f8f8;
					display:flex;
					align-items: center;
					div:first-child{
						
						img:first-child{
							width:0.54rem;
							height: 0.54rem;
						}
					}
					div:last-child{
						flex:1;
						font-size:0.14rem;
						height:0.52rem;
						padding:0 0.15rem;
					}
				}
				.visbel_icthree{
					padding:0.14rem 0.14rem;
					display:flex;
					align-items: center;
					justify-content: flex-end;
					border-bottom:1px solid #eeeeee;
					color:#66667f;
					
					.visbel_icthree_div{
						margin:0 0.15rem;
					}
					.visbel_icthree_div_ictw{
						.visbel_icthree_div_span{
							font-size:0.16rem;
						}
					}
				}
				.visbel_icfour{
					padding:0.14rem 0.14rem;
					display:flex;
					align-items: center;
					justify-content: flex-end;
					div{
						padding:0.1rem 0.15rem;
						border:1px solid #cccccc;
						color:#000000;
						display:flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		
		.after{
			background:#f2f1f6;
			z-index:-1;
			position:absolute;
			top: 1.33rem;
			right: 0;
			left: 0;
			bottom: 0;
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
