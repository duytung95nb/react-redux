import axios from 'axios'

const apiDefaultAddress = 'http://localhost:8080/api/'

export default class AbstractApi {
    constructor(apiName) {
        this.apiLink = `${apiDefaultAddress}${apiName}`
    }
    getAll() {
        return this.getResponse(this.apiLink, 'GET')
    }
    get(id) {
        let linkToId = `${this.apiLink}/${id}`

        return this.getResponse(linkToId, 'GET')
    }
    insert(item) {
        return this.getResponse(this.apiLink, 'POST', item)
    }

    update(id, item) {
        let linkToId = `${this.apiLink}/${id}`

        return this.getResponse(linkToId, 'PUT', item)
    }

    remove(id) {
        let linkToId = `${this.apiLink}/${id}`

        return this.getResponse(linkToId, 'DELETE')
    }

    search(criteria) {
        let apiLink = `${this.apiLink}/_search`

        return this.getResponse(apiLink, 'POST', criteria)
    }
    getResponse(api, method, item) {
        const jwt = 'Bearer ' + sessionStorage.jwt
        const configs = {
            headers: {
                'Authorization': jwt,
                'Content-type': 'application/json'
            }
        }

        switch (method) {
            case 'GET':
                return axios.get(api, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'POST':
                return axios.post(api, item, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'DELETE':
                return axios.delete(api, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'PUT':
                return axios.put(api, item, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'PATCH':
                return axios.patch(api, item, configs).then(response => {
                    if (response.status === 405) {
                        return response.data
                    }

                    return null
                })
            default:
                return null
        }
    }
    getQuickResponse(api, method, item, configs) {
        switch (method) {
            case 'GET':
                return axios.get(api, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'POST':
                return axios.post(api, item, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'DELETE':
                return axios.delete(api, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'PUT':
                return axios.put(api, item, configs).then(response => {
                    if (response.status === 200) {
                        return response.data
                    }

                    return null
                })
            case 'PATCH':
                return axios.patch(api, item, configs).then(response => {
                    if (response.status === 405) {
                        return response.data
                    }

                    return null
                })
            default:
                return null
        }
    }
}