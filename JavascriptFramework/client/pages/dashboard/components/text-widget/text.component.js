import React from 'react'
import { TextWidgetView } from './text.view'
import DashboardApi from '../../apis/dashboards.api'
import { connect } from 'react-redux'

// this widgets will become a widgets prop of Text widget
@connect(state => ({ dashboard: state.dashboard }))
export class TextWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widget: props.widget,
            widgetEdit: {
                title: props.widget.title,
                widgetType: props.widget.widgetType,
                maxWidth: props.widget.maxWidth,
                maxHeight: props.widget.maxHeight,
                text: props.widget.configs.text
            },
            widgetIndex: props.widgetIndex,
            isEditing: false
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps !== this.props) {
        }
    }
    onSettingClicked() {
        event.preventDefault()
        if (!this.state.isEditing) {
            this.setState({ isEditing: true })
        } else {
            this.setState({ isEditing: false })
        }
    }
    onTitleChange = (event) => {
        let currentInput = event.target

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                title: currentInput.value
            }
        })
    }
    onMaxWidthChange = (event) => {
        let currentInput = event.target

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                maxWidth: currentInput.value
            }
        })
    }
    onMaxHeightChange = (event) => {
        let currentInput = event.target

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                maxHeight: currentInput.value
            }
        })
    }
    onContentChange = (content) => {

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                text: content
            }
        })
    }
    onSaveClicked = (event) => {
        event.preventDefault()
        let updatedDashboard = this.props.dashboard
        let dashboardWidgets = updatedDashboard.widgets
        const editedWidget = this.state.widgetEdit
        let newWidget = {
            "title": editedWidget.title,
            "widgetType": editedWidget.widgetType,
            "maxWidth": editedWidget.maxWidth,
            "maxHeight": editedWidget.maxHeight,
            "configs": {
                text: editedWidget.text
            }
        }

        dashboardWidgets[this.state.widgetIndex] = newWidget

        updatedDashboard.widgets = dashboardWidgets

        let dashboard = DashboardApi.getInstance()

        dashboard.update(updatedDashboard.id, updatedDashboard).then(returnedDashboard => {
            this.setState({
                isEditing: false,
                widget: returnedDashboard.widgets[this.state.widgetIndex]
            })
        })
    }
    onCancelClicked = (event) => {
        event.preventDefault()
        const widget = this.state.widget

        this.setState({
            widgetEdit: {
                title: widget.title,
                maxWidth: widget.maxWidth,
                maxHeight: widget.maxHeight,
                text: widget.configs.text
            },
            isEditing: false
        })
    }
    render() {
        return (
            <TextWidgetView widget={this.state.widget}
                widgetIndex={this.state.widgetIndex}
                isEditing={this.state.isEditing}
                text={this.state.widget.configs.text}
                onSettingClicked={event => this.onSettingClicked(event)}
                onTitleChange={event => this.onTitleChange(event)}
                onMaxWidthChange={event => this.onMaxWidthChange(event)}
                onMaxHeightChange={event => this.onMaxHeightChange(event)}
                onContentChange={this.onContentChange}
                onSaveClicked={event => this.onSaveClicked(event)}
                onCancelClicked={event => this.onCancelClicked(event)}
            />
        )
    }
}
