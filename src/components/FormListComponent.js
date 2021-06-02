import React, {Component} from "react";
import FormComponent from "./FormComponent";

class FormListComponent extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.im_forms.map((formComponent, index) => {
          return (
            <FormComponent
              key={index}
              formId={formComponent.get("id")}
              formName={formComponent.get("formName")}
              formElements={formComponent.get("formElements")}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default FormListComponent;
