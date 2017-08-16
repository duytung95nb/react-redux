import React from 'react'
import { HorizontalLine } from '../../../../components'
import { Select } from '../../common-controls'
import ContactApi from '../../../apis/contacts'

export class WidgetAddNewChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allContacts: []
        }
        this.initData()
    }
    initData = () => {
        let contactApi = ContactApi.getInstance()

        contactApi.getAll().then(resultContacts => {

            this.setState({
                allContacts: resultContacts
            })
        })
    }
    render() {
        const defaultItem = {key: -1, value: "Select a root contact ..."}
        const selectBoxItems = [defaultItem]

        this.state.allContacts.forEach(contact => {
            const name = `${contact.firstName} ${contact.lastName}`
            const item = { key: contact.id, value: name }

            selectBoxItems.push(item)
        })

        return (
            <div>
                <HorizontalLine />
                <Select title='Data source:' values={selectBoxItems}
                    defaultValue={selectBoxItems[0]}
                    selectChanged={this.props.selectRootContactChanged}
                />
                <HorizontalLine />
            </div>
        )
    }
}