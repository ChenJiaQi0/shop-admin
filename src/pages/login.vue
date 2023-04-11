<template>
    <div>
        <el-row class="w-full h-screen">
            <el-col :span="14" class="bg-indigo-500 flex justify-center items-center text-light-50 flex-col">
                <p class="text-5xl font-bold">shop admin</p>
                <p class="text-3xl">shop admin</p>
            </el-col>
            <el-col :span="10" class="flex flex-col justify-center items-center">
                <h2 class="text-gray-600 text-3xl">后台登录</h2>
                <div class="flex justify-center items-center my-5 space-y-2">
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                    <span>账号密码登录</span>
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                </div>
                <el-form>
                    <el-form-item label="Username">
                        <el-input placeholder="Username"/>
                    </el-form-item>

                    <el-form-item label="Password">
                        <el-input type="password" placeholder="Password"/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="default" class="w-full py-4 bg-indigo-600 text-white rounded-full">登 录</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>