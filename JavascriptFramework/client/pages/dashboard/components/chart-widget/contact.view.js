import React from 'react'
import cssModules from 'react-css-modules'
import style from './chart.style.scss'

const Contact = cssModules((props) => {
    return (
        <li>
            <div styleName="contact">
                <div styleName="contact__avatar">
                    <img styleName="contact__avatar__img" src={props.contact.avatar} alt="" />
                    <div styleName="contact__avatar__info">
                        <div styleName="contact__avatar__info__title">{props.contact.title}</div>
                        <div styleName="contact__avatar__info__id">{props.contact.id}</div>
                    </div>
                </div>
                <div styleName="contact__content">
                    <p styleName="contact__content__name" type="text">{props.contact.firstName + ' ' + props.contact.lastName}</p>
                    <p styleName="contact__content__department" type="text">{props.contact.department}</p>
                    <p styleName="contact__content__link" type="text">{props.contact.employeeId}</p>
                    <p styleName="contact__content__email">@kms-technology.com</p>
                </div>
            </div>
            {
                props.children ? (
                    <ul>
                        {props.children}
                    </ul>) : null
            }
        </li>
    )
}, style, { errorWhenNotFound: false, allowMultiple: true })

export default Contact
