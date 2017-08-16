import React from 'react'
import { DatatableWidgetView } from './datatable.view'
import { connect } from 'react-redux'
import ContactApi from '../../apis/contacts'
import TaskApi from '../../apis/task.api'
import DashboardApi from '../../apis/dashboards.api'
// widget configs: {
//     dataSourceName: x (Contacts | Tasks),
//     fields: []
// }

@connect(state => ({ dashboard: state.dashboard }))
export class DataTableWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widget: {
                "title": props.widget.title,
                "widgetType": props.widget.widgetType,
                "maxWidth": props.widget.maxWidth,
                "maxHeight": props.widget.maxHeight,
                "configs": {
                    dataSourceName: props.widget.configs.dataSourceName,
                    fields: props.widget.configs.fields,
                    currentData: []
                }
            },
            widgetEdit: {
                title: props.widget.title,
                maxWidth: props.widget.maxWidth,
                maxHeight: props.widget.maxHeight,
                widgetType: props.widget.widgetType,
                dataSourceName: props.widget.configs.dataSourceName,
                availableFields: [],
                selectedFields: props.widget.configs.fields
            },
            widgetIndex: props.widgetIndex,
            isEditing: false
        }
        const configs = this.state.widget.configs

        this.initData(configs.dataSourceName)
    }
    initData = (dataSourceName) => {
        switch (dataSourceName) {
            case "Contacts":
                const contactApi = ContactApi.getInstance()

                contactApi.getAll().then(resultObjects => {
                    this.initStateObjectsData(resultObjects)
                })
                break
            case "Tasks":
                const taskApi = TaskApi.getInstance()

                taskApi.getAll().then(resultObjects => {
                    this.initStateObjectsData(resultObjects)
                })
                break
            default:
                break
        }
    }
    initStateObjectsData = (inputObjects) => {
        if (inputObjects.length > 0) {
            let availables = []

            // get available fields
            inputObjects.forEach(object => {
                let fields = Object.keys(object)

                fields.forEach(field => {
                    // if not exist yet in array and not existed in selected fields 
                    if (availables.indexOf(field) === -1 && this.state.widgetEdit.selectedFields.indexOf(field) === -1) {
                        availables.push(field)
                    }
                })
            })
            this.setState({
                widget: {
                    ...this.state.widget,
                    configs: {
                        ...this.state.widget.configs,
                        currentData: inputObjects
                    }
                },
                // initial state for widget edit
                widgetEdit: {
                    ...this.state.widgetEdit,
                    availableFields: availables
                }
            })
        }
    }
    onSettingClicked = (event) => {
        event.preventDefault()
        this.setState({ isEditing: !this.state.isEditing })
    }
    renderShowsTotal(start, to, total) {
        return (
            <span>
                {start} to {to} of {total} Contacts
            </span>
        )
    }
    sortButtonClicked() {
        const sortButton = event.currentTarget

        if (sortButton.classList.contains('glyphicon-sort-by-attributes')) {
            sortButton.classList.remove('glyphicon-sort-by-attributes')
            sortButton.classList.add('glyphicon-sort-by-attributes-alt')
        } else if (sortButton.classList.contains('glyphicon-sort-by-attributes-alt')) {
            sortButton.classList.remove('glyphicon-sort-by-attributes-alt')
            sortButton.classList.add('glyphicon-sort-by-attributes')
        }
    }
    onAddToSelected = (event, field, index) => {
        event.preventDefault()
        let availableFields = this.state.widgetEdit.availableFields.slice(0)
        let selectedFields = this.state.widgetEdit.selectedFields.slice(0)

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                availableFields: [...availableFields.slice(0, index), ...availableFields.slice(index + 1)],
                selectedFields: [...selectedFields, field]
            }
        })
    }
    onRemoveFromSelected = (event, field, index) => {
        event.preventDefault()
        let availableFields = this.state.widgetEdit.availableFields.slice(0)
        let selectedFields = this.state.widgetEdit.selectedFields.slice(0)

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                availableFields: [...availableFields, field],
                selectedFields: [...selectedFields.slice(0, index), ...selectedFields.slice(index + 1)]
            }
        })
    }
    onSaveClicked = (event) => {
        event.preventDefault()

        let updatedDashboard = this.props.dashboard
        // update widget in widget list
        let dashboardWidgets = updatedDashboard.widgets
        const editedWidget = this.state.widgetEdit
        let newWidget = {
            "title": editedWidget.title,
            "widgetType": editedWidget.widgetType,
            "maxWidth": editedWidget.maxWidth,
            "maxHeight": editedWidget.maxHeight,
            "configs": {
                dataSourceName: editedWidget.dataSourceName,
                fields: editedWidget.selectedFields
            }
        }

        dashboardWidgets[this.state.widgetIndex] = newWidget
        // update widgets list in dashboard
        updatedDashboard.widgets = dashboardWidgets
        let dashboardApi = DashboardApi.getInstance()

        dashboardApi.update(updatedDashboard.id, updatedDashboard).then(returnedDashboard => {
            let widgetReturned = returnedDashboard.widgets[this.state.widgetIndex]
            let api = null

            if (widgetReturned.configs.dataSourceName === 'Contacts') {
                api = ContactApi.getInstance()
            } else if (widgetReturned.configs.dataSourceName === 'Tasks') {
                api = TaskApi.getInstance()
            }
            if (api !== null) {
                api.getAll().then(resultObjects => {
                    widgetReturned.configs.currentData = resultObjects
                    this.setState({
                        isEditing: false,
                        widget: widgetReturned
                    })
                })
            }
        })
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
        const input = event.target

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                maxWidth: input.value
            }
        })
    }
    onMaxHeightChange = (event) => {
        const input = event.target

        this.setState({
            widgetEdit: {
                ...this.state.widgetEdit,
                maxHeight: input.value
            }
        })
    }
    onSelectedDatasourceChange = (event) => {
        let selectDatasourceBox = event.currentTarget
        const selectedDatasourceName = selectDatasourceBox.options[selectDatasourceBox.selectedIndex].value

        this.reloadEditingData(selectedDatasourceName)
    }
    reloadEditingData = (dataSourceName) => {
        switch (dataSourceName) {
            case "Contacts":
                const contactApi = ContactApi.getInstance()

                contactApi.getAll().then(resultObjects => {
                    this.reloadWidgetEditState(dataSourceName, resultObjects)
                })
                break
            case "Tasks":
                const taskApi = TaskApi.getInstance()

                taskApi.getAll().then(resultObjects => {
                    this.reloadWidgetEditState(dataSourceName, resultObjects)
                })
                break
            default:
                break
        }
    }
    reloadWidgetEditState = (sourceName, resultObjects) => {
        if (resultObjects.length > 0) {
            let availables = []

            // get available fields
            resultObjects.forEach(object => {
                let fields = Object.keys(object)

                fields.forEach(field => {
                    // if not exist yet in array and not existed in selected fields 
                    if (availables.indexOf(field) === -1) {
                        availables.push(field)
                    }
                })
            })
            this.setState({
                widgetEdit: {
                    ...this.state.widgetEdit,
                    dataSourceName: sourceName,
                    availableFields: availables,
                    selectedFields: []
                }
            })
        }
    }
    render() {
        return (
            <DatatableWidgetView widget={this.state.widget}
                widgetIndex={this.state.widgetIndex}
                widgetEdit={this.state.widgetEdit}
                onSettingClicked={event => this.onSettingClicked(event)}
                onSaveClicked={event => this.onSaveClicked(event)}
                onAddToSelected={this.onAddToSelected}
                onRemoveFromSelected={this.onRemoveFromSelected}
                onTitleChange={this.onTitleChange}
                onMaxWidthChange={this.onMaxWidthChange}
                onMaxHeightChange={this.onMaxHeightChange}
                onCancelClicked={this.onCancelClicked}
                renderShowsTotal={this.renderShowsTotal}
                sortButtonClicked={this.sortButtonClicked}
                isEditing={this.state.isEditing}
                onSelectedDatasourceChange={event => this.onSelectedDatasourceChange(event)} />
        )
    }
}