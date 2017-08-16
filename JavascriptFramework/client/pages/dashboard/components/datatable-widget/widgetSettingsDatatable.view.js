import React from 'react'
import { HorizontalLine, ButtonDash } from '../../../components'
import { Select, ButtonsContainer } from '../common-controls'

const WidgetSettingsDatatable = ((props) => {
    return (
        <div>
            <HorizontalLine />
            <Select title='Data source:' values={['', 'Contacts', 'Tasks']}
                selectChanged={props.onSelectedDatasourceChange}
                defaultValue={props.widgetEdit.dataSourceName} />
            <div className="row">
                <div className="col-lg-6">
                    <ButtonsContainer title="Columns:">
                        {
                            props.widgetEdit.availableFields.map((field, index) =>
                                <ButtonDash text={field} key={index}
                                    onClick={(event) => props.onAddToSelected(event, field, index)}
                                />
                            )
                        }
                    </ButtonsContainer>
                </div>
                <div className="col-lg-6">
                    <ButtonsContainer title="Selected columns:">
                        {props.widgetEdit.selectedFields.map((field, index) =>
                            <ButtonDash text={field} key={index}
                                onClick={(event) => props.onRemoveFromSelected(event, field, index)}
                            // onClick={(event) => this.removeFromSelected(event, field, index)}
                            />
                        )}
                    </ButtonsContainer>
                </div></div>
            <HorizontalLine />
        </div>
    )
})

export default WidgetSettingsDatatable