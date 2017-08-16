import { LoginActions } from './login.actions'

export const login = (state = {}, action) => {
    switch (action.type) {
        case LoginActions.LOGIN_SUCCESS:
            return ({
                ...state,
                id: action.userId
            })
        case LoginActions.LOGIN_FAILED:
            return ({
                ...state,
                id: ''
            })
        default:
            return state

    }
}