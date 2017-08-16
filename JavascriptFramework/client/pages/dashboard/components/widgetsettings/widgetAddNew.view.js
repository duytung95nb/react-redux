import React from 'react'
import { Input, Select, WidgetHeader} from '../common-controls'
import cssModules from 'react-css-modules'
import style from './widgetsettings.style.scss'
import { ButtonRegular, ButtonPrimary} from '../../../components'

const WidgetAddNewView = cssModules((props) => {
    return (
        <div styleName="widget-settings">
            <WidgetHeader title={props.widget.title} onSettingClicked={props.onSettingClicked} />
            <form styleName="widget-settings__body" action="">
                {
                    props.widget.isAdding ? (
                        <div styleName="body" className="container-fluid">
                            <div className="col-lg-12">
                                <Input title="Widget title:" placeholder="New widget" onChange={props.onTitleChanged} />
                            </div>
                            <div className="col-lg-6">
                                <Select title="Widget type:" values={props.widget.widgetTypes} selectChanged={props.selectChanged} />
                            </div>
                            <div className="col-lg-3">
                                <Input title="Max width:" placeholder="Min width" defaultValue="400" onChange={props.onMaxWidthChanged} />
                            </div>
                            <div className="col-lg-3">
                                <Input title="Max height:" placeholder="Min height" defaultValue="200" onChange={props.onMaxHeightChanged} />
                            </div>
                            <div className="col-lg-12">
                                {props.children}
                            </div>
                            {
                                props.widget.selectedWidgetType !== '' ? (
                                    <div className="col-lg-12">
                                        <ButtonPrimary text="Add widget" onClick={props.onAddClicked} />
                                        <div className="pull-right">
                                            <ButtonRegular text="Cancel" onClick={props.onCancelClicked} />
                                        </div>
                                    </div>
                                ) : (null)
                            }
                        </div>
                    ) : (
                            <div styleName="widget-settings__body__add-button-area">
                                <ButtonRegular text="+" onClick={props.onAddingModeActivate} />
                            </div>
                        )
                }
            </form>
        </div>
    )
}, style, { errorWhenNotFound: false, allowMultiple: true })

export default WidgetAddNewView