<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
    </el-container>

    <el-container>
        <el-aside>
            <f-menu></f-menu>
        </el-aside>
        <el-main>
            <f-tag-list></f-tag-list>
            <RouterView></RouterView>
        </el-main>
    </el-container>
</template>

<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue';
</script>

<style>

</style>