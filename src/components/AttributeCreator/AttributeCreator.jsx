import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormHeader from './../FormHeader'
import AttributeStrip from './../AttributeStrip';
import ButtonsPanel from './../ButtonsPanel';
import AttributeCustomizer from './../AttributeCustomizer';

// import createAttribute from './../../config/createAttribute.json';
import './AttributeCreator.component.scss';

const AttributeCreator = (props) => {
  const opts = {...props, expandable: false}
  const [selectedStrip, setSelectedStrip] = useState('');
  const [currentView, setCurrentView] = useState(1);
  const [title, setTitle] = useState("Select Attribute Type");
  
  const {attributesInfo} = opts
  const attributes = attributesInfo && attributesInfo.attributes
  const globalAttributeProperties = attributesInfo && attributesInfo.attributeGlobalProperties

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

  const attributeRenders = attributes && Object.keys(attributes).map((attribute, index) => {
    return <AttributeStrip
              attribute={attributes[attribute]}
              onClickHandler={onClickHandler}
              selectedStrip={selectedStrip}
              key={index} />
  })

  return (
    <form className='c-AttributeCreator c-AttributeCreator--shadow'>
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
                showPrevious={false} nextText="Next" enableCriteria={selectedStrip} />
            </div>
          )
        }
        {currentView === 2 &&
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                <AttributeCustomizer globalAttributeProperties={globalAttributeProperties} properties={attributes[selectedStrip] && attributes[selectedStrip].properties} />
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(1)} 
                nextHandler={() => attributeSelectHandler(3)} showPrevious={true}
                nextText="Next" prevText="Back" />
            </div>
          )
        }
        {currentView === 3 &&
          (
            <div className="row c-AttributeCreator__attribute-customizer">
              <div className="col-12">
                <AttributeCustomizer />
              </div>
              <ButtonsPanel
                containerClass="col-12" btnClass="c-AttributeCreator__attribute-customizer__btn-Submit"
                placement="right" prevHandler={() => attributeSelectHandler(2)} 
                nextHandler={() => attributeSelectHandler(1)} showPrevious={true}
                nextText="Next" prevText="Back" />
            </div>
          )
        }
      </div>
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