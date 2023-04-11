import { getToken } from '~/utils/auth'
import router from '~/router'
import { toast } from '~/utils/toast'

//全局路由前置守卫
router.beforeEach((to, from, next) => {
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

    //设置页面标题
    let title = '极客空间 - ' + (to.meta.title ? to.meta.title : '')
    document.title = title

    next()
})