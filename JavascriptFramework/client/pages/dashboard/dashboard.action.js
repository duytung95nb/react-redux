export const DashboardAction = {
    'DASHBOARD_CREATION': 'DASHBOARD_CREATION',
    'GET_WIDGET_DATA_FROM_SERVER': 'GET_WIDGET_DATA_FROM_SERVER',
    'SELECTED_COLUMN_MODE': 'SELECTED_1_COLUMN_MODE',
    'TOGGLE_WIDGET_EDIT_MODE': 'TOGGLE_WIDGET_EDIT_MODE',
    'UPDATE_NEW_DASHBOARD': 'UPDATE_NEW_DASHBOARD',
    'EXPAND_WIDGET': 'EXPAND_WIDGET',
    'SWITCH_WIDGET_POSITION': 'SWITCH_WIDGET_POSITION'
}

export const DashboardActionCreator = {
    createDashboard: () => {
        return {
            type: DashboardAction.DASHBOARD_CREATION
        }
    },
    getWidgetDataFromServer: (dashboard) => {
        return { type: DashboardAction.GET_WIDGET_DATA_FROM_SERVER, dashboard }
    },
    selectedColumnMode: (colModeName) => {
        return { type: DashboardAction.SELECTED_COLUMN_MODE, colModeName }
    },
    toggleEditMode: () => {
        return { type: DashboardAction.TOGGLE_WIDGET_EDIT_MODE }
    },
    updateNewDashboard: (newDashboard) => {
        return { type: DashboardAction.UPDATE_NEW_DASHBOARD, newDashboard }
    },
    expandWidget: (widgetIndex) => {
        return { type: DashboardAction.EXPAND_WIDGET, widgetIndex }
    },
    switchWidgetPosition: (draggedWidgetIndex, targetWidgetIndex) => {
        return { type: DashboardAction.SWITCH_WIDGET_POSITION, draggedWidgetIndex, targetWidgetIndex}
    }
}
