import React from 'react';
import PropTypes from 'prop-types';
import createAttribute from './../../config/createAttribute.json';
import './AttributeCreator.component.scss';

const AttributeCreator = ({formErrors, formValues, updateFormErrors, updateFormValues}) => {
  const opts = {section: createAttribute, formErrors, formValues, updateFormErrors, updateFormValues, expandable: false}
  
  return (
    <form className='c-AttributeCreator'>
      
    </form>
  );
};

AttributeCreator.propTypes = {
  currentSection: PropTypes.string,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

export default AttributeCreator;