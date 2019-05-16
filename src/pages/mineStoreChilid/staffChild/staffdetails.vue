<template>
	<div class="staffdetails">
		<headGoBack goBackBoo="true" title='员工详情'></headGoBack>
		<div class="footer" v-for='(i,index) in divs' :key='index'>
			<div class='footerIcone'><span>联系方式</span><span class='footerIconeNum'>{{i.mainContactsPhone}}</span></div>
			<div class='footerIctwo'><span>员工</span><span class='footerIctwoNum'>{{i.mainContacts}}</span></div>
			<div class='footerIcthree'><span>所属门店</span><span class='footerIcthreeNum'>全部门店</span></div>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				divs:null
			}
		},
		methods:{
			getAjax(){
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
			}
		},
		created(){
			this.getAjax()
		}
	}
</script>

<style scoped lang='scss'>
	.staffdetails{
		.footer{
			
			background:#fff;
			font-size:0.14rem;
			.footerIcone{
				padding:0.12rem 0.14rem;
				
				.footerIconeNum{
					margin:0 0.1rem;
				}
			}
			.footerIctwo{
				padding:0.12rem 0.14rem;
				border-top:0.01rem solid #f2f1f6;
				border-bottom:0.01rem solid #f2f1f6;
				.footerIctwoNum{
					margin:0 0.38rem;
				}
			}
			.footerIcthree{
				color:#666666;
				padding:0.12rem 0.14rem;
				.footerIcthreeNum{
					margin:0 0.1rem;
				}
			}
		}
		.background{
			position:absolute;
			width:100%;
			top:0;
			left:0;
			right:0;
			bottom:0;
			z-index: -1;
			background:#f2f1f6;
		}
	}
</style>
