import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import GoodsList from '~/pages/goods/list.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: Admin,
        children: [
            {
                path: '/',
                component: Index,
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/goods/list',
                component: GoodsList,
                meta: {
                    title: '商品管理'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录页'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router




