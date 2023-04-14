<template>
    <div class="v-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 h-16">
        <div class="v-center text-xl w-48 ml-2">
            <el-icon class="mr-1 text-3xl">
                <ElementPlus />
            </el-icon>
            极客空间
        </div>
        <el-icon class="icon-btn">
            <Fold />
        </el-icon>

        <div class="v-center ml-auto">
            <el-icon class="icon-btn">
                <Refresh />
            </el-icon>
            <el-icon class="icon-btn" @click="toggle">
                <FullScreen v-if="!isFullscreen" />
                <Aim v-else />
            </el-icon>
            <el-icon class="icon-btn">
                <Printer />
            </el-icon>
            <el-icon class="icon-btn">
                <Setting />
            </el-icon>
            
            <el-dropdown class="f-center mx-5 h-64 cursor-pointer">
              <span class="v-center text-light-50">
                <el-avatar class="mr-2" :size="25" :src="adminInfo.avatar"/>
                {{ adminInfo.username }}
                <el-icon class="el-icon-right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="rePassword">修改密码</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
            </el-dropdown>
        </div>
    </div>

    <!-- 抽屉 -->
    <el-drawer v-model="showDrawer" title="修改密码" size="30%" :close-on-click-modal="false">
        <el-form label-width="80px" ref="formRef" :rules="rules" :model="form">
          <el-form-item label="旧密码" prop="oldpassword">
            <el-input placeholder="请输入旧密码" v-model="form.oldpassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" placeholder="请输入密码" show-password v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" placeholder="请输入确认密码" show-password v-model="form.repassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="UpdatePass" :loading="loading">提交</el-button>
          </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '~/store'
import { useRouter } from 'vue-router';
import { showModal, toast } from '~/composables/util'
import { useFullscreen } from '@vueuse/core'
import { reactive, ref } from 'vue';

const {isFullscreen, toggle} = useFullscreen()
const store = useAdminStore()
const {adminInfo} = storeToRefs(store)
const {getInfo, adminLogout, updatepassword} = store
const router = useRouter()


getInfo()

const handleLogout = ()=>{
    showModal('是否要退出登录?').then(()=>{
        adminLogout()
        toast('退出登录成功')
        router.push('/login')
    })
}

// 修改密码相关
const showDrawer = ref(false)
const rePassword = () =>{
    showDrawer.value = true
}

const form = reactive({
    oldpassword: '123456',
    password: 'admin',
    repassword: 'admin'
    // oldpassword: '',
    // password: '',
    // repassword: ''
})

const formRef = ref(null)
const loading = ref(false)

const rePassRule = (rule, value, callback)=>{
    if(value === ''){
        callback(new Error('密码不能为空!'))
    }else if(value !== form.password){
        callback(new Error('确认密码必须和新密码一致'))
    }else{
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

//提交修改密码
const UpdatePass = ()=>{
    formRef.value.validate((valid)=>{
        if (!valid){
            return false
        }
        loading.value = true
        setTimeout(()=>{
            updatepassword(form).then((res)=>{
                if (res.code === 1){
                    toast('修改密码成功,请重新登录')
                    adminLogout()
                    router.push('/login')
                    console.log(res)
                }else{
                    toast(res.msg,'error')
                    form.oldpassword = '123456'
                    form.password = 'admin'
                    form.repassword = 'admin'
                }
            })
            .finally(()=> {
                loading.value = false
                showDrawer.value = false
            })
        },1000);
    })
}



</script>

<style scoped lang="postcss">
.icon-btn{
    @apply flex justify-center items-center mx-1 cursor-pointer
}
.icon-btn:hover{
    @apply bg-indigo-300
}
.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
  }
  
  .btn {
    @apply w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full;
  }
</style>