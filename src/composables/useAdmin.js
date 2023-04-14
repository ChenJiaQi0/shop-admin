import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '~/store'
import { showModal, toast } from '~/composables/util'

export function useLogin() {
    const router = useRouter()
    const loading = ref(false)
    const store = useAdminStore()
    const { adminLogin } = store

    const form = reactive({
        username: 'admin',
        password: 'admin'
    })
    const rules = {
        username: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            }
        ],
    }

    const formRef = ref(null)

    const onSubmit = () => {
        // console.log(formRef.value)
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            loading.value = true
            //发请求
            setTimeout(() => {
                adminLogin(form.username, form.password).then((res) => {
                    toast(res.msg)
                    if (res.code === 1) {
                        router.push('/')
                    }
                    loading.value = false
                })
            }, 1000)
        })
    }
    return {
        loading,
        form,
        formRef,
        onSubmit,
    }
}

export function useRepassword() {
    const router = useRouter()
    const store = useAdminStore()
    const { adminLogout, updatepassword } = store
    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const form = reactive({
        oldpassword: '123456',
        password: 'admin',
        repassword: 'admin'
    })
    const resetForm = () => {
        form.oldpassword = '123456'
        form.password = 'admin'
        form.repassword = 'admin'
    }

    const rePassRule = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('密码不能为空!'))
        } else if (value !== form.password) {
            callback(new Error('确认密码必须和新密码一致'))
        } else {
            callback()
        }
    }
    const rules = {
        oldpassword: [
            {
                message: '旧密码不能为空',
                trigger: 'blur',
                required: true
            }
        ],
        password: [
            {
                message: '新密码不能为空',
                trigger: 'blur',
                required: true
            }
        ],
        repassword: [
            {
                validator: rePassRule,
                trigger: 'blur',
                required: true
            }
        ]
    }


    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            setTimeout(() => {
                updatepassword(form).then((res) => {
                    if (res.code === 1) {
                        toast('修改密码成功,请重新登录')
                        adminLogout()
                        router.push('/login')
                        console.log(res)
                    } else {
                        toast(res.msg, 'error')
                        resetForm()
                    }
                })
                    .finally(() => {
                        formDrawerRef.value.close()
                        formDrawerRef.value.hideLoading()
                    })
            }, 1000);
        })
    }
    const openRepasswordForm = () => {
        formDrawerRef.value.open()
    }
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRepasswordForm
    }
}

export function useLogout() {
    const router = useRouter()
    const store = useAdminStore()
    const { adminLogout } = store
    const handleLogout = () => {
        showModal('是否要退出登录').then(() => {
            adminLogout().then(() => {
                router.push('/login')
                toast('退出登录')
            })

            console.log('退出成功');
        })
    }
    return { handleLogout }
}