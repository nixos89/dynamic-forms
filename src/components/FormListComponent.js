import React, { Component } from "react";
import FormComponent from "./FormComponent";

class FormListComponent extends Component {
  render() {
    console.log("this.props.forms:", this.props.forms);

    return (
      <React.Fragment>
        {this.props.forms.map((formComponent, index) => {
          console.log("formComponent:", formComponent);
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
