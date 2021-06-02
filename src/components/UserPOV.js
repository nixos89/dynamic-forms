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
    const im_id = im_form.get("id");
    const im_formName = im_form.get("formName");
    const im_formElements = im_form.get("formElements");
    let formToBeSaved = {
      id: im_id,
      formName: im_formName,
      formElements: im_formElements
    };
    const formData = JSON.stringify(formToBeSaved);
    const blob = new Blob([formData], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date();
    const dateDetails = date.getHours() + "h" + date.getMinutes() + "m" + date.getSeconds()
      + "s_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const fileName = im_formName + "-" + im_id + "-" + dateDetails;
    link.download = `${fileName}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  render() {
    console.log("this.props.form:", this.props.form);
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
            {this.props.form.get("formElements").map((im_formElement, index) => {
              const im_elementId = im_formElement.get("id");
              const im_label = im_formElement.get("label");
              const im_formId = this.props.form.get("id");
              const im_formElementType = im_formElement.get("formElementType");
              const im_value = im_formElement.get("value");

              switch (im_formElementType) {
                case INPUT_TEXT_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextComponent
                        key={index}
                        id={im_elementId}
                        formId={im_formId}
                        label={im_label}
                        value={im_value}
                      />
                    </div>
                  );
                }
                case INPUT_TEXTAREA_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextAreaComponent
                        key={index}
                        id={im_elementId}
                        formId={im_formId}
                        label={im_label}
                        value={im_value}
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
  const im_formId = getSharedForm(ownProps.location.pathname).get("id");
  const im_retrievedForm = mainReducer.get("forms").filter(form => form.get("id") === im_formId).first();
  return {
    form: im_retrievedForm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSharedFormToState
  }, dispatch);
}

UserPOV.propTypes = {
  form: ImmutablePropTypes.map.isRequired,
  downloadForm: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPOV);
