import React from 'react'
import cssModules from 'react-css-modules'
import style from './login.style.scss'

export const LoginView = cssModules((props) => {
    return (
        <form styleName="login-form" onSubmit={props.onLoggingIn}>
            <div className="form-group">
                <h1>Login to Your Account</h1>
                <div styleName="form-container">
                    <input className="form-control input-lg"
                    type="text"
                    placeholder="Username"
                    onChange={props.onUsernameChanged}/>
                </div>
                <div styleName="form-container">
                    <input className="form-control input-lg"
                    type="password"
                    placeholder="Password"
                    onChange={props.onPasswordChanged} />
                </div>
                <div styleName="form-container">
                    <input
                    styleName="login-form__login-button"
                    type="submit"
                    value="Login"/>
                </div>
            </div>
        </form>
    )
}, style, { errorWhenNotFound: false, allowMultiple: true })