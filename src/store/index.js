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
        },
        sideWidth: '220px',
        menus: [

        ]
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
            this.adminInfo = res.data.adminInfo
            this.menus = res.data.menus
            return res
        },
        async adminLogout() {
            logout()
            removeToken()
            this.adminInfo = {}
        },
        async updatepassword(data) {
            return await updatepassword(data)
        },
        //伸缩
        handleSideWidth() {
            this.sideWidth = this.sideWidth === '220px' ? '80px' : '220px'
        }

    }
})

