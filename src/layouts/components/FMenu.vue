<template>
    <div class="side" :style="{width: sideWidth}">
        侧边菜单
    </div>
</template>

<script setup>
import { useAdminStore } from '~/store'
import { storeToRefs } from 'pinia';
const store = useAdminStore()
const {sideWidth} = storeToRefs(store)
</script>

<style scoped>
.side{
    @apply h-screen bg-blue-200
}
</style>