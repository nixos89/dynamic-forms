import React from "react";
import InputTextComponent from "./InputTextComponent";
import {ADD_TEXT_INPUT_FIELD, ADD_TEXTAREA_INPUT_FIELD,} from "../redux/actions/actionTypes";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import {getFormIndex, indexOfFormElementFunction} from "../redux/store/reducerUtils";

/* TODO: Render form by following next link:
 *  https://www.storyblok.com/tp/react-dynamic-component-from-json#creating-components-dynamically
 *  https://www.pluralsight.com/guides/using-react-router-with-redux */

function UserPOV(props) {
  // const {formName, formElements, formId} = props;
  const {forms, reduxState} = props;

  // console.log("encodedForm:", encodedForm);
  let pathName = props.location.pathname;
  let encodedData = pathName.slice(1);
  const jsonFormString = decodeURIComponent(escape(atob(encodedData)));
  const linkedForm = fromJS(JSON.parse(jsonFormString));

  const formElements = linkedForm.get("formElements");

  const formId = linkedForm.get("id");
  const formName = linkedForm.get("formName");

  console.log("props:", props);
  console.log("props.forms:", props.forms);
  console.log("reduxState:", reduxState);
  console.log("formElements:", formElements);

  // Form to be downloaded!
  const downloadForm = () => {
    console.log("in da downloadForm(..)::START");
    const formIndex = getFormIndex(reduxState, formId);
    const updatedFormElements = reduxState.getIn(
      ["forms", formIndex, "formElements"]);
    let formToBeSaved = {
      id: formId,
      formName: formName,
      /* TODO:  'formElements' value MUST be changed (use the one from Redux and NOT
          the one extracted from DECODED form -> because values can be changed VIA Redux)!
       */
      formElements: updatedFormElements
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
    console.log("in da downloadForm(..)::END");
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
            // TODO: check for INPUT TYPE!!
            const sentValue = formElement.get("value");
            const formIndex = getFormIndex(reduxState, formId);
            const indexOfFormEl = indexOfFormElementFunction(reduxState, formId, id);
            let value = reduxState.getIn(
              ["forms", formIndex, "formElements", indexOfFormEl, "value"]);
            // let value;
            // if (sentValue === "") {
            //   value = ""
            // } else {
            //   const formIndex = getFormIndex(state, formId);
            //   const indexOfFormEl = indexOfFormElementFunction(state, formId, id);
            //   const retrievedValue = state.getIn(
            //     ["forms", formIndex, "formElements", indexOfFormEl, "value"]);
            //   value = retrievedValue;
            // }

            const formElementType = formElement.get("formElementType");

            switch (formElementType) {
              case ADD_TEXT_INPUT_FIELD: {
                return (
                  <div key={index}>
                    <InputTextComponent
                      key={index}
                      id={id}
                      formId={formId}
                      // formElementTypeTIF={EDIT_INPUT_TEXT_FIELD}
                      label={label}
                      value={value}
                    />
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
                      // formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
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
      <button
        onClick={downloadForm}
        className="btn btn-success btn-sm">
        Save form
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

export default connect(mapStateToProps)(UserPOV);
