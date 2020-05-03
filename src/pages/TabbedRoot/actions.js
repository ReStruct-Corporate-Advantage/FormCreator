export const IS_MOBILE = 'IS_MOBILE';
export const DISPATCH_STEPPER_STATE = 'DISPATCH_STEPPER_STATE'

export const dispatchDeviceType = (isMobile) => {
    return {
        type: IS_MOBILE,
        payload: isMobile
    }
}

export const dispatchStepperState = (stepperState) => {
    return {
        type: DISPATCH_STEPPER_STATE,
        payload: {stepperState}
    }
}