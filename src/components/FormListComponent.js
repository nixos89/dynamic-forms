import React, { Component } from "react";
import FormComponent from "./FormComponent";


class FormListComponent extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.forms.map((formComponent, index) => {
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
