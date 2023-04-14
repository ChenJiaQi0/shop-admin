import axios from '~/axios'

export function adminLogin(username, password) {
    return axios.post('/admin/login', {
        username,
        password
    })
}

export function getInfo() {
    return axios.post('/admin/getInfo')
}

export function logout() {
    return axios.post('/admin/logout')
}

export function updatepassword(data) {
    return axios.post('/admin/updatepassword', data)
}