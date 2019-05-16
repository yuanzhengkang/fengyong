<!--  我的订单  -->
<template>
	<div class='MyOder'>
		<headGoBack title="我的订单" :goBackBoo='goBackBoos' :path='path'></headGoBack>
		<div class="orderSearchBar">
			<div class="inputWrap" @click='goRoute'>
				<img src="../../assets/image/ic_search.png" alt="" @click='goChildren'>
				<input type="text" placeholder="搜索订单编号、商品名称、供应商名称">
			</div>
		</div><!-- title -->
		<div class="ordersTab">
			<ul>
				<router-link tag = "li" :to = "i.indes" v-for='(i,index) in titleBar' :class='index == currents ? "active":""' :key='index' @click='goChildren(index,i.indes)'>{{i.name}}</router-link>
			</ul>
		</div>
		<router-view class='footer'></router-view>
	</div>
</template>
<script>
	import headGoBack from '../../commonComponents/headGoBack.vue'
	export default {
		data() {
			return {
				goBackBoos: true,
				titleBar: [{
						name: '全部',
						indes: '/MyOderChildrenIcone'
					},
					{
						name: '待付款',
						indes: '/MyOderChildrenIctwo'
					},
					{
						name: '待发货',
						indes: '/MyOderChildrenIcthree'
					},
					{
						name: '待收货',
						indes: '/MyOderChildrenIcfour'
					},
					{
						name: '已完成',
						indes: '/MyOderChildrenIcfive'
					}
				],
				currents: 0,
				divs:null,
				path: ''
			}
		},
		methods: {
			goChildren(ref, res) {
				this.currents = ref;
				this.$router.push(res)
			},
			goRoute(){
				this.$router.push('/orderSearch')
			}
		},
		components: {
			headGoBack
		},
		created(){	
		},
		beforeRouteEnter  (to, from, next) {
			next(vm=>{
				if(from.name=='home'||from.name=='my'){
					vm.path = from.name
				}
				// console.log(from.name)
			})
		},
	}
</script>
<style scoped lang="scss">
	.MyOder {
		overflow:hidden;
		.orderSearchBar {
			height: 0.44rem;
			background-image: linear-gradient(230deg, #f46839 0%, #dd3333 56%);
			position: fixed;
			top:0.43rem;
			width:100%;
			z-index:100;

			.inputWrap {
				position: absolute;
				left: 0.14rem;
				right: 0.14rem;
				top: 0.07rem;
				bottom: 0.07rem;
				background-color: #fff;
				border-radius: 0.15rem;
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding-right: 0.1rem;

				img {
					width: 0.14rem;
					height: 0.14rem;
				}

				input {
					width: 88%;
				}

				input::placeholder {
					font-size: 12px;
				}
			}
		}

		.ordersTab {
			height: 0.448rem;
			border-bottom: 1px solid #ccc;
			position:fixed;
			top:0.882rem;
			width:100%;
			background:#fff;
			z-index:111;

			ul {
				height: 100%;
				display: flex;
				font-size: 0.16rem;
				color: #9a9a9a;
				justify-content: space-around;
				align-items: center;

				li {
					height: 100%;
					display: flex;
					align-items: center;
					&.router-link-exact-active {
						color: #DD3333;
						border-bottom: 2px solid #DD3333;
					}
				}

				
			}
		}
		.footer{
			margin:0.9rem 0 0 0;
		}
	}
</style>
