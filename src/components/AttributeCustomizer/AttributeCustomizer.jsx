import React from 'react';
import PropTypes from 'prop-types';
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined'
import './AttributeCustomizer.component.scss';
import AttributeCustomizerStrip from '../AttributeCustomizerStrip';

const AttributeCustomizer = props => {
  const {properties, globalAttributeProperties} = props
  const allProperties = [...properties, ...globalAttributeProperties]
  allProperties && allProperties.sort((a, b) => {
    if (a.order === b.order) return 0;
    return a.order > b.order ? 1 : -1;
  })

  const onClickHandler = () => {
    console.log("clicked")
  }
  
  const propertyRenders = allProperties && allProperties.map((property, index) => <AttributeCustomizerStrip property={property} key={index} />)

  return (
    <div className='c-AttributeCustomizer container'>
      {propertyRenders}
      <div className="c-AttributeCustomizer__add-more-button row">
        <AddBoxOutlined classes="c-AttributeCustomizer__add-more-button-icon" fontSize="large" style={{color: "#333"}} onClick={onClickHandler} />
      </div>
    </div>
  );
};

AttributeCustomizer.defaultProps = {

};

AttributeCustomizer.propTypes = {
  properties: PropTypes.array,
  globalAttributeProperties: PropTypes.array
};

export default AttributeCustomizer;