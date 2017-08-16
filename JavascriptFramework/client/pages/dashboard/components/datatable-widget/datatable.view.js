import React from 'react'
import cssModules from 'react-css-modules'
import style from './datatable.style.scss'
import { WidgetHeader } from '../common-controls/widget-header.component'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import WidgetSettingsDatatable from './widgetSettingsDatatable.view'
import { WidgetModifier } from '../widgetsettings/widgetModifier.component'

/* inline styles */
const tableStyle = { border: 'none' }
const containerStyle = { border: 'none' }
const headerStyle = { border: 'none' }
const bodyStyle = { border: 'none' }
const tdStyle = { borderLeft: 'none', borderRight: 'none' }
const thStyle = { border: 'none' }
/* end of inline styles */
export const DatatableWidgetView = cssModules((props) => {
  const options = {
    page: 1,  // which page you want to show as default
    hideSizePerPage: true,
    sizePerPage: 5,  // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3,  // the pagination bar size.
    prePage: '<<', // Previous page button text
    nextPage: '>>', // Next page button text
    firstPage: 'First', // First page button text
    lastPage: 'Last', // Last page button text
    paginationShowsTotal: props.renderShowsTotal,  // Accept bool or function
    paginationPosition: 'top'  // default is bottom, top and both is all available
    // hideSizePerPage: true > You can hide the dropdown for sizePerPage
    // alwaysShowAllBtns: true // Always show next and previous button
    // withFirstAndLast: false > Hide the going to First and Last page button
  }

  return (
    <div styleName="datatable">
      <WidgetHeader title={props.widget.title}
                    onSettingClicked={props.onSettingClicked}
                    widgetIndex={props.widgetIndex}
                    />
      <div styleName="datatable__content">
        {
          props.isEditing ? (
            <WidgetModifier widget={props.widget}
              onSaveClicked={props.onSaveClicked}
              onTitleChange={props.onTitleChange}
              onMaxWidthChange={props.onMaxWidthChange}
              onMaxHeightChange={props.onMaxHeightChange}
              onCancelClicked={props.onCancelClicked}>
              <WidgetSettingsDatatable
                widgetEdit={props.widgetEdit}
                onAddToSelected={props.onAddToSelected}
                onRemoveFromSelected={props.onRemoveFromSelected}
                onContentChange={props.onContentChange}
                onSelectedDatasourceChange={props.onSelectedDatasourceChange}
                widgetIndex={props.widgetIndex}
              />
            </WidgetModifier>
          ) : (
              <BootstrapTable data={props.widget.configs.currentData} pagination={true} options={options} striped
                tableStyle={tableStyle}
                containerStyle={containerStyle}
                headerStyle={headerStyle}
                bodyStyle={bodyStyle}>

                <TableHeaderColumn dataField={props.widget.configs.fields[0]}
                  key={0}
                  isKey
                  dataSort={true}
                  tdStyle={tdStyle}
                  thStyle={thStyle} >
                  {props.widget.configs.fields[0]}
                  <span className="glyphicon glyphicon-sort-by-attributes" onClick={props.sortButtonClicked}></span>
                </TableHeaderColumn>
                {
                  props.widget.configs.fields.map((columnHead, index) =>
                    index > 0 ?
                      <TableHeaderColumn dataField={columnHead}
                        key={index}
                        dataSort={true}
                        tdStyle={tdStyle}
                        thStyle={thStyle} >
                        {columnHead}
                      </TableHeaderColumn>
                      : null
                  )
                }
              </BootstrapTable>
            )
        }

      </div>
    </div >
  )
}, style, { errorWhenNotFound: false, allowMultiple: true })
