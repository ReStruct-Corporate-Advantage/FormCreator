import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close'
import Attribute from './../attribute/Attribute'
import './AttributeCustomizerStrip.component.scss';

const AttributeCustomizerStrip = props => {
  const [expanded, setExpanded] = useState(false);
  let attributeInfo = props.attributesMeta.attributes.textInput
  const {formErrors, formValues, property, removeAttrStripHandler, validation, updateFormErrors, updateFormValues} = props
  attributeInfo.label = "";
  attributeInfo = {...attributeInfo, ...property}
  attributeInfo.validation = validation
  
  const toggleBoxExpand = (value) => {
    if (value && value !== "") {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
    props.checkFormFilled(value, property)
  }

  const persistAnimation = (event) => {
    setExpanded(true)
  }

  const opts = {attributeInfo, customBlurHandler: toggleBoxExpand, customFocusHandler: persistAnimation, formErrors, formValues, updateFormErrors, updateFormValues}

  return (
    <label
      htmlFor={attributeInfo.id}
      className="c-AttributeCustomizerStrip c-AttributeCustomizerStrip--materialized c-AttributeCustomizerStrip--shadow row">
      <div className="col-2 c-AttributeCustomizerStrip__name">{property.name}</div>
      <div className="col-1 c-AttributeCustomizerStrip__separator">:</div>
      <div className={`col-9 c-AttributeCustomizerStrip__field c-AttributeCustomizerStrip__field--transition-width${expanded ? " expanded" : ""}`}>
        <Attribute {...opts}/>
      </div>
      <div className="c-AttributeCustomizerStrip__close-icon" onClick={() => removeAttrStripHandler(property)}>
        <Close />
      </div>
    </label>
  );
};

AttributeCustomizerStrip.defaultProps = {

};

AttributeCustomizerStrip.propTypes = {
  checkFormFilled: PropTypes.func,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  property: PropTypes.object,
  removeAttrStripHandler: PropTypes.func,
  validation: PropTypes.object,
  updateFormErrors: PropTypes.func,
  updateFormValues: PropTypes.func
};

export default AttributeCustomizerStrip;