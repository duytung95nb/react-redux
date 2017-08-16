import axios from 'axios'

export default class LoginApi {
    static login(user) {
        const api = 'http://localhost:8080/api/accounts/login'

        return axios.post(api, user).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    }
}