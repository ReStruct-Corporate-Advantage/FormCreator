import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormHeader, AttributeStrip, ButtonsPanel, AttributeCustomizer, ValidationSelector} from './../';
import {CSSTransition} from 'react-transition-group';

// import createAttribute from './../../config/createAttribute.json';
import './AttributeCreator.component.scss';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { OperationCanceledException } from 'typescript';

const AttributeCreator = (props) => {
  const [inProp, setInProp] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedStrip, setSelectedStrip] = useState('');
  const [currentView, setCurrentView] = useState(1);
  const [title, setTitle] = useState("Select Attribute Type");
  const [customizerFormFilled, updateCustomizerFormFilled] = useState(false);
  const [validationSelectorFilled, updateValidationSelectorFilled] = useState(false);
  const propertyOpts = {...props, updateCustomizerFormFilled};
  const validationOps = {...props, updateValidationSelectorFilled};
  const {attributesInfo} = propertyOpts
  const attributes = attributesInfo && attributesInfo.attributes
  const globalAttributeProperties = attributesInfo && attributesInfo.attributeGlobalProperties
  propertyOpts.globalAttributeProperties = globalAttributeProperties

  if (attributes && attributes[selectedStrip]) {
    propertyOpts.validation = attributes[selectedStrip].validation
    propertyOpts.properties = attributes[selectedStrip].properties
    validationOps.validations = attributes[selectedStrip].applicableValidations
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onClickHandler = (event) => {
    setSelectedStrip(event.currentTarget.id)
  }

  const attributeSelectHandler = (view) => {
    setCurrentView(view);
    if (view === 1) {
      setTitle("Select Attribute Type")
    } else if (view === 2) {
      setTitle("Set Properties")
    } else if (view === 3) {
      setTitle("Select Validations")
    }
  }

  const submitForm = () => {
    fetch('http://localhost:3001/attributes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.formValues, null, "  ")
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error(response.statusText);
      }
      return response.json()
    })
    .then((data) => {
      console.log('Success:', data);
      setOpen(true)
      // history.push('/display/forms')
    })
    .catch((error) => {
      setHasError(true);
      setOpen(true)
      console.error(error);
    });
  }

  const attributeRenders = attributes && Object.keys(attributes).map((attribute, index) => {
    // return <CSSTransition in={inProp} timeout={200 * (index + 1)} classNames="my-node">
          return    <AttributeStrip
                attribute={attributes[attribute]}
                onClickHandler={onClickHandler}
                selectedStrip={selectedStrip}
                key={index}
                index={index} />
          // </CSSTransition>
  })

  return (
    <form className='c-AttributeCreator c-AttributeCreator--shadow' id="attributeCreator">
      <FormHeader title={title} />
      <div className="c-AttributeCreator__content container">
        {currentView === 1 &&
          (
            <div className="row c-AttributeCreator__attribute-selector">
              <div className="col-12">
                {attributeRenders}
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-selector__btn-Submit"
                placement="right" nextHandler={() => attributeSelectHandler(2)}
                showPrevious={false} nextText="Next" enableCriteria={!!selectedStrip} />
              <button type="button" onClick={() => setInProp(true)}>Animate</button>
            </div>
          )
        }
        {currentView === 2 &&
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                <AttributeCustomizer {...propertyOpts} />
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(1)} 
                nextHandler={() => attributeSelectHandler(3)} showPrevious={true}
                nextText="Next" prevText="Back" enableCriteria={customizerFormFilled} />
            </div>
          )
        }
        {currentView === 3 &&
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                <ValidationSelector {...validationOps} />
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(2)} 
                nextHandler={() => submitForm()} showPrevious={true}
                nextText="Next" prevText="Back"  enableCriteria={validationSelectorFilled} />
            </div>
          )
        }
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        {hasError ? 
            <Alert onClose={handleClose} severity="error">Error! Unable to save form.</Alert>
            : <Alert onClose={handleClose} severity="success">Form Saved Successfully!</Alert>}
      </Snackbar>
    </form>
  );
};

AttributeCreator.propTypes = {
  attributesInfo: PropTypes.object,
  currentSection: PropTypes.string,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

export default AttributeCreator;