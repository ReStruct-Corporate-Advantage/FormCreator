import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import './WorkflowStepper.component.scss';
import {dispatchStepperState} from '../../pages/TabbedRoot/actions';
import {getStepperState} from '../../pages/TabbedRoot/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

function getSteps() {
  return ['Select Attribute', 'Customize Attribute', 'Select validations', 'Create Section', 'Create Form'];
}

function WorkflowStepper(props) {
  const {stepperState, dispatchStepperState} = props;
  const {activeStep, skippedList, completedList} = stepperState;
  const skipped = new Set(skippedList);
  const completed = new Set(completedList);
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={`c-WorkflowStepper ${classes.root}`}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep - 1}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (index + 1 === 1) {
            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (skipped.has(index + 1)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={() => dispatchStepperState({...stepperState, activeStep: index + 1})}
                completed={completed.has(index + 1)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

WorkflowStepper.props = {
  stepperState: PropTypes.object,
  dispatchStepperState: PropTypes.func
}

const mapStateToProps = createPropsSelector({
  stepperState: getStepperState
})

const mapDispatchToProps = ({
  dispatchStepperState
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkflowStepper)