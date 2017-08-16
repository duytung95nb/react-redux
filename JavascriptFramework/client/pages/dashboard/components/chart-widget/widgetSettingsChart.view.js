import React from 'react'
import { HorizontalLine } from '../../../components'
import { Select } from '../common-controls'
import { WidgetModifier } from '../widgetsettings/widgetModifier.component'

export default class WidgetSettingsChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widget: this.props.widget,
            widgetInfo: {
                allContacts: this.props.widget.configs.allContacts
            }
        }
    }
    onTitleChange = (event) => {
        let currentInput = event.target

        this.setState({
            widget: {
                ...this.state.widget,
                title: currentInput.value
            }
        })
    }
    onMaxWidthChange = (event) => {
        let currentInput = event.target

        this.setState({
            widget: {
                ...this.state.widget,
                maxWidth: currentInput.value
            }
        })
    }
    onMaxHeightChange = (event) => {
        let currentInput = event.target

        this.setState({
            widget: {
                ...this.state.widget,
                maxHeight: currentInput.value
            }
        })
    }
    selectContactChanged = (event) => {
        const selected = event.currentTarget
        const selectedId = parseInt(selected.options[selected.selectedIndex].value)

        this.setState({
            widget: {
                ...this.state.widget,
                configs: {
                    rootContactId: selectedId
                }
            }
        })
    }
    render() {
        const rootContactId = this.state.widget.configs.rootContactId
        const allContacts = this.state.widgetInfo.allContacts
        const selectingItems = allContacts.map(contact => {
            return {
                key: contact.id,
                value: `${contact.firstName} ${contact.lastName}`
            }
        })

        return (
            <WidgetModifier widget={this.state.widget}
                onTitleChange={this.onTitleChange}
                onMaxWidthChange={this.onMaxWidthChange}
                onMaxHeightChange={this.onMaxHeightChange}
                onSaveClicked={event => this.props.onSaveClicked(event, this.state.widget)}
                onCancelClicked={this.props.onCancelClicked}>
                <HorizontalLine />
                <Select title='Root contact:'
                    values={selectingItems}
                    defaultValue={rootContactId}
                    selectChanged={event => this.selectContactChanged(event)} />
                <HorizontalLine />
            </WidgetModifier>
        )
    }
}
