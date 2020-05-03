import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {withRouter} from 'react-router-dom';
import {getAttributeMeta, getFormErrors, getFormValues} from './selectors';
import {dispatchAttributeMeta, updateFormErrors, updateFormValues} from './actions'
import AttributeCreator from '../../components/AttributeCreator';
import './Createattribute.module.scss';

const Createattribute = ({attributesMeta, dispatchAttributeMeta, formErrors, formValues, handleChange, updateFormErrors, updateFormValues}) => {
  const opts = {attributesMeta, formErrors, formValues, handleChange, updateFormErrors, updateFormValues}
  useEffect(() => {
    fetch('http://localhost:3001/attributesMeta')
    .then(res => res.json())
    .then(data => dispatchAttributeMeta({attributesMeta: JSON.parse(data)}))
  }, [dispatchAttributeMeta])

  return (
    <div className="c-Createattribute">
      <div className="container c-Createattribute__container">
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
  attributesMeta: PropTypes.object,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  handleChange: PropTypes.func,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  attributesMeta: getAttributeMeta,
  formErrors: getFormErrors,
  formValues: getFormValues
})

const mapDispatchToProps = {
  dispatchAttributeMeta,
  updateFormErrors,
  updateFormValues
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Createattribute));