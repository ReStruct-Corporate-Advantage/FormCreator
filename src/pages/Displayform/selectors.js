import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getData = ({data}) => data

export const getDisplayForm = createSelector(
    getData,
    (dataState) => {
        return dataState.pages.displayForm
    }
)

export const getFormValues = createGetSelector(getDisplayForm, 'formValues')
export const getFormErrors = createGetSelector(getDisplayForm, 'formErrors')
export const getSections = createGetSelector(getDisplayForm, 'sections')