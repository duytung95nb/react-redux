import React from 'react'
import cssModules from 'react-css-modules'
import style from './controls.style.scss'

export const Select = cssModules((props) => {
    return (
        <div styleName="widget-select">
            <label styleName="widget-title" htmlFor="">
                {props.title}
            </label>
            <select className="form-control" onChange={props.selectChanged} defaultValue={props.defaultValue}>
                {
                    props.values.map((item, index) => {
                        return <option key={index} value={item.key}>
                                    {typeof item === 'string' ? item : item.value}
                                </option>
                    })
                }
            </select>
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })
