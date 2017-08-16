import React from 'react'
import ChartView from './chart.view'
import ContactApi from '../../apis/contacts'
import Tree from './tree.view'
import { connect } from 'react-redux'
import DashboardApi from '../../apis/dashboards.api'

@connect(state => ({ dashboard: state.dashboard }))
export default class ChartWidget extends React.Component {
    constructor(props) {
        super(props)
        const widget = props.widget

        this.state = {
            widget: {
                "title": widget.title,
                "widgetType": widget.widgetType,
                "maxWidth": widget.maxWidth,
                "maxHeight": widget.maxHeight,
                "configs": {
                    allContacts: widget.configs.allContacts,
                    rootContactId: widget.configs.rootContactId
                }
            },
            widgetIndex: props.widgetIndex,
            isEditing: false
        }
    }
    componentWillMount() {
        if (this.state.widget.allContacts === undefined) {
            let contactApi = ContactApi.getInstance()

            contactApi.getAll().then(resultContacts => {
                this.setState({
                    widget: {
                        ...this.state.widget,
                        configs: {
                            ...this.state.widget.configs,
                            allContacts: resultContacts
                        }
                    }
                })
            })
        }
    }
    onSettingClicked() {
        event.preventDefault()
        this.setState({ isEditing: !this.state.isEditing })
    }
    onSaveClicked = (event, widget) => {
        event.preventDefault()
        let updatedDashboard = this.props.dashboard
        // update widget in widget list
        let dashboardWidgets = updatedDashboard.widgets

        dashboardWidgets[this.state.widgetIndex] = widget
        // update widgets list in dashboard
        updatedDashboard.widgets = dashboardWidgets
        let dashboardApi = DashboardApi.getInstance()

        dashboardApi.update(updatedDashboard.id, updatedDashboard).then(returnedDashboard => {
        })
        this.setState({
            widget: {
                ...this.state.widget,
                configs: {
                    ...this.state.widget.configs,
                    rootContactId: widget.configs.rootContactId
                }
            },
            isEditing: false
        })
    }
    onCancelClicked = (event) => {
        event.preventDefault()
    }
    render() {
        let widget = this.state.widget
        if (widget.configs.allContacts !== undefined) {
            return (
                <ChartView widget={widget}
                    widgetIndex={this.state.widgetIndex}
                    isEditMode={this.props.dashboard.isEditMode}
                    isEditing={this.state.isEditing}
                    selectContactChanged={this.selectContactChanged}
                    onSettingClicked={event => this.onSettingClicked(event)}
                    onTitleChange={event => this.onTitleChange(event)}
                    onMaxWidthChange={event => this.onMaxWidthChange(event)}
                    onMaxHeightChange={event => this.onMaxHeightChange(event)}
                    onSaveClicked={this.onSaveClicked}
                    onCancelClicked={event => this.onCancelClicked(event)}
                >
                    <Tree allContacts={widget.configs.allContacts}
                        rootContactId={widget.configs.rootContactId}
                    />
                </ChartView>
            )
        }

        return null
    }
}