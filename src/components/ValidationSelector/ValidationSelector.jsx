import React from 'react';
import PropTypes from 'prop-types';
import Attribute from '../attribute/Attribute';
import './ValidationSelector.component.scss';

const ValidationSelector = props => {

  let attributeInfo = props.attributesInfo.attributes.multiSelectDropdown
  attributeInfo.options = props.validations;
  // attributeInfo.label = "";
  // attributeInfo = {...attributeInfo, ...property}
  
  
  const checkFormFilled = (value) => {
    if (!!value) {
      props.updateValidationSelectorFilled(true)
    } else {
      props.updateValidationSelectorFilled(false)
    }
  }

  const opts = {...props, attributeInfo, customChangeHandler: checkFormFilled }
  
  return (
    <div className='c-ValidationSelector'>
      <Attribute {...opts} />
    </div>
  );
};

ValidationSelector.defaultProps = {

};

ValidationSelector.propTypes = {
  updateValidationSelectorFilled: PropTypes.func,
  validationOps: PropTypes.array
};

export default ValidationSelector;