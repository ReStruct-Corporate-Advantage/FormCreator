import {combineReducers} from 'redux'
import createFormReducer from './pages/Createform/reducer'
import createAttributeReducer from './pages/Createattribute/reducer'
import displayFormReducer from './pages/Displayform/reducer'
import tabbedRootReducer from './pages/TabbedRoot/reducer'

export default combineReducers({
    data: combineReducers({
        pages: combineReducers({
            attribute: createAttributeReducer,
            form: createFormReducer,
            displayForm: displayFormReducer,
            tabbedRoot: tabbedRootReducer
        })
    })
})
