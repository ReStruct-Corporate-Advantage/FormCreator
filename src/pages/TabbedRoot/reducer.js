import Immutable from 'immutable'
import {IS_MOBILE, DISPATCH_STEPPER_STATE} from './actions'

const initialState = Immutable.Map({
    stepperState: {
        activeStep: 1,
        skippedList: [],
        completedList: [],
        totalSteps: 5
    }
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_MOBILE:
        case DISPATCH_STEPPER_STATE:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default reducer