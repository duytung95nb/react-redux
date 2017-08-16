import { DashboardAction } from './dashboard.action'

export const dashboard = (state = {}, action) => {
    switch (action.type) {
        case 'GET_WIDGET_DATA_FROM_SERVER':
            return (
                {
                    ...action.dashboard,
                    isEditMode: false
                }
            )

        case 'ADD_TODO':
            return (
                {
                    ...state,
                    widgets: state.widgets.map((widget, index) =>
                        index === action.index ? { ...widget, items: [...widget.items, action.item] } : widget
                    )
                }
            )
        case DashboardAction.SELECTED_COLUMN_MODE:
            return ({
                ...state,
                layoutType: action.colModeName
            })
        /* widget setting actions */
        case 'WIDGET_TYPE_CHANGED':
            return ({
                ...state,
                widgets: state.widgets.map((widget, index) =>
                    index === action.widgetIndex ? { ...widget, selectedTypeIndex: action.selectedTypeIndex } : widget
                )
            }
            )
        case 'TOGGLE_EDIT_MODE':
            return (
                {
                    ...state,
                    widgets: state.widgets.map((widget, index) =>
                        index === action.widgetIndex ? { ...widget, isAdding: !widget.isAdding } : widget
                    )
                }
            )
        /* end of widget setting actions */
        case 'ADD_NEW_WIDGET':
            return (
                {
                    ...state,
                    widgets: [...state.widgets, action.widget]
                    // widgets: Object.assign([], state.widgets, action.widget)
                }
            )
        case 'TOGGLE_WIDGET_EDIT_MODE':
            return (
                {
                    ...state,
                    isEditMode: !state.isEditMode
                    // widgets: Object.assign([], state.widgets, action.widget)
                }
            )
        case 'UPDATE_NEW_DASHBOARD':
            return ({
                ...action.newDashboard,
                expandingWidgetIndex: -1
            })
        case DashboardAction.EXPAND_WIDGET:
            return ({
                ...state,
                expandingWidgetIndex: action.widgetIndex
            })
        case DashboardAction.SWITCH_WIDGET_POSITION:
            let currentWidgets = [...state.widgets]
            let dragWidget = currentWidgets[action.draggedWidgetIndex]
            let targetWidget = currentWidgets[action.targetWidgetIndex]

            // switch position
            currentWidgets[action.draggedWidgetIndex] = targetWidget
            currentWidgets[action.targetWidgetIndex] = dragWidget

            return ({
                ...state,
                widgets: currentWidgets
            })
        default:
            return state
    }
}
