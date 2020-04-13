import React from 'react';
import PropTypes from 'prop-types';
import './Createform.module.scss';

const Createform = props => {
  return (
    <div className="c-Createform">
      In Page Createform
    </div>
  );
};

Createform.defaultProps = {

};

Createform.propTypes = {
  attributes: PropTypes.array
};

export default Createform;