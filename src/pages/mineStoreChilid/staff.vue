<!-- 员工管理 员 -->
<template>
	<div class='staff'>
		<headGoBack goBackBoo="true" title='员工管理'></headGoBack>
		<div class="footer" v-for='(i,index) in divs' :key='index'>
			<div class='footerIcone'>{{i.storeName}}</div>
			<div class='footerIctwo' @click='golocal'>
				<div class='footerIctwoIcone'>
					<img src="../../assets/image/ic_delivery_avator.png" alt=""><span class='name'>{{i.mainContacts}}</span><span class='bos'>店长</span><span>{{i.mainContactsPhone}}</span>
				</div>
				<div class='footerIctwoIctwo'>
					<img src="../../assets/image/ic_details_shop.png" alt="">
					<span>全部门店</span>
				</div>
			</div>
		</div>
		<div class="clicks" @click='gostaff'>
			<span>新增员工</span>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				divs: null
			};
		},
		methods: {
			getAjax() {
				let data = {
					groupId: this.$store.state.getByUser.groupId
				}
				this.$ajax.getListOfShopByGroupId(data).then(res => {
					if (res.data.status.statusCode === 0) {
						this.divs = res.data.result.items
					}
				}).catch(err => {
					console.log('err', err)
				})
				let obj = {
					shopId: this.$store.state.getByUser.shopId,
					storeId: this.$store.state.getByUser.storeId
				}
				console.log(obj)
				this.$ajax.queryEmployeeList(obj).then(res => {
					
				}).catch(err => {
					console.log(err)
				})
			},
			golocal(){
				this.$router.push('/staffdetails')
			},
			gostaff(){
				this.$router.push('/newstaff')
			}
		},
		created() {
			this.getAjax()
		}
	}
</script>
<style lang='scss' scoped>
	.staff {
		font-size: 0.14rem;

		.footer {
			.footerIcone {
				padding: 0.12rem 0.14rem;
				background: #fff;
			}

			.footerIctwo {
				margin: 0.01rem 0 0 0;
				background: #fff;

				.footerIctwoIcone {
					padding: 0.12rem 0.14rem;
					display: flex;
					align-items: center;

					.name {
						margin: 0 0.1rem;
					}

					img {
						width: 0.15rem;
						height: 0.17rem;
					}

					.bos {
						font-size: 0.12rem;
						display: inline-block;
						padding: 0 0.03rem;
						border: 1px solid #DD3333;
						color: #DD3333;
						margin: 0 0.13rem 0 0;
						border-radius: 0.02rem;
					}
				}

				.footerIctwoIctwo {
					padding: 0 0.14rem 0.3rem 0.14rem;
					color: #808080;
					display: flex;
					align-items: center;

					img {
						width: 0.15rem;
						height: 0.17rem;
						margin: 0 0.1rem 0 0;
					}
				}
			}
		}

		.background {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: #f2f1f6;
			z-index: -1;
		}

		.clicks {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #DD3333;
			color: #fff;
			padding: 0.13rem 0;

			span {
				font-size: 0.16rem;
			}
		}
	}
</style>
