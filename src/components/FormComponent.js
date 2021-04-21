import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
} from "../redux/actions/actionTypes";
import InputTextAreaComponent from "./InputTextAreaComponent";

/* HELPER function for debugging purpose */
function printOnConsole(id, formElementType, label) {
  console.log(
    "(in da FormComponent-render) formElement.get('id'):",
    id,
    "\nformElement.get('formElementType'):",
    formElementType,
    "\n(in da FormComponent-render) formElement.get('label'):",
    label
  );
}

function FormComponent(props) {
  const { formName, formElements, id } = props;

  return (
    <div className="form-group form-row">
      <legend style={{ padding: "20px" }}>{formName}</legend>
      <ul>
        {formElements.map((formElement, index) => {
          const id = formElement.get("id");
          const label = formElement.get("label");
          const value = formElement.get("value");
          const formElementType = formElement.get("formElementType");
          // printOnConsole(id, formElementType, label);
          switch (formElementType) {
            case "ADD_TEXT_INPUT_FIELD":
              return (
                <InputTextComponent
                  key={index}
                  id={id}
                  label={label}
                  value={value}
                />
              );
            case "ADD_TEXTAREA_INPUT_FIELD":
              return (
                <InputTextAreaComponent
                  key={index}
                  id={id}
                  label={label}
                  value={value}
                />
              );
            default:
              break;
          }
        })}
      </ul>
    </div>
  );
}

export default FormComponent;
