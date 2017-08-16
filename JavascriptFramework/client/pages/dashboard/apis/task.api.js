import AbstractApi from './abstract.api'

let taskApi = null

export default class TaskApi extends AbstractApi {
    static getInstance () {
        if (taskApi === null) {
            taskApi = new TaskApi()
        }

        return taskApi
    }
    constructor () {
        super('tasks')
    }
}