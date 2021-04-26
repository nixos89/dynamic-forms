import React, {Component} from "react";
import FormComponent from "./FormComponent";
import {deleteForm} from "../redux/actions/actions";

class FormListComponent extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.forms.map((formComponent, index) => {
          const formId = formComponent.get("id");
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

function mapDispatchToProps(dispatch) {
  return {
    onDeleteForm(formId) {
      dispatch(deleteForm(formId));
    }
  }
}


export default FormListComponent;
