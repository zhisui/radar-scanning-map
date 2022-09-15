import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/map',   // 跳转路径
            name: 'map',    // 名称
            component: () => import('../components/BaiduMap.vue'),
        },
    ]
});
