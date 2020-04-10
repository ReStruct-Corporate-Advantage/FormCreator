// https://codesandbox.io/s/10xn41w767
// https://10xn41w767.codesandbox.io/

import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

function MultiSelectDropdown(props) {
  const options = props.options;
  const validation = props.validation.client ? props.validation.client : props.validation

  const onSelectHandler = (selectedList, selectedItem) => {
    let dummyEvent = {}
    const selectedItemsString = selectedList.join(',')
    dummyEvent.target = {}
    dummyEvent.target.value = selectedItemsString
    dummyEvent.target.tagName = "INPUT"
    dummyEvent.isDummy = true;
    props.onChangeHandler(dummyEvent, validation)
  }

  const onRemoveHandler = (selectedList, removedItem) => {
    let dummyEvent = {}
    const selectedItemsString = selectedList.join(',')
    dummyEvent.target = {}
    dummyEvent.target.value = selectedItemsString
    dummyEvent.target.tagName = "INPUT"
    dummyEvent.isDummy = true;
    props.onChangeHandler(dummyEvent, validation)
  }

  return (
    <div className={`c-MultiSelectDropdown${props.layoutClasses ? " " + props.layoutClasses : ''}`}>
      {props.error && <span className="error offset-12 offset-sm-4 offset-lg-4">{props.errorMessage}</span>}
      <div className={`form-group row${props.containerClasses ? " " + props.containerClasses : ''}`}
            aria-required={props.aria_required}>
        <label htmlFor={props.id} className="col-12 col-sm-4 col-lg-4 col-form-label">
          {props.label} {validation.required.isRequired && !props.isStandAloneField && props.starVal}
        </label>
        <div className="col-12 col-sm-8 col-lg-8">
          {/* {props.error && <span className="error">{props.errorMessage}</span>} */}
          <Multiselect
            className={`form-control${props.error ? ' error' : ''}`}
            id={props.id}
            options={options}
            isObject={false}
            onSelect={onSelectHandler} // Function will trigger on select event
            onRemove={onRemoveHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
