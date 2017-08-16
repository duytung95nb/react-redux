import React from 'react'
import cssModules from 'react-css-modules'
import style from './components.style.scss'
export const ButtonRegular = cssModules((props) => {
    return (
        <button className="btn btn-default"
        styleName="btn--regular"
        onClick={props.onClick}>{props.text}</button>
    )
}, style, {errorWhenNotFound: false, allowMultiple: true})