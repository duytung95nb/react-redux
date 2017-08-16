require("./assets/styles/app.scss")
import React from 'react'
import { render } from "react-dom"
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { AppRoute } from './routes'
import { AppReducer } from './reducers'
import { apiMiddleware } from './middlewares'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(...applyMiddleware),
  // other store enhancers if any
)
const initStore = (reducers, state) => {
    return createStore(reducers, state, enhancer)
}
export const store = initStore(AppReducer, window.__INITIAL_STATE__)

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={AppRoute} />
    </Provider>
    , document.getElementById('app')
)
