import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getData = ({data}) => data

export const getForm = createSelector(
    getData,
    (dataState) => {
        return dataState.pages.form
    }
)

export const getFormValues = createGetSelector(getForm, 'formValues')
export const getFormErrors = createGetSelector(getForm, 'formErrors')