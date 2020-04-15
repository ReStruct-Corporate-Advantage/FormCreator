import React from 'react';
import PropTypes from 'prop-types';
import Attribute from './../attribute/Attribute'
import './AttributeCustomizerStrip.component.scss';

const AttributeCustomizerStrip = props => {
  const {property} = props
  let attributeInfo = {
    attributeType: "_TextInput",
    layoutClasses: "col-12 col-lg-6",
    name: "textInput",
    displayName: "Text Input",
    description: "Form Control to provide one line values.",
    type: "input",
    subtype: "number",
    placeholder: "Text Input",
    starVal: "*",
    id: "textInput",
  }
  attributeInfo = {...attributeInfo, ...property}
  return (
    <div className={`c-AttributeCustomizerStrip c-AttributeCustomizerStrip--materialized c-AttributeCustomizerStrip--shadow row${property.order < 5 ? " expanded" : ""}`}>
      <div className="col-2 c-AttributeCustomizerStrip__name">{property.name}</div>
      <div className="col-1 c-AttributeCustomizerStrip__separator">:</div>
      <div className="col-9 c-AttributeCustomizerStrip__field">
        <Attribute attributeInfo={attributeInfo} />
      </div>
    </div>
  );
};

AttributeCustomizerStrip.defaultProps = {

};

AttributeCustomizerStrip.propTypes = {
  property: PropTypes.object
};

export default AttributeCustomizerStrip;