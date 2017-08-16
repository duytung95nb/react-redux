import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import cssModules from 'react-css-modules'
import style from './dashboard.style.scss'
import { Widget } from './components/widget'
import { Navbar } from '../../components/navbar/navbar.component'

export const DashboardView = cssModules(({ dashboard,
    addNews,
    bootstrapClass,
    displayColumConfig }) => {
    return (
        <div styleName='dashboard'>
            <Navbar />
            <div styleName='dashboard__title'>
                <h4>{dashboard.title}</h4>
                {dashboard.isEditMode ? (
                    <div styleName='dashboard__layout-selector'>
                        <ButtonGroup>
                            {
                                displayColumConfig.columnTypes.map((object, index) =>
                                    <Button onClick={event => object.onClick(event, object)} key={index}>{object.name}</Button>
                                )}
                        </ButtonGroup>
                    </div>
                ) : null}
            </div>
            <div styleName='dashboard__body'>
                <div className="row">
                    {
                        dashboard.widgets.map((widget, index) =>
                            <div className={index === dashboard.expandingWidgetIndex ? ("") : bootstrapClass}
                                styleName={index === dashboard.expandingWidgetIndex ? "widget--expanding" : ""}
                                key={index}>
                                <div className="container-fluid">
                                    <Widget widget={widget} widgetIndex={index} />
                                </div>
                            </div>
                        )
                    }
                    {dashboard.isEditMode ? (<div>{addNews}</div>) : null}
                </div>
            </div>
        </div>
    )
}, style, { errorWhenNotFound: false })
