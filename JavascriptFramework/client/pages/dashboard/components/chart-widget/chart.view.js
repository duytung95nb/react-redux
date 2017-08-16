import React from 'react'
import style from './chart.style.scss'
import cssModules from 'react-css-modules'
import { WidgetHeader } from '../common-controls/widget-header.component'
// import { WidgetModifier } from '../widgetsettings/widgetModifier.component'
import WidgetSettingsChart from './widgetSettingsChart.view'

const ChartView = cssModules((props) => {
    return (
        <div styleName="chart-widget">
            <WidgetHeader title={props.widget.title}
                onSettingClicked={props.onSettingClicked}
                isEditMode={props.isEditMode}
                widgetIndex={props.widgetIndex}/>
            <div styleName="chart-widget__content">
                {props.isEditing ? (
                    <WidgetSettingsChart widget={props.widget}
                        onSaveClicked={props.onSaveClicked}
                        onCancelClicked={props.onCancelClicked}
                    />
                ) : (
                        <div styleName="chart-widget__content__tree">
                            {props.children}
                        </div>
                    )}
            </div>
        </div>
    )
}, style, { allowMultiple: true, errorWhenNotFound: false })

export default ChartView


                    // <WidgetModifier widget={props.widget}
                    //     onSaveClicked={props.onSaveClicked}
                    //     onTitleChange={props.onTitleChange}
                    //     onMaxWidthChange={props.onMaxWidthChange}
                    //     onMaxHeightChange={props.onMaxHeightChange}
                    //     onCancelClicked={props.onCancelClicked}>
                    //     <WidgetSettingsChart widget={props.widget}
                    //         widgetIndex={props.widgetIndex}
                    //         selectContactChanged={props.selectContactChanged} />
                    // </WidgetModifier>