import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/map',   // 跳转路径
            name: 'map',    // 名称
            component: () => import('../components/BaiduMap.vue'),
        },
        {
			path: '',
			redirect: '/map',
		},
    ]
});
