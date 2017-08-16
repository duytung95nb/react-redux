import React from 'react'
import { FormControl } from 'react-bootstrap'
import cssModules from 'react-css-modules'
import style from './controls.style.scss'

export const Input = cssModules((props) => {
    return (
        <div styleName="widget-input">
            <label styleName="widget-title" htmlFor="">
                {props.title}
            </label>
            <FormControl placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                onChange={props.onChange} />
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })
