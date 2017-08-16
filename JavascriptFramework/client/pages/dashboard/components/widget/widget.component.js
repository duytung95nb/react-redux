import React from 'react'
import { TextWidget } from '../text-widget/text.component'
import { TodoWidget } from '../todo-widget/todo.component'
import { DataTableWidget } from '../datatable-widget/datatable.component'
import { connect } from 'react-redux'
import { DashboardActionCreator } from '../../dashboard.action'
import ChartWidget from '../chart-widget/chart.component'
import { DragSource, DropTarget } from 'react-dnd'

// drag
const source = {
    beginDrag(props) {
        return {
            widgetIndex: props.widgetIndex
        }
    }
}
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
// drop
const target = {
    canDrop() {
        return true
    },
    drop(props, monitor) {
        const draggedWidgetIndex = monitor.getItem().widgetIndex
        const targetWidgetIndex = props.widgetIndex

        props.dispatch(DashboardActionCreator.switchWidgetPosition(draggedWidgetIndex, targetWidgetIndex))
    }
}
const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

@connect(state => ({ dashboard: state.dashboard }))
@DragSource('WIDGET', source, collect)
@DropTarget('WIDGET', target, collectDrop)
export class Widget extends React.Component {
    getWidget(widget, key) {
        switch (widget.widgetType) {
            case 'TEXT_WIDGET':
                return <TextWidget widget={widget} widgetIndex={key} />
            case 'TODO_WIDGET':
                return <TodoWidget widget={widget} widgetIndex={key} />
            case 'DATATABLE_WIDGET':
                return <DataTableWidget widget={widget} widgetIndex={key} />
            case 'CHART_WIDGET':
                return <ChartWidget widget={widget} widgetIndex={key} />
            default:
                return null
        }
    }
    render() {
        const { connectDragSource, connectDropTarget } = this.props

        return connectDropTarget(connectDragSource(
            <div>
                {this.getWidget(this.props.widget, this.props.widgetIndex)}
            </div>
        ))
    }
}