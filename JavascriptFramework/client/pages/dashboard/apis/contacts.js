import AbstractApi from './abstract.api'

let api = null

export default class ContactApi extends AbstractApi {
    static getInstance () {
        if (api === null) {
            api = new ContactApi()
        }

        return api
    }
    constructor () {
        super('contacts')
    }
}