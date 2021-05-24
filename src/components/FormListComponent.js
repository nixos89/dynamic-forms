import React, {Component} from "react";
import {connect} from "react-redux";
import FormComponent from "./FormComponent";
import {deleteForm} from "../redux/actions/actions";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

class FormListComponent extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.forms.map((formComponent, index) => {
          return (
            <FormComponent
              key={index}
              formId={formComponent.get("id")}
              formName={formComponent.get("formName")}
              formElements={formComponent.get("formElements")}
              deleteForm={this.props.onDeleteForm}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onDeleteForm: deleteForm
  }, dispatch)
}

FormListComponent.propTypes = {
  onDeleteForm: PropTypes.func
}

export default connect(null, mapDispatchToProps)(FormListComponent);
