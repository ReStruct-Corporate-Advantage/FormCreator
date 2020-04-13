import Immutable from 'immutable'
import {IS_MOBILE} from './actions'

const initialState = Immutable.Map()

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_MOBILE:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default reducer