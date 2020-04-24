import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './MoreAttributeProperties.component.scss';

const MoreAttributeProperties = props => {
  const PROPERTY_COUNT_TO_HIDE = 4;
  const propertyRenders = props.properties && props.properties.slice(PROPERTY_COUNT_TO_HIDE).map((property, index) => {
    return <div className="c-MoreAttributeProperties__attribute-select" onClick={() => props.updatehandler(property)} key={index}>{property.name}</div>
  })

  return (
    <React.Fragment>
      <div className={`c-MoreAttributeProperties${props.show ? " c-MoreAttributeProperties--show" : ""}`}>
        {propertyRenders}
      </div>
      {props.show && <div className="c-MoreAttributeProperties__mask" onClick={() => props.toggleShowMore(false)} />}
    </React.Fragment>
  );
};

MoreAttributeProperties.defaultProps = {

};

MoreAttributeProperties.propTypes = {
  properties: PropTypes.array,
  show: PropTypes.bool,
  updatehandler: PropTypes.func,
  toggleShowMore: PropTypes.func
};

export default MoreAttributeProperties;