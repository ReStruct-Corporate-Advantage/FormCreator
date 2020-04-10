export const UPDATE_FORM_VALUES = 'UPDATE_SECTION_DISPLAY_FORM_VALUES'
export const UPDATE_FORM_ERRORS = 'UPDATE_SECTION_DISPLAY_FORM_ERRORS'
export const DISPATCH_SECTIONS = 'DISPATCH_SECTIONS'

export const updateFormValues = (formValues) => {
    return {
        type: UPDATE_FORM_VALUES,
        payload: formValues
    }
}

export const updateFormErrors = (formErrors) => {
    return {
        type: UPDATE_FORM_ERRORS,
        payload: formErrors
    }
}

export const dispatchSections = (sections) => {
    return {
        type: DISPATCH_SECTIONS,
        payload: sections
    }
}
