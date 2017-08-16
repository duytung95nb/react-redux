import React from 'react'
import cssModules from 'react-css-modules'
import style from './controls.style.scss'

export const WidgetHeaderView = cssModules((props) => {
    return (
        <div styleName="widget-header">
            <span styleName="widget-header__title-area">{props.title}</span>
            <span styleName="widget-header__tool-area">{props.isEditMode && (
                <div styleName="icon-container">
                    <button styleName="icon-button" className="glyphicon glyphicon-cog" onClick={props.onSettingClicked}></button>
                </div>
            )}
                <div styleName="icon-container">
                    <button styleName="icon-button"
                        className={
                            props.expandingWidgetIndex === props.widgetIndex ? "glyphicon glyphicon-resize-small"
                                : "glyphicon glyphicon-fullscreen"
                        }
                        onClick={event => props.onExpandClicked(event)}></button>
                </div>
                {props.isEditMode && (
                    <div styleName="icon-container">
                        <button styleName="icon-button" className="glyphicon glyphicon-remove" onClick={(event) => props.onRemoveClicked(event)}></button>
                    </div>
                )}
            </span>
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })
