
export const LoginActions = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED'
}
const loginActionsCreator = {
    loginSuccess: (userId) => {
        return { type: LoginActions.LOGIN_SUCCESS, userId}
    },
    loginFailed: () => {
        return { type: LoginActions.LOGIN_FAILED}
    },
    login: (user) => {
        return { type: LoginActions.LOGIN, user }
    }
}

export default loginActionsCreator