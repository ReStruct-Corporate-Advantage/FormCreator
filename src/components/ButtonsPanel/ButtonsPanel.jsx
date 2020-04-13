import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "@material-ui/core";
import './ButtonsPanel.component.scss';

const ButtonsPanel = props => {
  return (
    <div className={`c-ButtonsPanel ${props.containerClass}`} style={{textAlign: props.placement}}>
      {props.showPrevious && <Button className={props.btnClass}
        variant="contained" size="large" color="primary"
        type="button" onClick={props.prevHandler} style={{marginRight: "2rem"}}>{props.prevText}</Button>}
      <Button className={props.btnClass}
        variant="contained" size="large" color="primary"
        type="button" onClick={props.nextHandler}>{props.nextText}</Button>
    </div>
  );
};

ButtonsPanel.propTypes = {
  containerClass: PropTypes.string,
  btnClass: PropTypes.string,
  placement: PropTypes.string,
  prevHandler: PropTypes.func,
  nextHandler: PropTypes.func,
  nextText: PropTypes.string,
  prevText: PropTypes.string
};

export default ButtonsPanel;