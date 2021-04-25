import React from "react";
import InputTextComponent from "./InputTextComponent";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD
} from "../redux/actions/actionTypes";
import InputTextAreaComponent from "./InputTextAreaComponent";

function FormComponent(props) {
  const {formName, formElements, formId} = props;

  return (
    <div className="form-group form-row">
      <legend style={{padding: "20px"}}>{formName}</legend>
      <ul>
        {formElements.map((formElement, index) => {
          const id = formElement.get("id");
          const label = formElement.get("label");
          const value = formElement.get("value");
          const formElementType = formElement.get("formElementType");

          if (ADD_TEXT_INPUT_FIELD === formElementType && ADD_TEXTAREA_INPUT_FIELD !== formElementType) {
            console.log("in da 'if (ADD_TEXT_INPUT_FIELD === formElementType)'::START");
            console.log("formElementType:", formElementType, "; value:", value);
            console.log("in da 'if (ADD_TEXT_INPUT_FIELD === formElementType)'::END");
            return (
              <InputTextComponent
                key={index}
                id={id}
                formId={formId}
                formElementTypeTIF={EDIT_INPUT_TEXT_FIELD}
                label={label}
                value={value}
              />
            );
          } else if (ADD_TEXT_INPUT_FIELD !== formElementType && ADD_TEXTAREA_INPUT_FIELD === formElementType) {
            console.log("in da 'if (ADD_TEXTAREA_INPUT_FIELD === formElementType)'::START");
            console.log("formElementType:", formElementType, "; value:", value);
            console.log("in da 'if (ADD_TEXTAREA_INPUT_FIELD === formElementType)'::END");
            return (
              <InputTextAreaComponent
                key={index}
                id={id}
                formId={formId}
                formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
                label={label}
                value={value}
              />
            );
          } else {
            return (<p>No input fields added to current from yet!</p>);
          }

        })}
      </ul>
    </div>
  );
}

export default FormComponent;
