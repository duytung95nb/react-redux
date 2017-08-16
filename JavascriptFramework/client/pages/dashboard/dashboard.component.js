import React from 'react'
import { DashboardView } from './dashboard.view'
import { connect } from 'react-redux'
import { DashboardActionCreator } from './dashboard.action'
import DashboardApi from './apis/dashboards.api'
import { WidgetAddNew } from './components/widgetsettings/widgetAddNew.component'
import { browserHistory } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
@connect(state => ({ dashboard: state.dashboard }))
export class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            jwt: `Bearer ${sessionStorage.getItem('jwt')}`
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem('jwt') === null) {
            browserHistory.push('/login')
        } else {
            let dashboardApi = DashboardApi.getInstance()

            dashboardApi.get(20).then(result => {
                let returnedDashboard = result

                this.props.dispatch(DashboardActionCreator.getWidgetDataFromServer(returnedDashboard))
            })
        }
    }
    // save dashboard state to server when unmounting
    componentWillUnmount() {
        const updatingDashboard = {
            ...this.props.dashboard,
            expandingWidgetIndex: -1
        }
        const configs = {
            headers: {
                'Authorization': this.state.jwt,
                'Content-type': 'application/json'
            }
        }
        const dashboardApi = DashboardApi.getInstance()

        dashboardApi.getQuickResponse(`http://localhost:8080/api/dashboards/${updatingDashboard.id}`, 'PUT', updatingDashboard, configs)
    }
    getAddNews = () => {
        let colCount = 0

        switch (this.props.dashboard.layoutType) {
            case '1_COLUMN':
                colCount = 1
                break
            case '2_COLUMN':
                colCount = 2
                break
            case '3_COLUMN':
                colCount = 3
                break
            default:
                colCount = 1
        }
        const numberOfWidgets = this.props.dashboard.widgets.length
        let numberOfAddnew = 0

        if ((numberOfWidgets % colCount) === 0) {
            numberOfAddnew = colCount
        } else if (numberOfWidgets % colCount !== 0) {
            numberOfAddnew = colCount - (numberOfWidgets % colCount)
        }
        let addNews = []
        let colClassString = `col-lg-${12 / colCount}`

        for (let i = 0; i < numberOfAddnew; i++) {
            let key = 'add-new-' + i

            addNews.push(
                <div className={colClassString} key={key}>
                    <div className="container-fluid">
                        <WidgetAddNew />
                    </div>
                </div>
            )
        }

        return addNews
    }
    changeNumberColumn = (event, object) => {
        event.preventDefault()
        this.props.dispatch(DashboardActionCreator.selectedColumnMode(object.value))
    }
    render() {
        const addNews = this.getAddNews()
        const dashboard = this.props.dashboard
        let bootstrapClass = null

        switch (dashboard.layoutType) {
            case '1_COLUMN':
                bootstrapClass = "col-lg-12"
                break
            case '2_COLUMN':
                bootstrapClass = "col-lg-6"
                break
            case '3_COLUMN':
                bootstrapClass = "col-lg-4"
                break
            default:
                bootstrapClass = "col-lg-12"
                break
        }
        const displayColumConfig = {
            columnTypes: [{
                onClick: this.changeNumberColumn,
                name: '1 Column',
                value: '1_COLUMN'
            },
            {
                onClick: this.changeNumberColumn,
                name: '2 Columns',
                value: '2_COLUMN'
            },
            {
                onClick: this.changeNumberColumn,
                name: '3 Columns',
                value: '3_COLUMN'
            }]
        }

        return (
            <DashboardView dashboard={this.props.dashboard}
                addNews={addNews}
                displayColumConfig={displayColumConfig}
                bootstrapClass={bootstrapClass}
            />
        )
    }
}
