export const IS_MOBILE = 'IS_MOBILE';

export const dispatchDeviceType = (isMobile) => {
    return {
        type: IS_MOBILE,
        payload: isMobile
    }
}
