import axios from '~/axios'

export function adminLogin(username, password) {
    return axios.post('/admin/login', {
        username,
        password
    })
}