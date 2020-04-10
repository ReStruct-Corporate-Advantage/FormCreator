import React from "react";
// import { v4 as uuidv4 } from "uuid";

function createOptions(optionName, key) {
  return (
    <option key={key} value={optionName}>
      {optionName}
    </option>
  );
}

function SingleSelectDropdown(props) {
  const options = props.options;
  const validation = props.validation.client ? props.validation.client : props.validation
  const optionList = options && options.length > 0 && options.map(createOptions)

  return (
    <div className={`c-SingleSelectDropdown${props.layoutClasses ? " " + props.layoutClasses : ''}`}>
      {props.error && <span className="error offset-12 offset-sm-4 offset-lg-4">{props.errorMessage}</span>}
      <div className={`form-group row${props.containerClasses ? " " + props.containerClasses : ''}`}
            aria-required={props.aria_required}>
        <label htmlFor={props.id} className="col-12 col-sm-4 col-lg-4 col-form-label">
          {props.label} {validation.required && props.starVal}
        </label>
        <div className="col-12 col-sm-8 col-lg-8">
          {/* {props.error && <span className="error">{props.errorMessage}</span>} */}
          <select
            className={`form-control${props.error ? ' error' : ''}`}
            id={props.id}
            name={props.name}
            onBlur={(e) => props.onBlurHandler(e, validation)}
            value={props.value}
            onChange={props.onChangeHandler}
            multiple={props.multiple}
          >
            {optionList}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SingleSelectDropdown;
