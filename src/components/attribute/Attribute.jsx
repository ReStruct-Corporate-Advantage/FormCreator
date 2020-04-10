import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import TextInput from "../baseControls/TextInput";
import DateInput from "../baseControls/DateInput";
import SingleSelectDropdown from "../baseControls/SingleSelectDropdown";
import SelectRadioGroup from "../baseControls/SelectRadioGroup";
import MultiSelectDropdown from "../baseControls/MultiSelectDropdown";
// import {v4 as uuidv4} from "uuid";

const Components = {
  "_TextInput": TextInput,
  "_SingleSelectDropdown": SingleSelectDropdown,
  "_DateInput": DateInput, 
  "_MultiSelectDropdown": MultiSelectDropdown,
  "_SelectRadioGroup": SelectRadioGroup
}

function Attribute({attributeInfo, formErrors, formValues, index, updateFormErrors, updateFormValues}) {
  let componentKey;
  const id = componentKey = attributeInfo.id
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    updateFormValues({
        formValues: {
            [id]: ''
        }
    })
    updateFormErrors({
        formErrors: {
            [id]: ''
        }
    })
  }, [id])

  const createAttribute = (attributeInfo) => {
    const type = attributeInfo.attributeType
    const errorMsgFromStore = formErrors && formErrors[componentKey] !== "" && formErrors[componentKey]
    if (errorMsgFromStore && errorMsgFromStore !== errorMessage) {
      setError(true)
      setErrorMessage(errorMsgFromStore);
    }
    const opts = {
      key: index,
      ...attributeInfo,
      onBlurHandler, 
      value,
      onChangeHandler,
      error,
      errorMessage
    }
    const CurrentComponent = Components[type];
    return <CurrentComponent {...opts} />
  }

  const validateAttribute = (e, validationObj) => {
    const inputValue = e.target.value && e.target.value
    let error = false
    let errorMessage = ''
    const validRegex =
        validationObj.dataRuleRegex &&
        new RegExp(validationObj.dataRuleRegex.regex).test(inputValue)

    if (e.target.tagName && e.target.tagName === 'SELECT') {
        if (
            validationObj.required.isRequired &&
            e.target.selectedIndex === 0 &&
            !validationObj.required.preSelected
        ) {
            error = true
            errorMessage = validationObj.required.error_message
        }
    } else if (e.target.tagName && e.target.tagName === 'INPUT') {
        if (validationObj.required.isRequired) {
            if (inputValue.trim('') === '') {
                error = true
                errorMessage = validationObj.required.error_message
            } else if (validationObj.dataRuleRegex && !validRegex) {
                error = true
                errorMessage = validationObj.dataRuleRegex.error_message
            }
        }
    } else {
        error = false
        errorMessage = ""
    }

    setError(error)
    setErrorMessage(errorMessage)

    updateFormErrors({
        formErrors: {
            ...formErrors,
            [componentKey]: errorMessage
        }
    })

    updateFormValues({
        formValues: {
            ...formValues,
            [componentKey]: inputValue
        }
    })

    return error
  }

  const onChangeHandler = (event, validation) => {
    if (event.isDummy) {
      validateAttribute(event, validation)
    }
    setValue(event.target.value)
  }

  const onBlurHandler = (event, validation) => {
    validateAttribute(event, validation)
  }

  return createAttribute(attributeInfo);
}

Attribute.propTypes = {
  attributeInfo: PropTypes.object,
  formValues: PropTypes.object,
  formErrors: PropTypes.object,
  index: PropTypes.number,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

export default Attribute;
