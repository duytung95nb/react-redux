import React from 'react'
import { WidgetModifierView } from './widgetModifier.view'
// @connect(state => ({dashboard: state.dashboard}))
export class WidgetModifier extends React.Component {
    constructor(props) {
        super(props)
        // if we are adding a new widget
        this.state = {
            widget: props.widget
        }
    }

    render() {
        return (
            <WidgetModifierView widget={this.state.widget}
            onTitleChange={this.props.onTitleChange}
            onMaxWidthChange={this.props.onMaxWidthChange}
            onMaxHeightChange={this.props.onMaxHeightChange}
            onSaveClicked={this.props.onSaveClicked}
            onCancelClicked={this.props.onCancelClicked}>
                {this.props.children}
            </WidgetModifierView>
        )
    }
}