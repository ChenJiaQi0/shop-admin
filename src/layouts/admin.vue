<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
    </el-container>

    <el-container>
        <el-aside :style="{width: sideWidth}">
            <f-menu></f-menu>
        </el-aside >
        <el-main class="main">
            <f-tag-list></f-tag-list>
            <RouterView></RouterView>
        </el-main>
    </el-container>
</template>

<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue';
import { useAdminStore } from '~/store'
import { storeToRefs } from 'pinia'

const store = useAdminStore()
const {sideWidth} = storeToRefs(store)

</script>

<style>
.el-main{
    @apply bg-purple-300 h-screen w-full
}
</style>