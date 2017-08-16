import React from 'react'
import cssModules from 'react-css-modules'
import style from './components.style.scss'

export const ButtonDash = cssModules((props) => {
    return (
        <button styleName="btn--dash" onClick={props.onClick}>{props.text}</button>
    )
}, style, {errorWhenNotFound: false, allowMultiple: true})