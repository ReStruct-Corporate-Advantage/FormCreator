import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Box} from '@material-ui/core';
import './TabPanel.component.scss';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      className="c-TabPanel"
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;