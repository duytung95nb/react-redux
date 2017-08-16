'use strict';
import { service, inject } from '../core/inject'
import { AbstractService } from './abstract.service'
import KoaJwt from 'koa-jwt'

@service
export class AccountService extends AbstractService {

    @inject
    accountRepo

    constructor() {
        super('accountRepo')
    }
    login(user) {
        let foundedUser = this.accountRepo.findOne({ username: user.username })
        let returnedResult = {}
        if (foundedUser.password === user.password) {
            returnedResult = {
                jwt: KoaJwt.sign(foundedUser.id, 'fcp'),
                id: foundedUser.id,
                username: foundedUser.username,
                firstName: foundedUser.firstName,
                lastName: foundedUser.lastName
            }
        }

        return returnedResult
    }
}