import React from 'react'
import cssModules from 'react-css-modules'
import style from './controls.style.scss'

export const ButtonsContainer = cssModules((props) => {
    return (
        <div styleName="buttons-container">
            <div styleName="buttons-container__title">{props.title}</div>
            <div styleName="buttons-container__content">
                {props.children}
            </div>
        </div>
    )
}, style, { errorWhenNotFound: false, allowMultiple: true })