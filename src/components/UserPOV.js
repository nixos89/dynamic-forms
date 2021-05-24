import React from "react";
import InputTextComponent from "./InputTextComponent";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {addSharedFormToState} from "../redux/actions/actions";
import {getSharedForm} from "../redux/store/reducerUtils";
import {bindActionCreators} from "redux";
import {INPUT_TEXT_FIELD, INPUT_TEXTAREA_FIELD} from "../redux/store/formElementTypes";
import ImmutablePropTypes from "react-immutable-proptypes/src/ImmutablePropTypes"
import PropTypes from "prop-types";

class UserPOV extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: {
        pathname
      },
      addSharedFormToState
    } = props;

    const im_linkedForm = getSharedForm(pathname);
    addSharedFormToState(im_linkedForm);
    this.downloadForm = this.downloadForm.bind(this);
  }

  downloadForm() {
    const {
      form: im_form,
    } = this.props;
    const id = im_form.get("id");
    const formName = im_form.get("formName");
    const formElements = im_form.get("formElements");
    let formToBeSaved = {
      id: id,
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
    const fileName = formName + "-" + id + "-" + dateDetails;
    link.download = `${fileName}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  render() {
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
              const value = formElement.get("value");

              switch (formElementType) {
                case INPUT_TEXT_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextComponent
                        key={index}
                        id={elementId}
                        formId={formId}
                        label={label}
                        value={value}
                      />
                    </div>
                  );
                }
                case INPUT_TEXTAREA_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextAreaComponent
                        key={index}
                        id={elementId}
                        formId={formId}
                        label={label}
                        value={value}
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
  const retrievedForm = mainReducer.get("forms").filter(form => form.get("id") === formId).first();
  return {
    form: retrievedForm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSharedFormToState
  }, dispatch);
}

UserPOV.propTypes = {
  formId: PropTypes.number,
  form: ImmutablePropTypes.map.isRequired,
  downloadForm: PropTypes.func,
  addSharedFormToState: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPOV);
