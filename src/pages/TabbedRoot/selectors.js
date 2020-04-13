import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getData = ({data}) => data

export const getTabbedRoot = createSelector(
    getData,
    (dataState) => {
        return dataState.pages.tabbedRoot
    }
)

export const isMobile = createGetSelector(getTabbedRoot, 'isMobile')