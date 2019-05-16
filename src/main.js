import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import 'reset-css'
import './utils/rem'
import Vuex from 'vuex'
import axios from './utils/http'
import echarts from 'echarts'
import { DatetimePicker } from 'vant';
import { Toast  } from 'vant'
import { Dialog } from 'vant';
import filters from './utils/filter';
import Vant from 'vant';
import 'vant/lib/index.css';
import commonComponents from './commonComponents/index'
import { ImagePreview } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import { Actionsheet } from 'vant';
import '../node_modules/vant/lib/index.css'
Vue.prototype.$echarts = echarts 
Vue.use(commonComponents)
Vue.use(Vant)
Vue.use(DatetimePicker);
Vue.use(ImagePreview);
Vue.use(Vuex)
Vue.use(Toast)
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Dialog);
Vue.use(Actionsheet);
Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}
//object.keys返回一个数组
Object.keys(filters).forEach(key => {  
  //前面是过滤器名字，后面是函数体
  Vue.filter(key, filters[key])  
}) 
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


