import React from 'react';
import PropTypes from 'prop-types';
// import './AttributesAside.component.scss';

const AttributesAside = props => {
  return (
    <div className='c-AttributesAside'>
      PlaceHolder for existing attributes in repository
    </div>
  );
};

AttributesAside.defaultProps = {

};

AttributesAside.propTypes = {
  attributes: PropTypes.array
};

export default AttributesAside;