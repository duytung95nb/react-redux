import React from 'react'
import cssModules from 'react-css-modules'
import style from './components.style.scss'

export const ButtonPrimary = cssModules((props) => {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>{props.text}</button>
    )
}, style, {errorWhenNotFound: false, allowMultiple: true})