import Vue from 'vue'
import Vant from 'vant'
import { Toast  } from 'vant'
import axios from 'axios'
Vue.use(Vant)
Vue.use(Toast)
axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理
    let vuex = localStorage.getItem('vuex') && JSON.parse(localStorage.getItem('vuex'))
    let token = vuex ? vuex.token : ''
    if (token) {
        config.headers = {
            userId: vuex.id,
            token
        }
    }
    return config;
}, function (error) {
    // 对请求失败做处理
    return Promise.reject(error);
});
//  loginName=18349179063&password=yuanbo1234
let vue = new Vue()
function api(obj) {
    return new Promise((resolve, reject) => {
        vue.$toast.loading({
            message: '加载中...',
            forbidClick: true, // 禁用背景点击
        });
        obj.url = "https://web-gateway.newbeescm.com" + obj.url 
        axios(obj)
            .then(res => {
                resolve(res)
                if(res) {
                    vue.$toast.clear()
                }
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default api