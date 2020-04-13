import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import FormHeader from './../FormHeader'
import AttributeStrip from './../AttributeStrip';
import ButtonsPanel from './../ButtonsPanel';

// import createAttribute from './../../config/createAttribute.json';
import './AttributeCreator.component.scss';

const AttributeCreator = (props) => {
  const opts = {...props, expandable: false}
  const [selectedStrip, setSelectedStrip] = useState('');
  const [currentView, setCurrentView] = useState(1);
  
  const {attributes} = opts

  const onClickHandler = (event) => {
    setSelectedStrip(event.currentTarget.id)
  }

  const attributeSelectHandler = (view) => {
    setCurrentView(view);
  }

  const attributeRenders = attributes && Object.keys(attributes).map((attribute, index) => {
    return <AttributeStrip
              attribute={attributes[attribute]}
              onClickHandler={onClickHandler}
              selectedStrip={selectedStrip}
              key={index} />
  })

  return (
    <form className='c-AttributeCreator c-AttributeCreator--shadow'>
      <FormHeader title="Select Attribute Type" />
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
                showPrevious={false} nextText="Next" />
            </div>
          )
        }
        {currentView === 2 &&
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                {/* {attributeRenders} */}
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(1)} 
                nextHandler={() => attributeSelectHandler(3)} showPrevious={true}
                nextText="Next" prevText="Back" />
            </div>
          )
        }
      </div>
    </form>
  );
};

AttributeCreator.propTypes = {
  attributes: PropTypes.object,
  currentSection: PropTypes.string,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

export default AttributeCreator;