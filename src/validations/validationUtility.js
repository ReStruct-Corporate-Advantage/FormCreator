// import validationRules from './../config/validations/form-validation'

export const Validate = {

    errorPrefix: 'Error: ',

    validateRequired: (target, validationObj) => {
        const formFieldValue = target.value
        if (validationObj && formFieldValue === '') {
            return Validate.errorPrefix + validationObj.errorMessages.dataMsgRequired
        } else {
            return ''
        }
    },

    validateSize: (target, validationObj) => {
        const length = target.value ? target.value.length : 0
        if (validationObj &&
                (validationObj.minLength && length < validationObj.minLength) ||
                (validationObj.minLength && length > validationObj.maxLength)) {
            return Validate.errorPrefix + validationObj.errorMessages.dataMsgLength
        } else {
            return ''
        }
    },

    validateRegex: (target, validationObj, regexSelector) => {
        const formFieldValue = target.value
        if (validationObj) {
            const formFieldRegexString = validationObj.dataRuleRegex && (validationObj.dataRuleRegex[regexSelector] ? validationObj.dataRuleRegex[regexSelector] : validationObj.dataRuleRegex)
            const formFieldRegex = new RegExp(formFieldRegexString)
            const compliesRegex = formFieldRegex.test(formFieldValue)
            if (!compliesRegex) {
                return Validate.errorPrefix + validationObj.errorMessages.dataMsgRegex
            } else {
                return ''
            }
        } else {
            return ''
        }
    },

    validateDate: (target, validationObj) => {
        const formFieldValue = target.value
        if (validationObj) {
            const month = +formFieldValue.substring(0, formFieldValue.indexOf('/'))
            const year = +formFieldValue.substring(formFieldValue.indexOf('/') + 1)
            const currentYear = new Date().getFullYear()
            const currentMonth = new Date().getMonth()
            if (year > 2032 || month > 12 || month < 1) {
                return Validate.errorPrefix + validationObj.errorMessages.dataMsgRegex
            }
            if (year < currentYear || (year === currentYear && month < currentMonth + 1)) {
                return Validate.errorPrefix + validationObj.errorMessages.dataMsgMonthYear
            } else {
                return ''
            }
        } else {
            return ''
        }
    },

    // validateForm: (props, context) => {
    //     if (!context) {
    //         context = props.context
    //     }
    //     let validationRulesSpreaded
    //     if(props.giftCardData && props.giftCardData.noPaymentRequiredMessage && context === 'billing'){
    //         validationRulesSpreaded = {...validationRules.address}
    //     } else {
    //         validationRulesSpreaded = {...validationRules.address, ...validationRules.payment}
    //     }
    //     const formErrors = props.formErrors ? props.formErrors[context] : {}
    //     const fieldValues = props.formValues ? props.formValues[context] : {}
    //     let error = false
    //     const errorPrefix = 'Error: '

    //     Object.keys(formErrors).map((key) => {
    //         if (formErrors[key] !== '') {
    //             error = true
    //         }
    //     })
    //     Object.keys(fieldValues).map((key) => {
    //         const validationRule = validationRulesSpreaded[key]
    //         const fieldValue = fieldValues[key]
    //         if (validationRule && validationRule.dataRuleRequired && fieldValue === '') {
    //             if (validationRule.errorMessages) {
    //                 formErrors[key] = errorPrefix.concat(validationRule.errorMessages.dataMsgRequired)
    //                 error = true
    //             }
    //         }
    //     })
    //     props.updateFormErrors({formErrors: {
    //         [context]: {
    //             ...formErrors
    //         }
    //     }})
    //     return error
    // },

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
        fieldValues && Object.keys(fieldValues).map((key) => {
            let validationRule = validationRules[key]
            if (validationRule.hasOwnProperty('client')) {
                validationRule = validationRule.client
            }
            const fieldValue = fieldValues[key]
            if (validationRule && validationRule.required && validationRule.required.isRequired && fieldValue === '') {
                const errMsg = validationRule.required.error_message
                if (errMsg) {
                    formErrors[key] = errorPrefix.concat(errMsg)
                    error = true
                }
            }
        })
        props.updateFormErrors({formErrors})
        return error
    },

    validateAndGetFormattedValue: (value, re, lengthLimit, separatorPlacementArray, separator) => {
        if (value === '' || re.test(value) && value.length <= lengthLimit) {
            let formattedValue = value
            if (separator) {
                formattedValue = ''
                const valueParts = value.split(separator)
                for (let i = 0; i < valueParts.length; i++) {
                    formattedValue = formattedValue.concat(valueParts[i])
                }
                for (let i = 0; i < separatorPlacementArray.length; i++) {
                    const insertionIndex = separatorPlacementArray[i]
                    if (formattedValue.length >= insertionIndex) {
                        formattedValue = formattedValue.slice(0, insertionIndex) + separator + formattedValue.slice(insertionIndex)
                    }
                }
            }
            return formattedValue
        }
    },

    // eslint-disable-next-line consistent-return
    // handleBackSpaceGeneric: (value, separatorPlacementArray, keyCode, allowedCharacters) => {
    //     let keyCodes = [37, 38, 39, 40, 48, 49, 46, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8, 9]
    //     allowedCharacters && (keyCodes = keyCodes.concat(allowedCharacters))
    //     if (!keyCodes.includes(event.which) || event.shiftKey) {
    //         event.preventDefault()
    //         return false
    //     }
    //     if (keyCode === 8 && separatorPlacementArray && separatorPlacementArray.includes(value.length - 1)) {
    //         const newValue = value.substring(0, value.length - 1)
    //         return newValue
    //     }
    //     if (keyCode === 8 && value.length && value.includes('*')) {
    //         const newValue = value.substring(0, value.length - 1)
    //         return newValue
    //     }
    // }
}