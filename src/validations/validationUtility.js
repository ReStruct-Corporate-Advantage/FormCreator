export const Validate = {

    errorPrefix: 'Error: ',

    validateRequired: (target, val) => {
        const formFieldValue = target.value
        if (formFieldValue.trim() === '') {
            return Validate.errorPrefix + val.errorMessages.required
        } else {
            return ''
        }
    },

    validateSelected: (target, val) => {
        if (target.selectedIndex === 0 && !val.required.preSelected) {
            return Validate.errorPrefix + val.errorMessages.required
        } else {
            return ''
        }
    },

    validateLength: (target, val) => {
        const length = target.value ? target.value.length : 0
        if (val &&
                ((val.minLength && length < val.rules.minLength) ||
                (val.minLength && length > val.rules.maxLength))) {
            return Validate.errorPrefix + val.errorMessages.length
        } else {
            return ''
        }
    },

    validateRegex: (target, val) => {
        const value = target.value
        if (val) {
            const regexMatcher = new RegExp(val.regex)
            if (!regexMatcher.test(value)) {
                return Validate.errorPrefix + val.errorMessages.regex
            } else {
                return ''
            }
        } else {
            return ''
        }
    },

    validateDate: (target, val) => {
        const formFieldValue = target.value
        if (val) {
            const separator = formFieldValue.includes('/') ? '/' : '-';
            const year = +formFieldValue.substring(0, formFieldValue.indexOf(separator))
            const dateMinusYear = formFieldValue.substring(formFieldValue.indexOf(separator) + 1)
            const month = +dateMinusYear.substring(0, dateMinusYear.indexOf(separator))
            const date = +dateMinusYear.substring(dateMinusYear.indexOf(separator) + 1)
            const currentYear = new Date().getFullYear()
            const currentMonth = new Date().getMonth()
            const currentDate = new Date().getDate()
            if (year > 2080 || month > 12 || month < 1 || date < 1 || date > 31) {
                return Validate.errorPrefix + val.errorMessages.dateFuture
            }
            if (year < currentYear || (year === currentYear && month < currentMonth + 1) || (year === currentYear && month === currentMonth + 1 && date < currentDate)) {
                return Validate.errorPrefix + val.errorMessages.datePast
            } else {
                return ''
            }
        } else {
            return ''
        }
    },

    validateForm: (props, validationRules) => {
        let error = false
        const formErrors = props.formErrors
        const fieldValues = props.formValues
        const errorPrefix = 'Error: '

        formErrors && Object.keys(formErrors).forEach((key) => {
            if (formErrors[key] !== '') {
                error = true
            }
        })
        fieldValues && Object.keys(fieldValues).forEach((key) => {
            const validationRule = validationRules[key]
            const fieldValue = fieldValues[key]
            if (validationRule && validationRule.required && fieldValue === '') {
                const errMsg = validationRule.errorMessages.required
                if (errMsg) {
                    formErrors[key] = errorPrefix.concat(errMsg)
                    error = true
                }
            }
        })
        props.updateFormErrors({formErrors})
        return error
    },
}