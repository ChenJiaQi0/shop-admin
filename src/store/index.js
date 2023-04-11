import { defineStore } from "pinia"

export const useAdmin = defineStore('admin', {
    state: () => ({
        token: '',
        admin: {
            id: 1,
            role: 'admin',
            nickname: '管理员',
            avatar: ''
        }
    }),
    actions: {
        setStoreToken(token) {
            this.token = token
        },
        changeAvatar(avatar) {
            this.admin.avatar = avatar
        }
    }
})

