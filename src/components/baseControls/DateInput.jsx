import React from "react";

function DateInput(props) {
  const validation = props.validation.client ? props.validation.client : props.validation
  return (
    <div className={`c-DateInput${props.layoutClasses ? " " + props.layoutClasses : ''}`}>
      <div className={`form-group row${props.containerClasses ? " " + props.containerClasses : ''}`}
            aria-required={props.aria_required}>
        <label htmlFor={props.id} className="col-12 col-sm-4 col-lg-4 col-form-label">
          {props.label} {validation.required.isRequired && !props.isStandAloneField && props.starVal}
        </label>
        <div className="col-12 col-sm-8 col-lg-8">
          {props.error && <span className="error">{props.errorMessage}</span>}
          <input
            className={`form-control${props.error ? ' error' : ''}`}
            id={props.id}
            type={props.subtype}
            value={props.value}
            required={validation.required.isRequired ? 'required' : ''}
            onBlur={(e) => props.onBlurHandler(e, validation)}
            onChange={props.onChangeHandler}
            aria-required={props.aria_required}
            aria-invalid={props.aria_invalid}
          />
        </div>
      </div>
    </div>
  );
}

export default DateInput;
