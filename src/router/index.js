import Vue from 'vue';
import VueRouter from 'vue-router';
var routes = null, router = null;

Vue.use(VueRouter);
// 引入路由
import Home from '@/pages/home';

// 定义路由
routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    }
];
// 实例路由
router = new VueRouter({
    mode: 'hash',
    routes: routes
});

export default router;
