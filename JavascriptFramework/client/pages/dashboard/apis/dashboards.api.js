import AbstractApi from './abstract.api'

let api = null

export default class DashboardApi extends AbstractApi {
    static getInstance() {
        if (api === null) {
            api = new DashboardApi()
        }

        return api
    }
    constructor () {
        super('dashboards')
    }
}