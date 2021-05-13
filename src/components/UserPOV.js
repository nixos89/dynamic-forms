import React from "react";
import InputTextComponent from "./InputTextComponent";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../redux/actions/actionTypes";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {addSharedFormToState} from "../redux/actions/actions";
import {getSharedForm} from "../redux/store/reducerUtils";

class UserPOV extends React.Component {

  constructor(props) {
    super(props);
    const im_linkedForm = getSharedForm(props.location.pathname);
    props.onAddSharedFormToState(im_linkedForm);
    this.downloadForm = this.downloadForm.bind(this);
  }

  downloadForm() {
    const formId = this.props.form.get("id");
    const formName = this.props.form.get("formName");
    const formElements = this.props.form.get("formElements");
    let formToBeSaved = {
      id: formId,
      formName: formName,
      formElements: formElements
    };
    const formData = JSON.stringify(formToBeSaved);
    const blob = new Blob([formData], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date();
    const dateDetails = date.getHours() + "h" + date.getMinutes() + "m" + date.getSeconds()
      + "s_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const fileName = formName + "-" + formId + "-" + dateDetails;
    link.download = `${fileName}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  render() {
    // console.log("props.form:", this.props.form);
    if (!this.props.form) {
      return <p>Loading...</p>
    }
    return (
      <div className="justify-content-center">
        <div className="form-group row offset-4">
          <legend style={{padding: "20px"}}>
            <b style={{textDecorationStyle: "underline", fontStyle: "italic"}}>
              {this.props.form.get("formName")}
            </b>
          </legend>
        </div>
        <div className="form-group row justify-content-center">
          <ul>
            {this.props.form.get("formElements").map((formElement, index) => {
              const elementId = formElement.get("id");
              const label = formElement.get("label");
              const formId = this.props.form.get("id");
              const formElementType = formElement.get("formElementType");

              switch (formElementType) {
                case ADD_TEXT_INPUT_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextComponent key={index} id={elementId} formId={formId}
                        formElementTypeTIF={EDIT_INPUT_TEXT_FIELD} label={label}
                        value={formElement.get("value")}
                      />
                    </div>
                  );
                }
                case ADD_TEXTAREA_INPUT_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextAreaComponent key={index} id={elementId} formId={formId}
                        formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
                        label={label}  value={formElement.get("value")}
                      />
                    </div>
                  );
                }
                default: {
                  return (<p>No input fields added to current from yet!</p>);
                }
              }
            })}
          </ul>
        </div>
        <div className="form-group row justify-content-center">
          <button
            onClick={this.downloadForm}
            className="btn btn-success btn-sm">
            Save form
          </button>
        </div>
      </div>
    )
  };
}

function mapStateToProps(state, ownProps) {
  const {mainReducer} = state;
  const formId = getSharedForm(ownProps.location.pathname).get("id");

  return {
    reduxState: mainReducer,
    formsRedux: mainReducer.get("forms"),
    form: mainReducer.get("forms").filter(form => form.get("id") === formId).first(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddSharedFormToState(im_linkedForm) {
      dispatch(addSharedFormToState(im_linkedForm));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPOV);
