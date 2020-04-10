import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {withRouter} from 'react-router-dom';

import MuiAlert from '@material-ui/lab/Alert';
import { Button, Snackbar } from '@material-ui/core';

// import {v4 as uuidv4} from 'uuid';
import {dispatchSections, updateFormErrors, updateFormValues} from './actions';
import {getSections, getFormErrors, getFormValues} from './selectors';

import Section from '../../components/Section';
import {Validate} from './../../validations/validationUtility'
import './Displayform.module.scss';

const Displayform = (props) => {
  const [open, setOpen] = useState(false);
  const {dispatchSections, formErrors, formValues, history, sections, updateFormErrors, updateFormValues} = props

  useEffect(() => {
    fetch('http://localhost:3001/forms')
    .then(res => res.json())
    .then(data => dispatchSections({sections: JSON.parse(data)}))
  }, [])

  const createSection = (sectionName, key) => {
    const section = sections[sectionName]
    const opts = {formErrors, formValues, section, updateFormErrors, updateFormValues}
    return (
      <div key={key}>
        <Section {...opts} />
        <p> - </p>
      </div>
    );
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const submitForm = (event) => {
    let data = {}
    const form = document.forms.displayForm
    const inputFields = [...form.getElementsByTagName('input')]
    const selectFields = [...form.getElementsByTagName('select')]
    let validationRules = {}
    sections && Object.keys(sections).forEach(sectionKey => {
      const section = sections[sectionKey]
      const attributes = section && section.attributes
      attributes && Object.keys(attributes).forEach(attributeKey => {
        const attribute = attributes[attributeKey];
        validationRules[attributeKey] = attribute.validation;
      })
    })
    if (!Validate.validateForm(props, validationRules, "displayForm")) {
        inputFields.forEach((inputField) => {
            if (inputField.type !== 'radio' && inputField.type !== 'checkbox') {
              const value = inputField.value || formValues[inputField.id]
              data[inputField.id] = value && value.trim()
            }
        })
        selectFields.forEach((selectField) => {
            data[selectField.id] = selectField.value
        })
        fetch('http://localhost:3001/forms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data, null, "  ")
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setOpen(true)
          // history.push('display/forms')
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  const sectionRenders = sections && Object.keys(sections).length > 0 && Object.keys(sections).map(createSection)

  return (
    <form id="displayForm" className="c-Displayform container">
      {sectionRenders}
      <div  style={{textAlign: "center"}}>
        <Button variant="contained" size="large" color="primary" type="button" disabled={!sectionRenders} onClick={submitForm}>Submit</Button>
      </div>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Form Saved Successfully!
        </Alert>
      </Snackbar> */}
    </form>
  );
};

Displayform.propTypes = {
  dispatchSections: PropTypes.func,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  sections: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  sections: getSections,
  formErrors: getFormErrors,
  formValues: getFormValues
})

const mapDispatchToProps = {
  dispatchSections,
  updateFormErrors,
  updateFormValues
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Displayform));