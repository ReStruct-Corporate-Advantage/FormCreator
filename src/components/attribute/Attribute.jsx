import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import TextInput from "../baseControls/TextInput";
import DateInput from "../baseControls/DateInput";
import SingleSelectDropdown from "../baseControls/SingleSelectDropdown";
import SelectRadioGroup from "../baseControls/SelectRadioGroup";
import MultiSelectDropdown from "../baseControls/MultiSelectDropdown";
import {Validate} from './../../validations/validationUtility'

const Components = {
  "_TextInput": TextInput,
  "_SingleSelectDropdown": SingleSelectDropdown,
  "_DateInput": DateInput, 
  "_MultiSelectDropdown": MultiSelectDropdown,
  "_SelectRadioGroup": SelectRadioGroup
}

function Attribute({attributeInfo, customChangeHandler, customBlurHandler, formErrors, formValues, index, updateFormErrors, updateFormValues}) {
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
  }, [updateFormValues, updateFormErrors, id])

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

  const validateAttribute = (e, validation) => {
    const target = e.target
    let error = false
    let errorMessage = ''

    validation && validation.validators && validation.validators.every((validator) => {
      errorMessage = Validate[validator](target, validation);
      error = !!errorMessage;
      return !error
    })

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
            [componentKey]: target.value
        }
    })

    return error
  }

  const onChangeHandler = (event, validation) => {
    if (event.isDummy) {
      validateAttribute(event, validation)
      if (customChangeHandler) {
        customChangeHandler(event.target.value)
      }
    }
    setValue(event.target.value)
  }

  const onBlurHandler = (event, validation) => {
    if (customBlurHandler) {
      customBlurHandler(event.target.value)
    }
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
