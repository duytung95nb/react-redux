import React from 'react'
import style from './todo.style.scss'
import cssModules from 'react-css-modules'
import { WidgetHeader } from '../common-controls/widget-header.component'
import { FormControl } from 'react-bootstrap'

const inputCustomStyle = { border: 'none', outline: 'none' }

export const TodoView = cssModules((props) => {
    return (
        <div styleName="todo">
            <WidgetHeader title={props.title} widgetIndex={props.widgetIndex}/>
            <div styleName="todo__body">
                <FormControl placeholder="What needs to be done?" style={inputCustomStyle} onKeyUp={props.addTodoItem} />
                <div styleName="todo__body__info">
                    <div styleName="todo__body__info__left">
                        <span>{props.remainingItemCount} {props.remainingItemCount > 1 ? 'items' : 'item'} left</span>
                    </div>
                    <div styleName="todo__body__info__middle">
                        <div className="btn-group">
                            <button className="btn btn-default btn-sm" onClick={props.showAll}>All</button>
                            <button className="btn btn-default btn-sm" onClick={props.showActive}>Active</button>
                            <button className="btn btn-default btn-sm" onClick={props.showCompleted}>Completed</button>
                        </div>
                    </div>
                    <div styleName="todo__body__info__right">
                        <p onClick={props.clearCompleted}>Clear Completed</p>
                    </div>
                </div>
                <div styleName="todo__body__table">
                    <table className="table">
                        <tbody>
                            {
                                props.showingItems.map((item, index) =>
                                    <tr styleName="table__row" key={index} onMouseOver={props.toggleDeleteButton} onMouseOut={props.toggleDeleteButton}>
                                        <td onClick={() => props.toggleCompleted(item)}>
                                            <span className={item.isCompleted ? ("glyphicon glyphicon-ok-circle text-primary") : ("glyphicon glyphicon-unchecked text-primary")}>
                                            </span>
                                        </td>
                                        <td>
                                            <span styleName={item.isCompleted ? ("completed-text") : ("")}>{item.task}</span>
                                        </td>
                                        <td onClick={() => props.deleteItem(item)}>
                                            <span className="glyphicon glyphicon-remove text-danger delete-button" styleName="delete-button"></span>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })