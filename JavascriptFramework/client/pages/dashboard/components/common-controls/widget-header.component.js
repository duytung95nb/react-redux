import React from 'react'
import { WidgetHeaderView } from './widget-header.view'
import { connect } from 'react-redux'
import DashboardApi from '../../apis/dashboards.api'
import { DashboardActionCreator } from '../../dashboard.action'

@connect(state => ({ dashboard: state.dashboard }))
export class WidgetHeader extends React.Component {
    onRemoveClicked = (event) => {
        event.preventDefault()
        const widgetIndex = this.props.widgetIndex
        let updatingDashboard = this.props.dashboard
        let newWidgetsArray = updatingDashboard.widgets.filter((widget, index) => {
            if (index !== widgetIndex) {
                return widget
            }
        })
        updatingDashboard.widgets = newWidgetsArray
        const dashboardApi = DashboardApi.getInstance()

        dashboardApi.update(updatingDashboard.id, updatingDashboard).then(returnedDashboard => {
            this.props.dispatch(DashboardActionCreator.updateNewDashboard(returnedDashboard))
        })
    }
    onExpandClicked = (event) => {
        event.preventDefault()
        const dashboard = this.props.dashboard

        if (dashboard.expandingWidgetIndex !== this.props.widgetIndex) {
            this.props.dispatch(DashboardActionCreator.expandWidget(this.props.widgetIndex))
        } else {
            this.props.dispatch(DashboardActionCreator.expandWidget(-1))
        }
    }
    render() {
        return (
            <WidgetHeaderView title={this.props.title}
                widgetIndex={this.props.widgetIndex}
                isEditMode={this.props.dashboard.isEditMode}
                expandingWidgetIndex={this.props.dashboard.expandingWidgetIndex}
                onSettingClicked={this.props.onSettingClicked}
                onExpandClicked={this.onExpandClicked}
                onRemoveClicked={this.onRemoveClicked}
            />
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         dashboard: state.dashboard
//     }
// }
// const mapDispatchToProps = (dispatch) => ({
//     onRemoveWidget(widgetIndex) {
//         dispatch(DashboardActionCreator.updateNewDashboard(returnedDashboard))
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader)
