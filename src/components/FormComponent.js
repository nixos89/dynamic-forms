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

function FormComponent(props) {
  const {formName, formElements, formId, deleteForm/*, downloadForm*/} = props;

  /* TODO: Step1 - Implement button link for opening NEW tab (via ReactRouter) which contains SELECTED form
       with empty fields and when you populate them you click on `Download form` and download it with populated fields!  */
  const downloadForm = () => {
    console.log("in da downloadForm(..)::START");
    let formToBeSaved = {
      id: formId,
      formName: formName,
      formElements: formElements
    };
    console.log("IN da IF-statement:", JSON.stringify(formToBeSaved));
    const formData = JSON.stringify(formToBeSaved);
    console.log("formData:", formData);
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
    console.log("link clicked!!!");
    document.body.removeChild(link);
  }


  // TODO: Step3 - Fix Bootstrap CSS styling for input field to be INLINE with buttonS
  return (
    <div>
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
        onClick={downloadForm}
        className="btn btn-outline-success btn-sm">
        Download form
      </button>
      &nbsp;
      <button className="btn btn-danger btn-sm"
              onClick={() => deleteForm(formId)}>Delete Form
      </button>
    </div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onDeleteField(formId, id) {
      dispatch(deleteField(formId, id));
    }
  }
}

export default connect(null, mapDispatchToProps)(FormComponent);
