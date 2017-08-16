import React from 'react'
import cssModules from 'react-css-modules'
import style from './text.style.scss'
import { WidgetHeader } from '../common-controls/widget-header.component'
import { WidgetModifier } from '../widgetsettings/widgetModifier.component'
import WidgetSettingsText from './widgetSettingsText.view'

export const TextWidgetView = cssModules((props) => {
    return (
        <div styleName="text-widget">
            <WidgetHeader title={props.widget.title}
                onSettingClicked={props.onSettingClicked}
                widgetIndex={props.widgetIndex} />
            <div styleName="text-widget__content">
                {props.isEditing ? (
                    <WidgetModifier widget={props.widget}
                        onSaveClicked={props.onSaveClicked}
                        onTitleChange={props.onTitleChange}
                        onMaxWidthChange={props.onMaxWidthChange}
                        onMaxHeightChange={props.onMaxHeightChange}
                        onCancelClicked={props.onCancelClicked}>
                        <WidgetSettingsText onContentChange={props.onContentChange}
                            widget={props.widget}
                            widgetIndex={props.widgetIndex} />
                    </WidgetModifier>
                ) :
                    (
                        <textarea styleName="text-widget__content__text-area" defaultValue={props.widget.configs.text}></textarea>
                    )}
            </div>
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })
