import { getToken } from '~/composables/auth'
import router from '~/router'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util'
// import { useAdminStore } from '~/store'
// const { store } = useAdminStore()
// const { getInfo } = store

//全局路由前置守卫
router.beforeEach((to, from, next) => {
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

    // if (token) {
    //     getInfo()
    // }

    //设置页面标题
    let title = '极客空间 - ' + (to.meta.title ? to.meta.title : '')
    document.title = title

    next()
})

//全局后置守卫
router.afterEach((to, from) => hideFullLoading())