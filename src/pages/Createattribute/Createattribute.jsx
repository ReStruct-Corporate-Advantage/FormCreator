import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {withRouter} from 'react-router-dom';
import {getAttributes, getFormErrors, getFormValues} from './selectors';
import {dispatchAttributes, updateFormErrors, updateFormValues} from './actions'
import AttributeCreator from '../../components/AttributeCreator/AttributeCreator';
import './Createattribute.module.scss';

const Createattribute = ({attributes, formErrors, formValues, updateFormErrors, updateFormValues}) => {
  const opts = {attributes, formErrors, formValues, updateFormErrors, updateFormValues}
  useEffect(() => {
    fetch('http://localhost:3001/attributes')
    .then(res => res.json())
    .then(data => dispatchAttributes({attributes: JSON.parse(data)}))
  }, [])

  return (
    <div className="c-Createattribute">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AttributeCreator {...opts}/>
          </div>
        </div>
      </div>
    </div>
  );
};


Createattribute.propTypes = {
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  attributes: getAttributes,
  formErrors: getFormErrors,
  formValues: getFormValues
})

const mapDispatchToProps = {
  dispatchAttributes,
  updateFormErrors,
  updateFormValues
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Createattribute));