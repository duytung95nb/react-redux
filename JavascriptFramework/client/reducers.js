import {combineReducers} from 'redux'
import {dashboard, login} from './pages'

export const AppReducer = combineReducers({
    dashboard,
    login
})
