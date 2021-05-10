import React from "react";
import InputTextComponent from "./InputTextComponent";
import {ADD_TEXT_INPUT_FIELD, ADD_TEXTAREA_INPUT_FIELD} from "../redux/actions/actionTypes";
import {deleteField} from "../redux/actions/actions";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {getFormIndex} from "../redux/store/reducerUtils";

function FormComponent(props) {
  const {formName, formElements, formId, deleteForm, key, reduxState} = props;
  console.log("reduxState:", reduxState);

  const shareForm = () => {
    const formIndex = getFormIndex(reduxState, formId);
    const updatedFormElements = reduxState.getIn(
      ["forms", formIndex, "formElements"]);

    // TODO: Change left-side elements to be from REDUX state and NOT from 'props'
    let formToBeSaved = {
      id: formId,
      formName: formName,
      formElements: updatedFormElements
    };
    console.log("formToBeSaved:", formToBeSaved);
    const formDataString = JSON.stringify(formToBeSaved);
    console.log("formDataString:", formDataString);
    let encodedData = btoa(unescape(encodeURIComponent(formDataString)));
    console.log("encodedData:", encodedData);
    const link = document.createElement("a");
    // const blob = new Blob([encodedData], {type: "text/plain"});
    // TODO: Step1 - Use  https://www.pluralsight.com/guides/using-react-router-with-redux
    link.href = encodedData;
    console.log("link.href:", link.href);
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    console.log("link clicked!!!");
    document.body.removeChild(link);
  }


  // TODO: Step4 - Fix Bootstrap CSS styling for input field to be INLINE with buttonS
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
                      // formElementTypeTIF={EDIT_INPUT_TEXT_FIELD}
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
                      // formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
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
      {/*<Link to={"/"+formId} key={formId}>*/}
      {/*  <UserPOV formId={formId} formName={formName} formElements={formElements} />*/}
      {/*</Link>*/}
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
    reduxState: mainReducer
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
