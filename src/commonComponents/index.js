import shoppingCar from './shoppingCar.vue'
import rotateNav from './rotateNav.vue'
import headGoBack from './headGoBack.vue'
const commonComponents = {
    install: function(Vue){
        Vue.component('shoppingCar',shoppingCar)
        Vue.component('rotateNav',rotateNav)
        Vue.component('headGoBack',headGoBack)
    }
}

// 导出组件
export default commonComponents