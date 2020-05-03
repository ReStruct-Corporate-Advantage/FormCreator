import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import './StepperButtonPanel.component.scss';
import {Typography, Button, makeStyles} from '@material-ui/core';
import {dispatchStepperState} from '../../pages/TabbedRoot/actions';
import {getStepperState} from '../../pages/TabbedRoot/selectors';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getStepContent(step) {
  switch (step) {
    case 1:
      return 'Step 1: Select Attribute';
    case 2:
      return 'Step 2: Customize Attribute - Add properties';
    case 3:
      return 'Step 3: Select validations to apply on submit of field';
    case 4:
      return 'Step 4: Add Attributes to Section';
    case 5:
      return 'Step 5: Add Section To form';
    default:
      return 'Unknown step';
  }
}

const StepperButtonPanel = props => {
  const classes = useStyles();
  const {stepperState, dispatchStepperState} = props;
  const {activeStep, completedList, skippedList, totalSteps} = stepperState
  const steps = ['Select Attribute', 'Customize Attribute', 'Select validations', 'Create Section', 'Create Form'];
  const skipped = new Set(skippedList);
  const completed = new Set(completedList);

  const handleSkip = () => {
    if (activeStep !== 1) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    let newActiveStep = activeStep + 1;
    dispatchStepperState({...stepperState, activeStep: newActiveStep, skippedList: skipped.add(newActiveStep)})
  };

  // const skippedSteps = () => {
  //   return skipped.size;
  // };

  // const completedSteps = () => {
  //   return completed.size;
  // };

  const allStepsCompleted = () => {
    return completed.size === totalSteps - skipped.size;
  };

  const isLastStep = () => {
    return activeStep === totalSteps;
  };

  const handleNext = (event, newCompleted) => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i + 1))
        : activeStep + 1;

    if (newCompleted) {
      dispatchStepperState({...stepperState, activeStep: newActiveStep, completedList: newCompleted})
    } else {
      dispatchStepperState({...stepperState, activeStep: newActiveStep})
    }
    if (props.submitFormHandler) {
      props.submitFormHandler()
    }
  };

  const handleBack = () => {
    dispatchStepperState({...stepperState, activeStep: activeStep - 1})
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    // dispatchStepperState({...stepperState, completedList: newCompleted})

    if (!allStepsCompleted()) {
      handleNext(null, newCompleted);
    }
  };

  const handleReset = () => {
    dispatchStepperState({...stepperState, activeStep: 1, completedList: [], skippedList: []})
  };

  return (
    <div className='c-StepperButtonPanel'>
            <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={!props.enableCriteria}
              >
                Next
              </Button>
              {activeStep === 1 && !completed.has(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleComplete} disabled={!props.enableCriteria}>
                    {completed.size === totalSteps - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StepperButtonPanel.propTypes = {
  classes: PropTypes.object,
  enableCriteria: PropTypes.bool,
  stepperState: PropTypes.object,
  submitFormHandler: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  stepperState: getStepperState
})
const mapDispatchToProps = {
  dispatchStepperState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepperButtonPanel);