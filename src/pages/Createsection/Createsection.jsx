import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { getAttributes, getAttributeMeta, getFormErrors, getFormValues } from './../Createattribute/selectors';
import { updateFormErrors, updateFormValues } from './../Createattribute/actions';
import SectionCreator from '../../components/SectionCreator/SectionCreator';
import './Createsection.module.scss';

const Createsection = ({formErrors, formValues, updateFormErrors, updateFormValues }) => {
  const opts = {formErrors, formValues, updateFormErrors, updateFormValues }
  return (
    <div className="c-Createsection">
      <div className="container c-Createsection__container">
        <div className="row">
          <div className="col-12">
            <SectionCreator {...opts} />
          </div>
        </div>
      </div>
    </div>
  );
};

Createsection.propTypes = {
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  attributeDetails: getAttributes,
  attributesMeta: getAttributeMeta,
  formErrors: getFormErrors,
  formValues: getFormValues
})

const mapDispatchToProps = {
  updateFormErrors,
  updateFormValues
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Createsection);
