<template>
    <div>
        <p>{{ token }}</p>
        <p>{{ admin.nickname }}</p>
    </div>
</template>

<script setup>
// import { useCookies } from '@vueuse/integrations/useCookies'
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdmin } from '~/store'

// const cookie = useCookies()
// const token = ref(cookie.get('admin-token'))
const store = useAdmin()
const {token, admin} = storeToRefs(store)
</script>

<style lang="scss" scoped>

</style>