<template>
	<div class="newStaff">
		<headGoBack goBackBoo="true" title='新增员工'></headGoBack>
		<div class="footer" v-for='(i,index) in divs' :key='index'>
			<div class='footerIcone'>
				<span>联系方式</span><input type="text" placeholder="手机号,此手机号作为员工登陆账号" v-model='phone'>
			</div>
			<div class='footerIctwo'>
				<div class='footerIctwoDiv'>
					<div class='footerIctwoDiv_icone'>
						<span>员工</span>
						<input type="text" placeholder="姓名" v-model="names">
					</div>
					<div class='footerIctwoDiv_ictwo'>
						<span v-for='(i,index) in mins' :key='index' :class='[index == current ? "active":""]' @click='cli(index)'>{{i.value}}<img
							 v-if="index == current" src="../../../assets/image/autotrophy.png" alt=""></span>
					</div>
				</div>
			</div>
			<div class="bom">
				<div>所属门店</div>
				<div class='bomTwo'>{{i.storeName}}</div>
			</div>
		</div>
		<div class="cooki" @click='btn'>
			保存
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mins: [{
					value: '先生'
				}, {
					value: '女士'
				}],
				current: 0,
				phone:'',
				names:'',
				divs:null
			}
		},
		methods: {
			cli(res) {
				this.current = res;
			},
			btn() {
				let data = {
					buId: 16546,
					groupId: this.$store.state.getByUser.groupId,
					phone: this.phone,
					realname: this.names,
					sex: false,
					shopId: this.$store.state.getByUser.id,
					storeIds: 66958
				}
				if(this.phone && this.realname){
					this.$ajax.addStaffForApp(data).then(res => {
						this.$toast(res.data.status.statusReason)
					})
				}else{
					this.$toast('请输入完整信息')

				}
				
			},
			getAjax(){
				let data = {
					groupId:this.$store.state.getByUser.groupId
				}
				this.$ajax.getListOfShopByGroupId(data).then(res => {
					if(res.data.status.statusCode === 0){
						this.divs = res.data.result.items;
					}
				})
			}
		},
		created(){
			this.getAjax()
		}
	}
</script>

<style scoped lang='scss'>
	.newStaff {
		.footer {
			font-size: 0.14rem;
			padding: 0.12rem 0;

			.footerIcone {
				color: #666666;
				display: flex;
				border-bottom: 1px solid #f1f2f6;
				align-items: center;
				padding: 0.12rem 0;
				margin: 0 0 0 0.1rem;

				span {
					margin: 0 0.1rem 0 0;
				}

				input {
					flex: 1;
				}
			}

			.footerIctwo {
				color: #666666;
				display: flex;
				/* border-bottom: 1px solid #f1f2f6; */
				align-items: center;
				padding: 0.12rem 0 0 0;
				margin: 0 0 0 0.1rem;

				.footerIctwoDiv {
					display: flex;
					align-items: center;
					flex-direction: column;
					flex: 1;

					.footerIctwoDiv_icone {
						width: 100%;
						display: flex;

						input {
							flex: 1;
							margin: 0 0 0 0.38rem;
							padding: 0 0 0.12rem 0;
							border-bottom: 1px solid #f1f2f6;
						}
					}

					.footerIctwoDiv_ictwo {
						width: 70%;
						display: flex;
						/* justify-content: flex-end; */
						padding: 0.12rem 0;

						/* border-top:1px solid #ccc; */
						span {
							padding: 0.08rem 0.2rem;
							border: 1px solid #cccccc;
							color: #666666;
							border-radius: 0.03rem;
							margin: 0 0.03rem;
							position: relative;

							img {
								width: 0.15rem;
								height: 0.15rem;
								position: absolute;
								top: -1px;
								right: -1px;
							}
						}

						.active {
							color: #DD3333;
							border: 1px solid #DD3333;
							border-radius: 0.03rem;
						}
					}
				}
			}

			.bom {
				color: #666666;
				display: flex;
				align-items: center;
				padding: 0 0.14rem;
				border-top: 1px solid #f1f2f6;
				border-bottom: 1px solid #f1f2f6;
				padding: 0.12rem 0.14rem;

				.bomTwo {
					margin: 0 0 0 0.1rem;
				}
			}
		}

		.cooki {
			background: #DD3333;
			color: #fff;
			position: fixed;
			width: 100%;
			height: 0.44rem;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 0.17rem;
		}
	}
</style>
