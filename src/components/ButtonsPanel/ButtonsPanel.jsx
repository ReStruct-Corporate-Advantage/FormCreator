import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "@material-ui/core";
import StepperButtonPanel from '../StepperButtonPanel/StepperButtonPanel';
import './ButtonsPanel.component.scss';

const ButtonsPanel = props => {
  return (
    <div className={`c-ButtonsPanel ${props.containerClass}`} style={{textAlign: props.placement}}>
      {/* {props.showPrevious && <Button className={`c-ButtonsPanel__button ${props.btnClass}`}
        variant="contained" size="large" color="primary"
        type="button" onClick={props.prevHandler} style={{marginRight: "2rem"}}>{props.prevText}</Button>}
      <Button className={`c-ButtonsPanel__button ${props.btnClass}${!props.enableCriteria ? " disabled" : ""}`}
        variant="contained" size="large" color="primary"
        type="button" onClick={props.nextHandler}
        disabled={!props.enableCriteria}>{props.nextText}</Button> */}
        <StepperButtonPanel submitFormHandler={props.nextHandler} enableCriteria={props.enableCriteria} />
    </div>
  );
};

ButtonsPanel.propTypes = {
  containerClass: PropTypes.string,
  btnClass: PropTypes.string,
  enableCriteria: PropTypes.bool,
  nextHandler: PropTypes.func,
  nextText: PropTypes.string,
  placement: PropTypes.string,
  prevHandler: PropTypes.func,
  prevText: PropTypes.string
};

export default ButtonsPanel;