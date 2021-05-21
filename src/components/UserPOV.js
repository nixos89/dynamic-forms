import React from "react";
import InputTextComponent from "./InputTextComponent";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {addSharedFormToState} from "../redux/actions/actions";
import {getSharedForm} from "../redux/store/reducerUtils";
import {bindActionCreators} from "redux";
import {INPUT_TEXT_FIELD, INPUT_TEXTAREA_FIELD} from "../redux/store/formElementTypes";
import {ImmutablePropTypes} from "redux-form";

class UserPOV extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: {
        pathname
      },
      // form: {
      //   id,
      //   formName,
      //   formElements
      // },
      addSharedFormToState
    } = props;

    const im_linkedForm = getSharedForm(pathname);
    addSharedFormToState(im_linkedForm);
    this.downloadForm = this.downloadForm.bind(this);
  }

  downloadForm() {
    /* TODO: fix reading of Immutable Map obj by https://stackoverflow.com/q/34762608/6805866 and
        https://esdiscuss.org/topic/extensible-destructuring-proposal
        or by passing form's properties into mapStateToProps */
    const {
      form: im_form,
      form: {
        id,
        formName,
        formElements
      }
    } = this.props;
    // const id = form.get("id");
    console.log("form:", im_form, "typeof im_form:", typeof im_form);
    console.log("id=", id, ", formName:", formName,  ", formElements:", formElements);

    let formToBeSaved = {
      id: this.props.id,
      formName: this.props.formName,
      formElements: this.props.formElements
    };
    const formData = JSON.stringify(formToBeSaved);
    const blob = new Blob([formData], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date();
    const dateDetails = date.getHours() + "h" + date.getMinutes() + "m" + date.getSeconds()
      + "s_" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const fileName = this.props.formName + "-" + this.props.id + "-" + dateDetails;
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

              switch (formElementType) {
                case INPUT_TEXT_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextComponent key={index} id={elementId} formId={formId}
                                          // formElementTypeTIF={EDIT_INPUT_TEXT_FIELD}
                                          label={label}
                                          value={formElement.get("value")}
                      />
                    </div>
                  );
                }
                case INPUT_TEXTAREA_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextAreaComponent key={index} id={elementId} formId={formId}
                                              // formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
                                              label={label}
                                              value={formElement.get("value")}
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

// TODO: implement PropTypes in all Components!!!
function mapStateToProps(state, ownProps) {
  const {mainReducer} = state;
  const formId = getSharedForm(ownProps.location.pathname).get("id");
  console.log("(in da mapping) formId=", formId);
  const retrievedForm = mainReducer.get("forms").filter(form => form.get("id") === formId).first();
  console.log("(in da mapping) retrievedForm=", retrievedForm);
  return {
    form: retrievedForm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSharedFormToState
  }, dispatch);
}

// UserPOV.propTypes = {
//   form: ImmutablePropTypes.map.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(UserPOV);
