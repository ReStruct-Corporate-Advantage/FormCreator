import React from 'react';
import PropTypes from 'prop-types';
import './FormHeader.component.scss';

const FormHeader = props => {
  return (
    <div className='c-FormHeader c-FormHeader__header-background'>
      <p className='c-FormHeader__title--bold'>{props.title}</p>
    </div>
  );
};

FormHeader.defaultProps = {
  title: "Dummy Header"
};

FormHeader.propTypes = {
  title: PropTypes.string
};

export default FormHeader;