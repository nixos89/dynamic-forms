import React, { Component } from "react";
import FormComponent from "./FormComponent";

/* HELPER function for debugging purpose */
function printToConsole(formComponent, formElements) {
  console.log(
    "(in da 1st return(..) of FormListComponent) formComponent:",
    formComponent,
    "\n(in da 1st return(..) of FormListComponent)" +
      " formComponent.get('formElements'):",
    formElements
  );
}

class FormListComponent extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.forms.map((formComponent, index) => {
          // printToConsole(formComponent, formComponent.get("formElements"));
          return (
            <FormComponent
              key={index}
              id={formComponent.id}
              formName={formComponent.formName}
              formElements={formComponent.formElements}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default FormListComponent;
