import React from 'react'
import {LoginView} from './login.view'
import {connect} from 'react-redux'
import loginActionsCreator from './login.actions'
import LoginApi from './login.api'
import { browserHistory } from 'react-router'

@connect(state => ({login: state.login}))
export class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    onUsernameChanged = (event) => {
        const input = event.target

        this.setState({username: input.value})
    }
    onPasswordChanged = (event) => {
        const input = event.target

        this.setState({password: input.value})
    }
    onLoggingIn = (event) => {
        event.preventDefault()
        const user = {username: this.state.username, password: this.state.password}

        LoginApi.login(user).then(result => {
            // login success
            if (result.jwt !== undefined) {
                this.props.dispatch(loginActionsCreator.loginSuccess(result.id))
                sessionStorage.setItem('jwt', result.jwt)
                sessionStorage.setItem('id', result.id)
                sessionStorage.setItem('username', result.username)
                sessionStorage.setItem('firstName', result.firstName)
                sessionStorage.setItem('lastName', result.lastName)
                browserHistory.push('/')
            } else {

            }
            // if (result.)
        }).catch(error => {
            throw (error)
        })
    }
    render () {
        return (
            <LoginView onUsernameChanged={event => this.onUsernameChanged(event)}
             onPasswordChanged={event => this.onPasswordChanged(event)}
             onLoggingIn={event => this.onLoggingIn(event)}/>
        )
    }
}