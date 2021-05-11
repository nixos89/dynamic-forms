import React from "react";
import InputTextComponent from "./InputTextComponent";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD
} from "../redux/actions/actionTypes";
import {deleteField} from "../redux/actions/actions";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {getFormIndex} from "../redux/store/reducerUtils";

function FormComponent(props) {
  const {formName, formElements, formId, deleteForm, key, reduxState, forms} = props;
  console.log("reduxState:", reduxState);

  const shareForm = () => {
    const formIndex = getFormIndex(reduxState, formId);
    console.log("forms:", forms);
    const updatedFormElements = reduxState.getIn(
      ["forms", formIndex, "formElements"]);

    let formToBeSaved = {
      id: formId,
      formName: formName,
      formElements: updatedFormElements
    };
    const formDataString = JSON.stringify(formToBeSaved);
    let encodedData = btoa(unescape(encodeURIComponent(formDataString)));
    const link = document.createElement("a");
    link.href = encodedData;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    console.log("link clicked!!!");
    document.body.removeChild(link);
  }


  // TODO: Step3A - Fix Bootstrap CSS styling for input field to be INLINE with buttonS
  return (
    <div key={key}>
      <div className="form-group form-row">
        <legend style={{padding: "20px"}}>{formName}</legend>
        <ul>
          {formElements.map((formElement, index) => {
            const id = formElement.get("id");
            const label = formElement.get("label");
            const value = formElement.get("value");
            const formElementType = formElement.get("formElementType");

            switch (formElementType) {
              case ADD_TEXT_INPUT_FIELD: {
                return (
                  <div key={index}>
                    <InputTextComponent
                      key={index}
                      id={id}
                      formId={formId}
                      formElementTypeTIF={EDIT_INPUT_TEXT_FIELD}
                      label={label}
                      value={value}
                    />
                    <button
                      onClick={() => props.onDeleteField(formId, id)}
                      className="btn btn-danger btn-sm">
                      X
                    </button>
                  </div>
                );
              }
              case ADD_TEXTAREA_INPUT_FIELD: {
                return (
                  <div key={index}>
                    <InputTextAreaComponent
                      key={index}
                      id={id}
                      formId={formId}
                      formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
                      label={label}
                      value={value}
                    />
                    <button
                      onClick={() => props.onDeleteField(formId, id)}
                      className="btn btn-danger btn-sm">
                      X
                    </button>
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
      <button
        onClick={shareForm}
        className="btn btn-outline-success btn-sm">
        Share form
      </button>
      &nbsp;
      <button className="btn btn-danger btn-sm"
              onClick={() => deleteForm(formId)}>Delete Form
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  const {mainReducer} = state;
  return {
    reduxState: mainReducer,
    forms: mainReducer.get("forms")
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onDeleteField(formId, id) {
      dispatch(deleteField(formId, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
