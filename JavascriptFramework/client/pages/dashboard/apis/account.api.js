import AbstractApi from './abstract.api'

let accountApi = null

export default class AccountApi extends AbstractApi {
    static getInstance () {
        if (accountApi === null) {
            accountApi = new AccountApi()
        }

        return accountApi
    }
    constructor () {
        super('accounts')
    }
}