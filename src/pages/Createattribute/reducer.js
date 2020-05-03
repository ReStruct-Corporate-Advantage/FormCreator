import Immutable from 'immutable'
import {DISPATCH_ATTRIBUTES, DISPATCH_ATTRIBUTE_META, DISPATCH_NEw_SECTION_ATTRIBUTES, UPDATE_FORM_ERRORS, UPDATE_FORM_VALUES} from './actions'

const initialState = Immutable.Map()

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_ATTRIBUTES:
        case DISPATCH_ATTRIBUTE_META:
        case UPDATE_FORM_ERRORS:
        case UPDATE_FORM_VALUES:
            return state.mergeDeep(action.payload)
        case DISPATCH_NEw_SECTION_ATTRIBUTES:
            // const chatMessages = [...state.get('newSectionAttributes'), action.payload]
            // return state.setIn('chatMessages', chatMessages)
            return state.set('newSectionAttributes', action.payload);
        default:
            return state
    }
}

export default reducer