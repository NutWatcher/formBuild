// Reducer
import { combineReducers } from 'redux'
import componentPageState from './componentPage'
import PropertyState from './propertyPage'
import MainState  from './mainPage'
import ModalState  from './modal'
export default combineReducers({
    componentPageState,
    MainState,
    PropertyState,
    ModalState
})