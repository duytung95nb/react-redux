import React from 'react'
import { Select, ButtonsContainer } from '../../common-controls'
import { ButtonDash, HorizontalLine } from '../../../../components'
import ContactApi from '../../../apis/contacts'
import TaskApi from '../../../apis/task.api'

export class WidgetAddNewDatatable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayObjects: [],
            availableFields: [],
            selectedFields: [],
            dataSourceName: ''
        }
    }
    componentWillMount() {
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            // let objectIds = this.state.arrayObjects.map(object => {
            //     return object.id
            // })
            this.props.getObjectsData(this.state.dataSourceName, this.state.selectedFields)
        }
    }
    render() {
        return (
            <div>
                <HorizontalLine />
                <Select title='Data source:' values={['', 'Contacts', 'Tasks']} selectChanged={event => this.selectChanged(event)} />
                <div className="row">
                    <div className="col-lg-6">
                        <ButtonsContainer title="Columns:">
                            {
                                this.state.availableFields.map((field, index) =>
                                    <ButtonDash text={field} key={index} onClick={(event) => this.addToSelected(event, field, index)} />
                                )}
                        </ButtonsContainer>
                    </div>
                    <div className="col-lg-6">
                        <ButtonsContainer title="Selected columns:">
                            {this.state.selectedFields.map((field, index) =>
                                <ButtonDash text={field} key={index} onClick={(event) => this.removeFromSelected(event, field, index)} />
                            )}
                        </ButtonsContainer>
                    </div>
                </div>
                <HorizontalLine />
            </div>
        )
    }
    initState(inputObjects, dataName) {
        if (inputObjects.length > 0) {
            let availables = []

            inputObjects.forEach(object => {
                let fields = Object.keys(object)

                fields.forEach(field => {
                    if (availables.indexOf(field) === -1 && typeof object[field] !== 'object') {
                        availables.push(field)
                    }
                })
            })
            this.setState({ arrayObjects: inputObjects, availableFields: availables, dataSourceName: dataName })
        }
    }
    selectChanged(event) {
        let select = event.currentTarget
        let api = null
        switch (select.options[select.selectedIndex].value) {
            // select contacts as data source
            case "Contacts":
                api = ContactApi.getInstance()
                break
            // select tasks as data source
            case "Tasks":
                api = TaskApi.getInstance()
                break
            // select null
            default:
                this.setState({ arrayObjects: [], availableFields: [], selectedFields: [] })
                break
        }

        if (api !== null) {
            api.getAll().then(result => {
                let dataSourceName = select.options[select.selectedIndex].value
                this.initState(result, dataSourceName)
            })
        }
    }
    addToSelected(event, field, index) {
        event.preventDefault()
        this.setState({
            selectedFields: [...this.state.selectedFields, field],
            availableFields: [...this.state.availableFields.slice(0, index), ...this.state.availableFields.slice(index + 1)]
        })
    }
    removeFromSelected(event, field, index) {
        event.preventDefault()
        this.setState({
            availableFields: [...this.state.availableFields, field],
            selectedFields: [...this.state.selectedFields.slice(0, index), ...this.state.selectedFields.slice(index + 1)]
        })
    }
}