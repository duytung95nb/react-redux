import React from 'react'
import { Input, Select } from '../common-controls'
import cssModules from 'react-css-modules'
import style from './widgetsettings.style.scss'
import { ButtonRegular, ButtonPrimary } from '../../../components'

export const WidgetModifierView = cssModules((props) => {
    return (
        <form styleName="widget-settings" action="">
            <div styleName="body" className="container-fluid">
                <div className="col-lg-12">
                    <Input title="Widget title:" placeholder="New widget" defaultValue={props.widget.title} onChange={props.onTitleChange}/>
                </div>
                <div className="col-lg-6">
                    <Select title="Widget type:" values={[props.widget.widgetType]} />
                </div>
                <div className="col-lg-3">
                    <Input title="Max width:" placeholder="Min width" defaultValue={props.widget.maxWidth} onChange={props.onMaxWidthChange}/>
                </div>
                <div className="col-lg-3">
                    <Input title="Max height:" placeholder="Min height" defaultValue={props.widget.maxHeight} onChange={props.onMaxHeightChange}/>
                </div>
                <div className="col-lg-12">
                    {props.children}
                </div>
                <div className="col-lg-12">
                    <ButtonPrimary text="Save" onClick={props.onSaveClicked} />
                    <div className="pull-right">
                        <ButtonRegular text="Cancel" onClick={props.onCancelClicked} />
                    </div>
                </div>
            </div>
        </form>
    )
}, style, { errorWhenNotFound: false, allowMultiple: true })
