import React from 'react'
import cssModules from 'react-css-modules'
import Contact from './contact.view'
import style from './chart.style.scss'

let renderFromRoot = (contact, allContacts) => {
    const contactChildren = allContacts.filter(child => child.superiorId === contact.id)

    return (
        <Contact contact={contact} key={contact.id}>
            {
                contactChildren.length > 0 ? contactChildren.map(child => { return renderFromRoot(child, allContacts) }) : null
            }
        </Contact>
    )
}

const Tree = cssModules((props) => {
    const rootContact = props.allContacts.filter(contact => contact.id === props.rootContactId)[0]
    let tree = null

    if (rootContact !== undefined) {
        tree = renderFromRoot(rootContact, props.allContacts)
    }

    return (
        <div styleName="tree">
            <ul>
                {tree}
            </ul>
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })

export default Tree