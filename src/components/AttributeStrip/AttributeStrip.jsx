import React from 'react';
import PropTypes from 'prop-types';
import './AttributeStrip.component.scss';

const AttributeStrip = props => {
  const {attribute, onClickHandler, selectedStrip} = props
  return (
    <div
      className={`c-AttributeStrip${selectedStrip === attribute.id ? ' selected' : ''} container c-AttributeStrip--shadow`}
      onClick={onClickHandler}
      // style={{top: `${75*(props.index)}px`}}
      id={attribute.id}>
        <div className="row">
          <div className="col-3"><span>{attribute.displayName}</span></div>
          <div className="col-1 c-AttributeStrip__separator">:</div>
          <div className="col-8 c-AttributeStrip__description"><span>{attribute.description}</span></div>
        </div>
    </div>
  );
};

AttributeStrip.defaultProps = {

};

AttributeStrip.propTypes = {
  attribute: PropTypes.object,
  onClickHandler: PropTypes.func,
  selectedStrip: PropTypes.string
};

export default AttributeStrip;