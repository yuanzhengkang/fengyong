import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  //首页切换
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/home',
      component: () => import('../commonPages/Default.vue'),
      children: [
        {path: 'home',name: 'home',component: () => import('../pages/Home.vue')},
        {path: 'list',name: 'list',component: () => import('../pages/List.vue')},
        {path: 'shopping',name: 'shopping',component: () => import('../pages/Shopping.vue'),meta:{requireAuth:true}},
        {path: 'my',name: 'my',component: () => import('../pages/My.vue'),meta:{requireAuth:true}},
      
      ]
    },
    {path: '/login',name: 'login',component: () => import('../pages/Login.vue')},
    //home子页
    {path: '/sellGoods',name: 'sellGoods',component: () => import('../pages/homeChildren/sellGoods.vue')},
    {path: '/selectStores',name: 'selectStores',component: () => import('../pages/homeChildren/selectStores.vue'),meta:{requireAuth:true}},
    {path: '/inputSeeck',name: 'inputSeeck',component: () => import('../pages/homeChildren/inputSeeck.vue')},
    {path: '/couponRedemptionCentre',name: 'couponRedemptionCentre',component: () => import('../pages/homeChildren/couponRedemptionCentre.vue')},
    {path: '/keepList',name: 'keepList',component: () => import('../pages/homeChildren/keepList.vue')},
		//我的订单
     {path: '/myOrder',name: 'myOrder',component: () => import('../pages/homeChildren/myOrder.vue'),
		 redirect:'/MyOderChildrenIcone',
    	children:[
    		{path:'/MyOderChildrenIcone',name:'MyOderChildrenIcone',component: () => import('../pages/homeChildren/myOrderChildren/myOrderChildIcone.vue')},
    		{path:'/MyOderChildrenIctwo',name:'MyOderChildrenIctwo',component: () => import('../pages/homeChildren/myOrderChildren/MyOderChildrenIctwo.vue')},
    		{path:'/MyOderChildrenIcthree',name:'MyOderChildrenIcthree',component: () => import('../pages/homeChildren/myOrderChildren/MyOderChildrenIcthree.vue')},
    		{path:'/MyOderChildrenIcfour',name:'MyOderChildrenIcfour',component: () => import('../pages/homeChildren/myOrderChildren/MyOderChildrenIcfour.vue')},
    		{path:'/MyOderChildrenIcfive',name:'MyOderChildrenIcfive',component: () => import('../pages/homeChildren/myOrderChildren/MyOderChildrenIcfive.vue')}
    	]
    }, 
		// 订单详情
		{path:'/orderdetails',name:'orderdetails',component: () => import('../pages/homeChildren/myOrderChildren/orderdetails/orderdetails.vue')},
    {path: '/mySupplier',name: 'mySupplier',component: () => import('../pages/homeChildren/mySupplier.vue')},
    // 供应商
    {path: '/parentSupplier',name: 'parentSupplier',component: () => import('../pages/homeChildren/mySupplierChildren/parentSupplier.vue'),
      children: [
        {path: '/',name: 'supplierHome',component: () => import('../pages/homeChildren/mySupplierChildren/supplierHome.vue')},
        {path: 'supplierClassify',name: 'supplierClassify',component: () => import('../pages/homeChildren/mySupplierChildren/supplierClassify.vue')},
        {path: 'supplierBrand',name: 'supplierBrand',component: () => import('../pages/homeChildren/mySupplierChildren/supplierBrand.vue')},
        {path: 'supplierRecord',name: 'supplierRecord',component: () => import('../pages/homeChildren/mySupplierChildren/supplierRecord.vue')}
      ]
    },
    {path: '/supplierHome',name: 'supplierHome',component: () => import('../pages/homeChildren/mySupplierChildren/supplierHome.vue')},
    //公共页
    {path: '/commodityDetails',name: 'commodityDetails',component: () => import('../commonPages/commodityDetails')},
    {path: '/goodSeeck',name: 'goodSeeck',component: () => import('../commonPages/goodSeeck')},
    {path: '/detailsOfTheBrand',name: 'detailsOfTheBrand',component: () => import('../pages/homeChildren/detailsOfTheBrand')},
    // 我的页子路由
    {path: '/discountCoupon',name: 'discountCoupon',component: () => import('../pages/myChildren/discountCoupon')},
    {path: '/myAndGoodCollect',name: 'myAndGoodCollect',component: () => import('../pages/myChildren/myAndGoodCollect')},
    {path: '/myProfile',name: 'myProfile',component: () => import('../pages/myChildren/myProfile')},
    {path: '/setting',name: 'setting',component: () => import('../pages/myChildren/setting')},
    //设置子页   ↓
    {path: '/setloginpassword',name: 'setloginpassword',component: () => import('../pages/myChildren/settingChildren/setloginpassword.vue')},
    {path: '/setloginphone',name: 'setloginphone',component: () => import('../pages/myChildren/settingChildren/setloginphone.vue')},
    {path: '/setnickname',name: 'setnickname',component: () => import('../pages/myChildren/settingChildren/setnickname.vue')},
    //          ↑
    //常购清单
    {path: '/supplyDetails',name: 'supplyDetails',component: () => import('../pages/homeChildren/keepListChilidren/supplyDetails.vue')},
		//订单404
		{path:'/oder',name:'oder',component: () => import('../pages/homeChildren/myOrderChildren/orderdetails/oder.vue')},
		//取消订单
		{path:'/cancelorder',name:'cancelorder',component: () => import('../pages/homeChildren/myOrderChildren/orderdetails/cancelorder.vue')},
		//订单搜索
		{path:'/orderSearch',name:'orderSearch',component: () => import('../pages/homeChildren/myOrderChildren/orderdetails/ordersearch.vue'),
		redirect:'/orderchild',
		children: [
			{path:'/orderchild',name:'orderchild',component: () => import('../pages/homeChildren/myOrderChildren/orderdetails/orderchildren/orderchild.vue')}
		]
		},
    //我的小店
    {path:'/minestore',name:'minestore',component:()=>import('../pages/minestore.vue')},
    //我的 商品收藏和店铺收藏
    {path:'/collect',name:'collect',component:()=>import('../pages/myChildren/collect.vue')},
    //优惠券
    {path:'/coupons',name:'coupons',component:()=>import('../pages/myChildren/coupons.vue')},
    //我的小店   店铺管理
    {path:'/bizmanage',name:'bizmanage',component:()=>import('../pages/mineStoreChilid/bizmanage.vue')}, 
    {path:'/bill',name:'bill',component:()=>import('../pages/mineStoreChilid/bill.vue')}, 
    //团购管理
    {path:'/group',name:'group',component:()=>import('../pages/mineStoreChilid/group.vue')},
    //团购管理——子页
    {path: '/recruitCommander',name: 'recruitCommander',component: () => import('../pages/mineStoreChilid/groupChild/recruitCommander.vue')},
    {path: '/activityManagement',name: 'activityManagement',component: () => import('../pages/mineStoreChilid/groupChild/activityManagement.vue')},

    {path:'/indent',name:'indent',component:()=>import('../pages/mineStoreChilid/indent.vue')}, 
    {path:'/outlet',name:'outlet',component:()=>import('../pages/mineStoreChilid/outlet.vue')}, 
    {path:'/run',name:'run',component:()=>import('../pages/mineStoreChilid/run.vue')}, 
    //客户管理
    {path:'/service',name:'service',component:()=>import('../pages/mineStoreChilid/service.vue')}, 
    //客户管理——>子页——>全部客户
    {path:'/serviceSearch',name:'serviceSearch',component:()=>import('../pages/mineStoreChilid/serviceChild/serviceSearch.vue')}, 
    {path:'/shop',name:'shop',component:()=>import('../pages/mineStoreChilid/shop.vue')}, 
    {path:'/staff',name:'staff',component:()=>import('../pages/mineStoreChilid/staff.vue')}, 
    //店铺管理子页
    {path:'/mine',name:'mine',component:()=>import('../pages/bizmanageChild/mine.vue')},
    {path:'/contacts',name:'contacts',component:()=>import('../pages/bizmanageChild/contacts.vue')},
    {path:'/phone',name:'phone',component:()=>import('../pages/bizmanageChild/phone.vue')},
    {path:'/shop1',name:'shop1',component:()=>import('../pages/bizmanageChild/shop1.vue')},
    {path:'/staffdetails',name:'staffdetails',component:()=>import('../pages/mineStoreChilid/staffChild/staffdetails.vue')},//员工详情
    {path:'/newstaff',name:'newstaff',component:()=>import('../pages/mineStoreChilid/staffChild/newStaff.vue')},//新增员工
    //确认订单
    {path:'/confirmAnOrder',name:'confirmAnOrder',component:()=>import('../pages/shoppingChildren/confirmAnOrder.vue'),meta:{requireAuth:true}},
    {path:'/payment',name:'payment',component:()=>import('../pages/shoppingChildren/payment.vue'),meta:{requireAuth:true}},
  ]
})

router.beforeEach((to,from,next)=>{
  let vuex = localStorage.getItem("vuex")&&JSON.parse(localStorage.getItem("vuex"))
  let token = vuex&&vuex.token
  if(to.meta.requireAuth) {
    if(token) {
      next()
    }else{
      next({
        path: '/login',
        query: {"name":to.path}
      })
    }
  }else{
    next()
  }
})

export default router
