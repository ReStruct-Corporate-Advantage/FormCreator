import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {getAttributeMeta, getAttributes, getNewSectionAttributes} from '../../pages/Createattribute/selectors';
import {dispatchNewSectionAttributes} from '../../pages/Createattribute/actions';
import ButtonsPanel from '../ButtonsPanel';
import Attribute from '../attribute/Attribute';
import Section from '../Section/Section';
import FormHeader from '../FormHeader';
import './SectionCreator.component.scss';

const SectionCreator = ({
    attributesMeta,
    attributeDetails,
    dispatchNewSectionAttributes,
    formErrors,
    formValues,
    newSectionAttributes,
    updateFormErrors,
    updateFormValues
  }) => {
  const sectionNameOpts = {formErrors, formValues, updateFormErrors, updateFormValues};
  const sectionDescriptionOpts = {formErrors, formValues, updateFormErrors, updateFormValues};
  const selectorOpts = {attributeDetails, formErrors, formValues, updateFormErrors, updateFormValues};
  const attributes = attributeDetails.attributes;

  if (attributesMeta) {
    let sectionNameMeta = attributesMeta.attributes.textInput
    let sectionDescriptionMeta = {...sectionNameMeta}
    let attributeSelectorMeta = attributesMeta.attributes.multiSelectDropdown
    // console.log(attributeDetails.attributes)
    sectionNameMeta.placeholder = "Enter Section Name";
    sectionNameMeta.label = "SECTION NAME";
    sectionNameMeta.id = "section_name_id"
    sectionNameMeta.layoutClasses = "col-12";
    if (!sectionNameMeta.validation) {
      sectionNameMeta.validation = {};
    }
    sectionNameMeta.validation.required = true;
    sectionNameMeta.validation.validators = ["validateRequired"];
    sectionNameOpts.attributeInfo = sectionNameMeta;
    
    sectionDescriptionMeta.placeholder = "Enter Section Description";
    sectionDescriptionMeta.label = "SECTION DESCRIPTION";
    sectionDescriptionMeta.id = "section_description_id"
    sectionDescriptionMeta.layoutClasses = "col-12";
    if (!sectionDescriptionMeta.validation) {
      sectionDescriptionMeta.validation = {};
    }
    sectionDescriptionMeta.validation.required = true;
    sectionDescriptionMeta.validation.validators = ["validateRequired"];
    sectionDescriptionOpts.attributeInfo = sectionDescriptionMeta;

    attributeSelectorMeta.id = "attribute_selector_id"
    attributeSelectorMeta.layoutClasses = "col-12";
    attributeSelectorMeta.labelClasses = "col-2";
    attributeSelectorMeta.bodyClasses = "col-10";
    attributeSelectorMeta.options = Object.keys(attributes);
    attributeSelectorMeta.label = "SELECT ATTRIBUTES";
    selectorOpts.attributeInfo = attributeSelectorMeta;
  }

  const updateSection = (selectedAttributeString) => {
    const selectedAttributeList = selectedAttributeString.split(',')
    dispatchNewSectionAttributes(selectedAttributeList.map(attrName => attributes[attrName]).filter(attr => attr));
    console.log(newSectionAttributes);
  }

  const createSection = (sectionName, key) => {
    const section = {}
    const attributes = {}
    section.ClassificationName = "";
    section.ClassificationDesc = "";
    section.attributes = attributes;
    newSectionAttributes && newSectionAttributes.forEach(attr => {
      // attr.id = attr.general_id;
      // attr.attributeType = attr.type;
      // if (!attr.layoutClasses) {
      //   attr.layoutClasses = "col-12 col-lg-6";
      // }
      // attr.label = attr.general_displayName
      attributes[attr.general_displayName] = attr
    })

    const opts = {formErrors, formValues, section, updateFormErrors, updateFormValues}
    return (
      <div key={key}>
        <Section {...opts} />
        <p> - </p>
      </div>
    );
  }

  selectorOpts.customChangeHandler = updateSection;

  return (
    <form className="c-SectionCreator c-SectionCreator--shadow" id="sectionCreator">
      <FormHeader title="Create Section" />
      <div className="c-SectionCreator__content container">
        <div className="row c-SectionCreator__section-creator">
          <div className="col-6">
            <Attribute {...sectionNameOpts} />
          </div>
          <div className="col-6">
            <Attribute {...sectionDescriptionOpts} />
          </div>
          <div className="col-12">
            <Attribute {...selectorOpts} />
          </div>
        </div>
        {newSectionAttributes && newSectionAttributes.length > 0 && <div className="row">
          <div className="col-12">
            {createSection()}
          </div>
        </div>}
        <div className="row">
          <ButtonsPanel 
            containerClass="col-12" btnclassName="c-AttributeCreator__attribute-customizer__btn-Submit" placement="right" />
        </div>
      </div>
    </form>
  );
};

SectionCreator.propTypes = {
  attributesMeta: PropTypes.object,
  attributeDetails: PropTypes.object,
  dispatchNewSectionAttributes: PropTypes.func,
  newSectionAttributes: PropTypes.array
};

const mapStateToProps = createPropsSelector({
  attributeDetails: getAttributes,
  attributesMeta: getAttributeMeta,
  newSectionAttributes: getNewSectionAttributes
})

const mapDispatchToProps = {
  dispatchNewSectionAttributes
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionCreator);