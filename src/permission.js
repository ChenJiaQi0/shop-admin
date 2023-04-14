import { getToken } from '~/composables/auth'
import { router, addRoutes } from '~/router'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util'
import { useAdminStore } from './store/index.js'
import { storeToRefs } from 'pinia'



//全局路由前置守卫
router.beforeEach((to, from, next) => {
    const store = useAdminStore()
    // console.log(store)
    const { getInfo } = store
    const { menus } = storeToRefs(store)
    //显示进度条
    showFullLoading()

    const token = getToken()
    if (!token && to.path != '/login') {
        //没有登录,强制退回登录页
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }

    //防止重复登录
    if (token && to.path == '/login') {
        toast('请勿重复登录', 'error')
        return next({
            path: from.path ? from.path : '/'
        })
    }

    let hasNewRoutes = false
    if (token) {
        getInfo().then(res => {
            // console.log(res);
            hasNewRoutes = addRoutes(res.data.menus)
        })
    }

    //设置页面标题
    let title = '极客空间 - ' + (to.meta.title ? to.meta.title : '')
    document.title = title

    hasNewRoutes ? next(to.fullPath) : next()
})

//全局后置守卫
router.afterEach((to, from) => hideFullLoading())