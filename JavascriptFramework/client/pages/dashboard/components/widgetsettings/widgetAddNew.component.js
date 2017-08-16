import React from 'react'
import WidgetAddNewView from './widgetAddNew.view'
import { WidgetAddNewText, WidgetAddNewDatatable, WidgetAddNewTodo, WidgetAddNewChart } from './widgetAddNewTypes'
import { connect } from 'react-redux'
import DashboardApi from '../../apis/dashboards.api'

const ActionCreator = {
    addNewWidget: (widget) => {
        return { type: "ADD_NEW_WIDGET", widget }
    }
}

@connect(state => ({ dashboardProps: state.dashboard }))
export class WidgetAddNew extends React.Component {
    static getWidgetAddNewInitialState() {
        let widgetAddNewInitialState = {
            widgetInfo: {
                title: "Add Widget",
                maxWidth: 400,
                maxHeight: 200,
                widgetTypes: [
                    { key: '', value: '' },
                    { key: 'TEXT_WIDGET', value: 'Text widget' },
                    { key: 'DATATABLE_WIDGET', value: 'Database widget' },
                    { key: 'CHART_WIDGET', value: 'OrgChart widget' },
                    { key: 'TODO_WIDGET', value: 'Todo list widget' }
                ],
                selectedWidgetType: '',
                isAdding: false
            },
            outputWidget: {
                "title": "",
                "widgetType": "",
                "maxWidth": 400,
                "maxHeight": 200,
                "configs": {

                }
            }
        }

        return widgetAddNewInitialState
    }
    constructor(props) {
        super(props)
        this.state = WidgetAddNew.getWidgetAddNewInitialState()
    }
    componentWillUpdate(nextProps) {
    }
    componentDidUpdate() {
    }
    selectWidgetChanged = (event) => {
        const selectBox = event.currentTarget
        let selectedType = selectBox.options[selectBox.selectedIndex].value

        if (selectBox.options[selectBox.selectedIndex].value !== '') {
            this.setState({
                widgetInfo: {
                    ...this.state.widgetInfo,
                    selectedWidgetType: selectedType
                },
                outputWidget: {
                    ...this.state.outputWidget,
                    widgetType: selectedType
                }
            })
        } else {
            this.setState(({
                widgetInfo: {
                    ...this.state.widgetInfo,
                    selectedWidgetType: selectBox.options[selectBox.selectedIndex].value
                }
            }))
        }
    }
    onAddingModeActivate = (event) => {
        event.preventDefault()
        let newState = this.state

        newState.widgetInfo.isAdding = true
        this.setState(newState)
    }
    onAddClicked = (event) => {
        event.preventDefault()
        let outputWidget = this.state.outputWidget
        // add empty tasks property for todo widget
        if (outputWidget.widgetType === 'TODO_WIDGET') {
            outputWidget.configs.taskIds = []
        }
        let dashboardApi = DashboardApi.getInstance()
        let currentDashboard = { ...this.props.dashboardProps }

        // add output widget to dashboard data
        currentDashboard.widgets = [...currentDashboard.widgets, outputWidget]
        dashboardApi.update(currentDashboard.id, currentDashboard).then(returnedDashboard => {
        })
        this.setState(WidgetAddNew.getWidgetAddNewInitialState())
        this.props.dispatch(ActionCreator.addNewWidget(this.state.outputWidget))
    }
    // text widget
    onTextWidgetContentChange = (content) => {
        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                configs: {
                    text: content
                }
            }
        })
    }
    // end of text widget
    // data table
    getObjectsData(dataName, selectedFields) {
        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                configs: {
                    dataSourceName: dataName,
                    fields: selectedFields
                }
            }
        })
    }
    // end of data table
    // todo
    onWidgetAddNewTodoLoad = () => {
        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                configs: {
                    tasks: []
                }
            }
        })
    }
    // end of todo
    // organization chart
    selectRootContactChanged = (event) => {
        const selectBox = event.currentTarget
        const selectedContactId = parseInt(selectBox.options[selectBox.selectedIndex].value)

        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                configs: {
                    rootContactId: selectedContactId
                }
            }
        })
    }
    // end of organization chart
    onMaxWidthChanged = (event) => {
        let input = event.target

        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                maxWidth: input.value
            }
        })
    }
    onMaxHeightChanged = (event) => {
        let input = event.target

        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                maxHeight: input.value
            }
        })
    }
    onTitleChanged = (event) => {
        let input = event.target

        this.setState({
            outputWidget: {
                ...this.state.outputWidget,
                title: input.value
            }
        })
    }
    render() {
        return (
            <WidgetAddNewView widget={this.state.widgetInfo}
                selectChanged={event => this.selectWidgetChanged(event)}
                onMaxWidthChanged={event => this.onMaxWidthChanged(event)}
                onMaxHeightChanged={event => this.onMaxHeightChanged(event)}
                onAddingModeActivate={event => this.onAddingModeActivate(event)}
                onTitleChanged={event => this.onTitleChanged(event)}
                onAddClicked={event => this.onAddClicked(event)}>
                {(() => {
                    switch (this.state.widgetInfo.selectedWidgetType) {
                        case 'TEXT_WIDGET':
                            return <WidgetAddNewText onContentChange={this.onTextWidgetContentChange} />
                        case 'DATATABLE_WIDGET':
                            return <WidgetAddNewDatatable getObjectsData={(dataName, selectedFields) => this.getObjectsData(dataName, selectedFields)} />
                        case 'TODO_WIDGET':
                            return <WidgetAddNewTodo />
                        case 'CHART_WIDGET':
                            return <WidgetAddNewChart selectRootContactChanged={event => this.selectRootContactChanged(event)} />
                        default:
                            null
                    }
                })()}
            </WidgetAddNewView>
        )
    }
}
