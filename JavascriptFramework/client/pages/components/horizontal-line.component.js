import React from 'react'
import cssModules from 'react-css-modules'
import style from './components.style.scss'

export const HorizontalLine = cssModules(() => {
    return (
        <hr styleName="horizontal-line"/>
    )
}, style, {errorWhenNotFound: false, allowMultiple: true})