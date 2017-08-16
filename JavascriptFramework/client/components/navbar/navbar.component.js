import React from 'react'
import { view } from 'core'
import { NavbarView } from './navbar.view'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { DashboardActionCreator, DashboardAction } from '../../pages/dashboard/dashboard.action'

@connect(state => ({ dashboard: state.dashboard }))
export class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: -1,
                username: '',
                firstName: '',
                lastName: ''
            }
        }
    }
    componentWillMount() {
        this.setState({
            user: {
                id: sessionStorage.getItem('id'),
                username: sessionStorage.getItem('username'),
                firstName: sessionStorage.getItem('firstName'),
                lastName: sessionStorage.getItem('lastName')
            }
        })
    }
    onLogout() {
        browserHistory.push('/login')
        sessionStorage.clear()
    }
    onEditModeClicked = () => {
        this.props.dispatch(DashboardActionCreator.toggleEditMode())
    }
    render() {
        return <NavbarView user={this.state.user}
            onLogout={this.onLogout}
            onEditModeClicked={this.onEditModeClicked}
            isEditMode={this.props.dashboard.isEditMode} />
    }
}
