<!-- 订单搜索 -->
<template>
	<div class="orderSearch">
		<headGoBack title='订单搜索' :goBackBoo='goBackBoo'></headGoBack>
		<div class="search">
			<div class='searchOne'>
				<img src="../../../../assets/image/ic_search.png" alt="">
				<input type="text" placeholder="搜索订单编号,商品名称,供应商名称" v-model="texts">
			</div>
			<div class='searchTwo' @click='search'>搜索</div>
		</div>
		<div class="searchHistory" v-if='!divs'>
			<div class='searchHistoryDiv'>
				<span>搜索历史</span>
				<img src="../../../../assets/image/wRemove.png" alt="" @click='clear'>
			</div>
			<div class='searchHistoryDivs'>
				<span v-for='(i,index) in local' :key='index' @click='goSearch(i)'>{{i.value}}</span>
			</div>
		</div>
		<div class="footer" v-for='(i,index) in divs' :key='index' v-if='divs'>
			<div class='footer_icone'>
				<div class='footer_iconeIcone'><img src="../../../../assets/image/ic_order.png" alt=""><span class='spanOne'>订单编号：</span><span>{{i.outOrderNo}}</span></div>
				<div class='div_two'>{{i.orderStateDesc}}</div>
			</div>
			<div class='footer_ictwo' @click='goShopping(divs[index])'>
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
		<div class="back"></div>
	</div>
</template>

<script>
	import headGoBack from '../../../../commonComponents/headGoBack.vue'
	export default {
		data() {
			return {
				goBackBoo: true,
				texts: '',
				divs: null,
				pageNum:1,
				historys:[],
				local:null
			}
		},
		methods: {
			search() {
				let data = {
					merchantId: this.$store.state.getByUser.merchantId,
					pageNum: 1,
					pageSize: 10,
					param: this.texts,
					siteId: this.$store.state.getByUser.stationId,
				}
				this.$ajax.searchOrderList(data).then(res => {
					if(res.data.status.statusCode === 0){
						this.divs = res.data.result.list;
						// console.log(this.divs)
					}
				})
				console.log(this.texts)
				if(this.texts){
					this.historys.unshift({value:this.texts})
					if(this.historys.length > 10){
						localStorage.setItem('history',JSON.stringify(this.historys.slice(this.historys.length-10,this.historys.length)))
					}else{
						localStorage.setItem('history',JSON.stringify(this.historys))
					}
				}
			},
			letGo(ref) {
				this.$store.commit('setMainOrderNo', ref.mainOrderNo)
				this.$router.push('/orderdetails')
			},
			handleScroll() {
				let _this = this;
				let scrollTop = document.documentElement.scrollTop //||document.body.scrollTop
				let windowHeight = document.documentElement.clientHeight //|| document.body.clientHeight
				let scrollHeight = document.documentElement.scrollHeight // ||document.body.scrollHeight
				if (scrollTop + windowHeight >= scrollHeight - 1) {
					let data = {
						merchantId: 14948,
						pageNum: _this.pageNum++,
						pageSize: 10,
						siteId: 51
					}
					this.$ajax.myOrder(data).then(res => {
						if (res.data.status.statusCode === 0) {
							res.data.result.list.forEach((item) => {
								_this.divs.push(item)
							})
						}
					})

				}
			},
			goShopping(ref){
				this.$store.commit('setMainOrderNo', ref.mainOrderNo)
				this.$router.push('/orderdetails')
			},
			clear(){
				this.$dialog.confirm({
				  title: '提示',
				  message: '确定删除全部搜索历史吗?'
				}).then(() => {
					localStorage.removeItem('history')
					this.local = null
				}).catch(() => {
				  // on cancel
				});
			},
			goSearch(reg){
				this.texts = reg.value
				this.search()
			}
		},
		components: {
			headGoBack
		},
		filters: {
			sps(res) {
				return res.toString().split('.')[0]
			},
			spi(res) {
				if (res.toString().split('.').length < 2) {
					return "00"
				} else {
					return res.toString().split('.')[1].slice(0, 2)
				}
			}
		},
		created(){
			window.addEventListener('scroll', this.handleScroll)
			this.local = JSON.parse(localStorage.getItem('history'))
		}
	}
</script>

<style scoped lang='scss'>
	.orderSearch {
		overflow:hidden;
		background: #f2f1f6;
		.search {
			position:fixed;
			top:0.43rem;
			width:100%;
			height: 0.44rem;
			display: flex;
			background-image: linear-gradient(230deg, #f46839 0%, #dd3333 56%);
			padding: 0 0.12rem;
			align-items: center;
			justify-content: space-around;

			.searchOne {
				width: 80%;
				height: 0.3rem;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-radius: 0.01rem;

				img {
					width: 0.14rem;
					height: 0.14rem;
				}

				input {
					width: 90%;
					height: 100%;
					border-radius: 0.02rem;
				}

				input::placeholder {
					font-size: 0.12rem;
				}
			}

			.searchTwo {
				font-size: 0.14rem;
				padding: 0.12rem 0.14rem;
				color: #fff;
			}
		}
		
		.searchHistory{
			padding:0.12rem 0.14rem;
			background:#fff;
			.searchHistoryDiv{
				display:flex;
				align-items: center;
				justify-content: space-between;
				span{
					color:#373839;
				}
				img{
					width:0.1rem;
					height:0.12rem;
				}
			}
			.searchHistoryDivs{
				span{
					display:inline-block;
					padding:0.02rem 0.05rem;
					background:#f2f1f6;
					border-radius:0.15rem;
					margin:0.05rem 0.1rem 0.05rem 0;
				}
			}
		}

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
					margin:0 0.03rem;
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
		.back{
			position:absolute;
			width:100%;
			left:0;
			top:0rem;
			right:0;
			bottom:0;
			background: #f2f1f6;
			z-index:-2;
		}
	}
</style>
