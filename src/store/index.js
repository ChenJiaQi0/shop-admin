import { defineStore } from "pinia"
import { adminLogin, getInfo, logout, updatepassword } from '~/api/admin'
import { setToken, removeToken } from "~/composables/auth"

export const useAdminStore = defineStore('admin', {
    state: () => ({
        token: '',
        adminInfo: {
            // id: 1,
            // role: 'admin',
            // nickname: '管理员',
            // avatar: ''
        }
    }),
    actions: {
        // setStoreToken(token) {
        //     this.token = token
        // },
        // changeAvatar(avatar) {
        //     this.admin.avatar = avatar
        // }
        adminLogin(username, password) {
            return new Promise((resolve, reject) => {
                adminLogin(username, password).then((res) => {
                    setToken(res.data.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        async getInfo() {
            const res = await getInfo()
            this.adminInfo = res.data
        },
        async adminLogout() {
            logout()
            removeToken()
            this.adminInfo = {}
        },
        async updatepassword(data) {
            return await updatepassword(data)
        }

    }
})

