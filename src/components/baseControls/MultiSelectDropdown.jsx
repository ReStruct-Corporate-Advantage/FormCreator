import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

function MultiSelectDropdown(props) {
  const convertObjectToOptions = option => option.displayName ? option.displayName : option;
  const getValuesFromObjects = item => props.options.find(option => option.displayName ? option.displayName === item : option === item)
  const options = typeof props.options === 'object' ? props.options.map(convertObjectToOptions) : props.options;
  const validation = props.validation && props.validation.client ? props.validation.client : props.validation

  const commonHandler = (selectedList) => {
    let dummyEvent = {}
    if (typeof props.options === 'object') {
      selectedList = selectedList.map(getValuesFromObjects);
      if (selectedList[0] && typeof selectedList[0] === 'object') {
        selectedList = selectedList.map(item => item.name);
      }
    }
    const selectedItemsString = selectedList.join(',');
    dummyEvent.target = {};
    dummyEvent.target.value = selectedItemsString;
    dummyEvent.target.tagName = "INPUT";
    dummyEvent.isDummy = true;
    props.onChangeHandler(dummyEvent, validation);
  }

  const onSelectHandler = (selectedList, selectedItem) => {
    commonHandler(selectedList);
  }

  const onRemoveHandler = (selectedList, removedItem) => {
    commonHandler(selectedList);
  }

  return (
    <div className={`c-MultiSelectDropdown${props.layoutClasses ? " " + props.layoutClasses : ''}`} style={{color: 'black'}}>
      {props.error && <span className="error offset-12 offset-sm-4 offset-lg-4">{props.errorMessage}</span>}
      <div className={`form-group row${props.containerClasses ? " " + props.containerClasses : ''}`}
            aria-required={props.aria_required}>
        <label htmlFor={props.id} className={`${props.labelClasses ? props.labelClasses : "col-12 col-sm-4 col-lg-4"} col-form-label`}>
          {props.label} {validation.required && props.starVal}
        </label>
        <div className={`${props.bodyClasses ? props.bodyClasses : "col-12 col-sm-8 col-lg-8"}`}>
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
