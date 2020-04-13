import React from 'react';
import PropTypes from 'prop-types';
import './Header.component.scss';

const Header = props => {
  return (
    <div className='c-Header'>
      In Component Header
    </div>
  );
};

Header.defaultProps = {

};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;