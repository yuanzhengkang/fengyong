import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const state = {
  id: '',
  stationId: '',
  loginUser: '',
  getByUser: '',
  myUser: '',
  pathName: '',
  token: '',
  loginBoo: false,
  userInfo: [],
  homeData: {},
  isCheck: true,
  goodsName: "",
  goodsNum: "",
  brandName: "",
  dealeName: "",
  brandId: '',
  searchCommodity: [],
  searchSupplier: [],
  custId: '',
  dealerName: '',
  dealerId: '',
  mainOrderNo: '',
  custId: '',
  setcustId: '',
  saletype: '',
  commodityDetailsSkuId: "",
  commodityDetailsUserId: "",
  dealeNameId: '',
  Myshop: '',
  shopName:'',
  parce:"",
  contactsName:'',
  phone:'',
  validShoppingCartDealerVos: {}
}
const mutations = {
  setLoginUser(state, loginUser) {
    state.loginUser = loginUser
  },
  setId(state, id) {
    state.id = id
  },
  setByUser(state, res) {
    state.getByUser = res
  },
  setName(state, pathName) {
    state.pathName = pathName
  },
  setToken(state, token) {
    state.token = token
  },
  setMyUser(state, myUser) {
    state.myUser = myUser
  },
  setUserInfo(state, user) {
    state.userInfo = []
    for (var i = 0; i < state.userInfo.length; i++) {
      if (state.userInfo[i].tel == user.tel) {
        state.userInfo.splice(i, 1)
      }
    }
    state.userInfo.unshift(user)
  },
  setLoginBoo(state, loginBoo) {
    state.loginBoo = loginBoo
  },
  setStationId(state, stationId) {
    state.stationId = stationId
  },
  setHomeData(state, homeData) {
    state.homeData = homeData
  },
  setIsCheck(state, isCheck) {
    state.isCheck = isCheck
  },
  setBrandId(state, brandId) {
    state.brandId = brandId
  },
  setGoodsNum(state, goodsNum) {
    state.goodsNum = goodsNum
  },
  setGoodsName(state, goodsName) {
    state.goodsName = goodsName
  },
  setBrandName(state, brandName) {
    state.brandName = brandName
  },
  setDealeName(state, dealeName) {
    state.dealeName = dealeName
  },
  setSearchCommodity(state, commodityData) {
    state.searchCommodity.unshift(commodityData)
  },
  setSearchSupplier(state, dealerData) {
    state.searchSupplier.unshift(dealerData)
  },
  searchClearData(state, catalogueNum) {
    if (catalogueNum == 0) {
      state.searchCommodity = []
    } else if (catalogueNum == 1) {
      state.searchSupplier = []
    }
  },
  deleteGoodsName(state) {
    state.goodsName = ''
    state.brandName = ''
    state.dealeName = ''
    state.saletype = ''
  },
  setnewNickName(state, nickname) {
    state.loginUser.nickname = nickname
    state.loginUser.nickname = nickname;
  },
  setMainOrderNo(state, data) {
    state.mainOrderNo = data //我的订单 订单详情 mainOrderNo存储
  },
  setCustId(state, obj) {
    state.custId = obj.custId;
    state.dealerName = obj.dealerName;
    state.dealeNameId = obj.id;
  },
  //常购清单
  setdealerId(state, data) {
    state.dealerId = data
  },
  //常购 custId
  setcustId(state, setcustId) {

    state.setcustId = setcustId
  },
  setSaletype(state, sName) {
    state.saletype = sName
  },
  /**
   * 商品详情字段
   */
  setCommodityDetailsSkuId(state, skuId) {
    state.commodityDetailsSkuId = skuId
  },
  setCommodityDetailsUserId(state, userId) {
    state.commodityDetailsUserId = userId
  },
  //我的小店信息
  setMyshop(state, data) {
    state.Myshop = data

  },
  setshopName(state,data){
    state.shopName=data
  },
  setparce(state,data){
    state.parce=data
  },
  setcontactsName(state,data){
      state.contactsName=data
  },
  setphone(state,data){
    state.phone=data
  },
  logOut(state) {
    for(var i in state){
      if(i == 'userInfo'){
        continue
      }else if(Array.isArray(state[i])){
        state[i] = []
      }else{
        state[i] = ''
      }
    }
  },
  setValidShoppingCartDealerVos(state,data) {
    state.validShoppingCartDealerVos = data
  }
  
}
export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state,
  mutations,
})