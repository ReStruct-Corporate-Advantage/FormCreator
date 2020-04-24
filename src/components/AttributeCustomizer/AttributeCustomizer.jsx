import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined'
import CSSTransition from 'react-transition-group'
import {AttributeCustomizerStrip, MoreAttributeProperties} from '../';
import './AttributeCustomizer.component.scss';

const AttributeCustomizer = props => {
  const PROPERTY_COUNT_TO_SHOW = 4;
  const {attributesInfo, formErrors, formValues, properties, globalAttributeProperties, validation, updateFormErrors, updateFormValues, updateCustomizerFormFilled} = props
  const propertiesTemp = [...properties, ...globalAttributeProperties].sort((a, b) => a.order - b.order)
  const [allProperties, setAllProperties] = useState(propertiesTemp)
  const renderProps = allProperties && allProperties.slice(0, PROPERTY_COUNT_TO_SHOW);
  const [showMore, setShowMore] = useState(false)
  const [propertiesToRender, updatePropertiesToRender] = useState(renderProps)

  let propertyToValueMapTemp = {};
  const opts = {attributesInfo, formErrors, formValues, validation, updateFormErrors, updateFormValues}

  const updatePropertiesHandler = (property) => {
    allProperties.splice(allProperties.indexOf(property), 1).sort((a, b) => a.order - b.order)
    setAllProperties(allProperties)
    updatePropertiesToRender([...propertiesToRender, property])
    propertyToValueMap[property.id] = ""
    updatePropertyToValueMap(propertyToValueMap)
  }

  const removeAttrStripHandler = (property) => {
    propertiesToRender.splice(propertiesToRender.indexOf(property), 1)
    updatePropertiesToRender(propertiesToRender)
    setAllProperties([...allProperties, property])
    delete propertyToValueMap[property.id]
    updatePropertyToValueMap(propertyToValueMap)
  }
  const checkFormFilled = (value, property) => {
    propertyToValueMap[property.id] = value
    if (Object.keys(propertyToValueMap).every(property => !!propertyToValueMap[property])) {
      updateCustomizerFormFilled(true)
    }
    updatePropertyToValueMap(propertyToValueMap);
  }
  const propertyRenders = propertiesToRender && propertiesToRender.map((property, index) => {
    opts.property = property
    propertyToValueMapTemp[property.id] = ""
    // console.log(property);
    // return (<CSSTransition in={inProp} timeout={200} classNames="my-node">
    //   <div>
        return <AttributeCustomizerStrip {...opts} key={index} removeAttrStripHandler={removeAttrStripHandler} checkFormFilled={checkFormFilled} />
    //   </div>
    // </CSSTransition>)
  })

  const [propertyToValueMap, updatePropertyToValueMap] = useState(propertyToValueMapTemp)

  return (
    <div className='c-AttributeCustomizer container'>
      {propertyRenders}
      <div className="c-AttributeCustomizer__add-more-button c-AttributeCustomizer__add-more-button--hover-effect row">
        <AddBoxOutlined className="c-AttributeCustomizer__add-more-button-icon" fontSize="large" style={{color: "#333", cursor: "pointer"}} onClick={() => setShowMore(true)} />
        <MoreAttributeProperties properties={allProperties} show={showMore} updatehandler={updatePropertiesHandler} toggleShowMore={setShowMore} />
      </div>
    </div>
  );
};

AttributeCustomizer.defaultProps = {

};

AttributeCustomizer.propTypes = {
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  properties: PropTypes.array,
  globalAttributeProperties: PropTypes.array,
  validation: PropTypes.object,
  property: PropTypes.object,
  updateFormErrors: PropTypes.func,
  updateFormValues: PropTypes.func
};

export default AttributeCustomizer;