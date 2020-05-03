import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getData = ({data}) => data

export const getAttribute = createSelector(
    getData,
    (dataState) => {
        return dataState.pages.attribute
    }
)

export const getFormValues = createGetSelector(getAttribute, 'formValues')
export const getFormErrors = createGetSelector(getAttribute, 'formErrors')
export const getAttributeMeta = createGetSelector(getAttribute, 'attributesMeta')
export const getAttributes = createGetSelector(getAttribute, 'attributesInfo')
export const getNewSectionAttributes = createGetSelector(getAttribute, 'newSectionAttributes')