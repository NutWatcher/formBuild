/**
 * Created by lyy on 2017/1/2.
 */

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/showData'
import ShowData from './containers/ShowData'
import {LoadFormTemplate} from './actions/http'

import './index.less';
const middleware = [ thunk ];
let newStore = applyMiddleware(...middleware)(createStore)(reducer);
newStore.dispatch(LoadFormTemplate());
render(
    <Provider store={newStore}>
        <ShowData  />
    </Provider>,
    document.getElementById('root')
)