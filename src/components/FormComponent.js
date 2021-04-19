import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
} from "../redux/actions/actionTypes";
import InputTextAreaComponent from "./InputTextAreaComponent";

class FormComponent extends Component {
  render() {
    console.log("formElements:", this.props.formElements);
    return (
      <div className="form-group">
        <h2>{this.props.formName}</h2>
        <ul>
          {this.props.formElements.map((formElement) => {
            switch (formElement.formElementType) {
              case ADD_TEXT_INPUT_FIELD:
                return (
                  <InputTextComponent
                    key={formElement.id}
                    // key={index}
                    label={formElement.label}
                    value={formElement.value}
                  />
                );
              case ADD_TEXTAREA_INPUT_FIELD:
                return (
                  <InputTextAreaComponent
                    key={formElement.id}
                    id={formElement.id}
                    // key={index}
                    label={formElement.label}
                    value={formElement.value}
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
}

export default FormComponent;
