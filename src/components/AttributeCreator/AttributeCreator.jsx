import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import Alert from '@material-ui/lab/Alert';
import {Snackbar} from '@material-ui/core';
import {dispatchStepperState} from '../../pages/TabbedRoot/actions';
import {dispatchAttributes} from '../../pages/Createattribute/actions';
import {getStepperState} from '../../pages/TabbedRoot/selectors';
import {FormHeader, AttributeStrip, ButtonsPanel, AttributeCustomizer, ValidationSelector} from './../';
// import createAttribute from './../../config/createAttribute.json';
import './AttributeCreator.component.scss';
import { createPropsSelector } from 'reselect-immutable-helpers';

const AttributeCreator = (props) => {
  const {dispatchStepperState, stepperState} = props;
  const {activeStep} = stepperState
  const [inProp, setInProp] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedStrip, setSelectedStrip] = useState('');
  const [title, setTitle] = useState("Select Attribute Type");
  const [customizerFormFilled, updateCustomizerFormFilled] = useState(false);
  const [validationSelectorFilled, updateValidationSelectorFilled] = useState(false);
  const propertyOpts = {...props, updateCustomizerFormFilled};
  const validationOpts = {...props, updateValidationSelectorFilled};
  const {attributesMeta} = propertyOpts
  const attributes = attributesMeta && attributesMeta.attributes
  const globalAttributeProperties = attributesMeta && attributesMeta.attributeGlobalProperties
  const stepperTabMapping = {1: 0, 2: 0, 3: 0, 4: 1, 5: 2}
  propertyOpts.globalAttributeProperties = globalAttributeProperties

  if (attributes && attributes[selectedStrip]) {
    propertyOpts.validation = attributes[selectedStrip].validation
    propertyOpts.properties = attributes[selectedStrip].properties
    validationOpts.validations = attributes[selectedStrip].applicableValidations
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
    // setCurrentView(view);
    dispatchStepperState({...stepperState, activeStep: view})
    props.handleChange(null, stepperTabMapping[view])
    if (view === 1) {
      setTitle("Select Attribute Type")
    } else if (view === 2) {
      setTitle("Set Properties")
    } else if (view === 3) {
      setTitle("Select Validations")
    } else if (view === 4) {
      setTitle("Select Attributes")
    } else if (view === 5) {
      setTitle("Select Sections")
    }
  }

  const submitForm = () => {
    // console.log(selectedStrip)
    const data = {...props.formValues, displayType: selectedStrip, type: attributes[selectedStrip].attributeType}
    fetch('http://localhost:3001/attributes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, "  ")
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error(response.statusText);
      }
      return response.json()
    })
    .then((data) => {
      console.log('Success:', data);
      props.dispatchAttributes({attributesInfo: data});
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
        {activeStep === 1 &&
          (
            <div className="row c-AttributeCreator__attribute-selector">
              <div className="col-12">
                {attributeRenders}
              </div>
              {/* <StepperButtonPanel /> */}
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-selector__btn-Submit"
                placement="right" nextHandler={() => attributeSelectHandler(2)}
                showPrevious={false} nextText="Next" enableCriteria={!!selectedStrip} />
            </div>
          )
        }
        {activeStep === 2 && (selectedStrip ?
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                <AttributeCustomizer {...propertyOpts} />
              </div>
              {/* <StepperButtonPanel /> */}
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(1)} 
                nextHandler={() => attributeSelectHandler(3)} showPrevious={true}
                nextText="Next" prevText="Back" enableCriteria={customizerFormFilled} />
            </div>
          ) : <p style={{color: '#333'}}>Please select an attribute in Step 1</p>)
        }
        {activeStep === 3 && (selectedStrip ?
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                <ValidationSelector {...validationOpts} />
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(2)} 
                nextHandler={() => submitForm()} showPrevious={true}
                nextText="Next" prevText="Back"  enableCriteria={validationSelectorFilled} />
            </div>
          ) : <p style={{color: '#333'}}>Please select an attribute in Step 1</p>)
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
  attributesMeta: PropTypes.object,
  currentSection: PropTypes.string,
  dispatchAttributes: PropTypes.func,
  dispatchStepperState: PropTypes.func,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  handleChange: PropTypes.func,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  stepperState: getStepperState
})

const mapDispatchToProps = {
  dispatchAttributes,
  dispatchStepperState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeCreator);