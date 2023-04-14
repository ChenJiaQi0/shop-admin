import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import GoodsList from '../pages/goods/list.vue'
import Rotograph from '../pages/goods/rotograph.vue'
import Setting from '~/pages/setting.vue'

//默认路由,所有用户共享
const routes = [
    {
        path: '/',
        name: 'admin',
        component: Admin,
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

//动态路由,根据请求得到的菜单数据,动态添加路由
const asyncRoutes = [
    {
        path: '/',
        component: Index,
        name: '/',
        meta: {
            title: '首页'
        }
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: GoodsList,
        meta: {
            title: '商品管理'
        }
    },
    {
        path: '/goods/rotograph',
        name: '/goods/rotograph',
        component: Rotograph,
        meta: {
            title: '商品管理'
        }
    },
    {
        path: '/setting',
        name: '/setting',
        component: Setting,
        meta: {
            title: '系统设置'
        }
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()

})

//动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false

    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            const item = asyncRoutes.find(obj => obj.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute('admin', item)
                hasNewRoutes = true
            }

            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })

    }
    findAndAddRoutesByMenus(menus)
    return hasNewRoutes
}




