export const UPDATE_FORM_VALUES = 'UPDATE_SECTION_CONTAINER_FORM_VALUES'
export const UPDATE_FORM_ERRORS = 'UPDATE_SECTION_CONTAINER_FORM_ERRORS'

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
