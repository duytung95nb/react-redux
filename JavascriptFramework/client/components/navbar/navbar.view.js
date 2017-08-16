import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export const NavbarView = (props) => {
    return (
        <Navbar staticTop fluid style={{ backgroundColor: '#1E5281', color: '#D4DEE7' }}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/dashboard' style={{ color: '#D4DEE7' }}>
                        <span className="glyphicon glyphicon-dashboard"></span>Dashboard
                    </Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight style={{ color: '#D4DEE7' }}>
                <NavDropdown eventKey="4" title={
                    <span className="glyphicon glyphicon-user" style={{ color: '#D4DEE7' }}>
                        {props.user.firstName}
                    </span>
                } id="nav-dropdown">
                    <MenuItem eventKey="4.1">Actions</MenuItem>
                    <MenuItem eventKey="4.1" onClick={props.onEditModeClicked}>
                        {props.isEditMode ? (<span>Turn off edit mode</span>) : (<span>Edit mode</span>)}
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4.4" onClick={props.onLogout}>Logout</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}
