<template>
    <div>
        <el-row class="w-full h-screen">
            <el-col :span="14" class="bg-indigo-500 flex justify-center items-center text-light-50 flex-col">
                <p class="text-5xl font-bold">shop admin</p>
                <p class="text-3xl">基于 Vue 3 和 Vite 的后台管理系统</p>
            </el-col>

            <el-col :span="10" class="flex flex-col justify-center items-center">
                <h2 class="text-gray-600 text-3xl">后台登录</h2>
                <div class="flex justify-center items-center my-5 space-y-2">
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                    <span>账号密码登录</span>
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                </div>
                <el-form :model="form" :rules="rules" ref="formRef">
                    <el-form-item prop="username" label=" ">
                        <el-input placeholder="Username" v-model="form.username">
                            <template #prefix>
                                <el-icon>
                                    <user />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password" label=" ">
                        <el-input type="password" placeholder="Password" v-model="form.password">
                            <template #prefix>
                                <el-icon>
                                    <lock />
                                </el-icon>
                            </template>    
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="default" class="w-full py-4 bg-indigo-600 text-white rounded-full" 
                            @click="onSubmit" :loading="loading">登 录</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from 'vue-router'
import { toast } from '~/composables/util'
import { useAdminStore } from '~/store'
import { useLogin } from '~/composables/useAdmin'

const { loading, form, formRef, onSubmit } = useLogin()

// const router = useRouter()
// const loading = ref(false)
// const store = useAdminStore()
// const { adminLogin } = store

// const form = reactive({
//     username: 'admin',
//     password: 'admin'
// })

// //检验规则
// const rules = {
//     username: [
//         {
//             required: true,
//             message: '用户名不能为空',
//             trigger: 'blur'
//         }
//     ],
//     password: [
//         {
//             required: true,
//             message: '密码不能为空',
//             trigger: 'blur'
//         }
//     ],
// }

// const formRef = ref(null)

// const onSubmit = () =>{
//     // console.log(formRef.value)
//     formRef.value.validate((valid)=>{
//         if (!valid){
//             return false;
//         }
//         loading.value = true
//         //发请求
//         setTimeout(()=>{
//             adminLogin(form.username, form.password).then((res)=>{
//                 toast(res.msg)
//                 if (res.code === 1){
//                     router.push('/')
//                 }
//                 loading.value = false
//             })
//         },1000)
//     })
// }
</script>

<style lang="scss" scoped>

</style>