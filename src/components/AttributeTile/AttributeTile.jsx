import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import {Tooltip, Typography} from '@material-ui/core';
import './AttributeTile.component.scss';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 'none',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  }
}))(Tooltip);


const AttributeTile = props => {

  const {attribute, toggleSelectedHandler, selected} = props;

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography><b>{"Display Name: " + attribute.general_displayName}</b></Typography>
          <Typography variant="subtitle2"><em>{"ID: " + attribute.general_id}</em></Typography>
          <Typography variant="subtitle2"><em>{"Name: " + attribute.text_input_name}</em></Typography>
          <Typography variant="subtitle2"><em>{"Type: " + attribute.displayType}</em></Typography>
          <Typography variant="subtitle2"><em>{"Sub Type: " + attribute.text_input_type}</em></Typography>
        </React.Fragment>
      } interactive>
      <div className={`c-AttributeTile${selected ? ' selected' : ''}`} tabIndex="0" onClick={() => toggleSelectedHandler(attribute.general_displayName)}>
        <span>{attribute.general_displayName}</span>
        {attribute.type && <em style={{display: "block", textAlign: "right", fontSize: "0.75em", textTransform: "capitalize"}}>Type: {attribute.displayType}</em>}
      </div>
  </HtmlTooltip>
    
  );
};

AttributeTile.defaultProps = {

};

AttributeTile.propTypes = {
  attribute: PropTypes.object,
  toggleSelectedHandler: PropTypes.func,
  selected: PropTypes.bool
};

export default AttributeTile;