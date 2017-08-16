import React from 'react'
import { TodoView } from './todo.view'
import { VISIBILITY_FILTER, addTodo } from './todo.actions'
import TaskApi from '../../apis/task.api'
import DashboardApi from '../../apis/dashboards.api'
import { connect } from 'react-redux'

// this widgets will become a widgets prop of Text widget
@connect(state => ({ dashboard: state.dashboard }))
export class TodoWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widget: props.widget,
            widgetIndex: props.widgetIndex,
            filter: VISIBILITY_FILTER.SHOW_ALL,
            items: [],
            currentItems: []
        }
        this.initData()
    }
    initData() {
        let taskApi = TaskApi.getInstance()
        taskApi.search({ userId: 1 }).then(resultTasks => {
            let widgetItems = []

            resultTasks.forEach(task => {
                if (this.state.widget.configs.taskIds.indexOf(task.id) !== -1) {
                    widgetItems.push(task)
                }
            })
            this.setState({ items: widgetItems, currentItems: widgetItems })
        })
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true
        }

        return false
    }
    componentDidUpdate() {
    }
    countInCompletedElements() {
        let count = 0

        this.state.items.forEach(item => {
            if (!item.isCompleted) {
                count++
            }
        })

        return count
    }
    toggleCompleted = (item) => {
        event.preventDefault()
        item.isCompleted = !item.isCompleted
        let newItems = this.state.items
        newItems.forEach(i => {
            if (i.id === item.id) {
                i = item
            }
        })
        TaskApi.getInstance().update(item.id, item).then(result => {
        })
        this.setState({ items: newItems })
    }
    toggleDeleteButton(event) {
        let tableRowTargeted = event.currentTarget
        let deleteButton = tableRowTargeted.getElementsByClassName('delete-button')[0]

        if (deleteButton.style.display === 'block') {
            deleteButton.style.display = 'none'
        } else {
            deleteButton.style.display = 'block'
        }
    }
    showAll = () => {
        this.setState({ filter: VISIBILITY_FILTER.SHOW_ALL })
    }
    showActive = () => {
        this.setState({ filter: VISIBILITY_FILTER.SHOW_ACTIVE })
    }
    showCompleted = () => {
        this.setState({ filter: VISIBILITY_FILTER.SHOW_COMPLETED })
    }
    clearCompleted = () => {
        let completedItems = this.state.items.filter(item => item.isCompleted)
        let taskApi = TaskApi.getInstance()
        completedItems.forEach(item => {
            taskApi.remove(item.id)
        })
        let incompletedItems = this.state.items.filter(item => !item.isCompleted)
        this.setState({ items: incompletedItems })
    }
    addTodoItem = (event) => {
        // if pressed enter
        if (event.keyCode === 13) {
            let target = event.currentTarget
            let newItem = {
                "task": target.value,
                "isCompleted": false,
                "userId": 1
            }
            let taskApi = TaskApi.getInstance()

            taskApi.insert(newItem).then(result => {
                let taskCreated = result
                let updatedDashboard = this.props.dashboard
                let dashboardWidgets = updatedDashboard.widgets
                let updateWidget = { ...this.state.widget }

                let taskIds = [...updateWidget.configs.taskIds, taskCreated.id]

                updateWidget.configs.taskIds = taskIds
                dashboardWidgets[this.state.widgetIndex] = updateWidget
                let dashboardApi = DashboardApi.getInstance()

                dashboardApi.update(updatedDashboard.id, updatedDashboard)

                let showingItems = this.getCurrentItems(this.state.filter)

                this.setState({ items: [...this.state.items, taskCreated], currentItems: showingItems })
                // store.dispatch(addTodo(itemCreated, this.props.reactKey))
                target.value = ''
            })
        }
    }
    deleteItem = (item) => {
        event.stopPropagation()
        let updatedItems = this.state.items.filter(i => i.id !== item.id)
        let taskApi = TaskApi.getInstance()

        taskApi.remove(item.id)
        this.setState({ items: updatedItems })
    }
    onSettingClicked() {
        // this.setState({isEditing: true})
    }
    getCurrentItems = (filter) => {
        switch (filter) {
            case VISIBILITY_FILTER.SHOW_ALL:
                return this.state.items
            case VISIBILITY_FILTER.SHOW_ACTIVE:
                return this.state.items.filter(item => !item.isCompleted)
            case VISIBILITY_FILTER.SHOW_COMPLETED:
                return this.state.items.filter(item => item.isCompleted)
            default:
                return this.state.items
        }
    }
    render() {
        let currentItems = this.getCurrentItems(this.state.filter)

        return (
            <TodoView widget={this.state.widget}
                widgetIndex={this.state.widgetIndex}
                title={this.state.widget.title}
                showingItems={currentItems}
                remainingItemCount={this.countInCompletedElements()}
                toggleDeleteButton={event => this.toggleDeleteButton(event)}
                toggleCompleted={this.toggleCompleted}
                addTodoItem={event => this.addTodoItem(event)}
                showAll={this.showAll}
                showActive={this.showActive}
                showCompleted={this.showCompleted}
                clearCompleted={this.clearCompleted}
                deleteItem={this.deleteItem}
                onSettingClicked={this.onSettingClicked} />
        )
    }
}