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
        <el-form label-width="80px">
          <el-form-item label="旧密码">
            <el-input placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" placeholder="请输入确认密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <button type="button" class="bg-indigo-500 text-light-50 w-full p-1 rounded-full">提交</button>
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
import { ref } from 'vue';

const {isFullscreen, toggle} = useFullscreen()
const store = useAdminStore()
const {adminInfo} = storeToRefs(store)
const {getInfo, adminLogout} = store
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




</script>

<style scoped lang="postcss">
.icon-btn{
    @apply flex justify-center items-center mx-1 cursor-pointer
}
.icon-btn:hover{
    @apply bg-indigo-300
}
</style>