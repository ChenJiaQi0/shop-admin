// 自定义axios的实例
import axios from "axios"
// import { useCookies } from '@vueuse/integrations/useCookies'
import { ElNotification } from 'element-plus'
import { getToken } from '~/utils/util'

const service = axios.create({
    baseURL: "http://127.0.0.1:4523/m1/2571721-0-default/api"
})

//添加请求拦截
service.interceptors.request.use((config) => {
    //从cookie中取出token
    // const cookie = useCookies()
    // const token = cookie.get('admin-token')
    const token = getToken()
    //向head中添加token
    if (token) {
        config.headers['token'] = token
    }
    return config
}, function (error) {
    //对于请求出错,可以做的处理
    return Promise.reject(error)
})

//添加响应拦截
service.interceptors.response.use((res) => {
    //对响应数据处理
    return res.data
}, (error) => {
    ElNotification({
        message: error.response.data.message || '请求失败',
        type: 'error',
        duration: 1000
    })
    return Promise.reject(error)
})


export default service