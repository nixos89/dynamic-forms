import React, {useEffect} from "react";
import InputTextComponent from "./InputTextComponent";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../redux/actions/actionTypes";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import {getFormIndex, indexOfFormElementFunction} from "../redux/store/reducerUtils";
import {addSharedFormToState} from "../redux/actions/actions";

function UserPOV(props) {
  const {formsRedux, reduxState, onAddSharedFormToState} = props;

  /* TODO: Step1 - IFF class-based component use `componentDidMount` (invoke e.g.
        `addFormToGlobalState` action) or some Hook IFF functional component!
        P.S. Hooks that follow should be on TOP of the UserPOV body!  */
  useEffect(() => {
    console.log("Executing useEffect hook...");
    let pathName = props.location.pathname;
    let encodedData = pathName.slice(1);
    const jsonFormString = decodeURIComponent(escape(atob(encodedData)));
    const im_linkedForm = fromJS(JSON.parse(jsonFormString));
    onAddSharedFormToState(im_linkedForm);
  },);

  let pathName = props.location.pathname;
  let encodedData = pathName.slice(1);
  const jsonFormString = decodeURIComponent(escape(atob(encodedData)));
  const im_linkedForm = fromJS(JSON.parse(jsonFormString));
  const id = im_linkedForm.get("id");
  const formName = im_linkedForm.get("formName");
  // const retrievedFormElements = im_linkedForm.get("formElements");


  const currentForms = reduxState.get("forms");
  console.log("currentForms:", currentForms);

  const formElements = im_linkedForm.get("formElements");

  console.log("props:", props);
  console.log("props.formsRedux:", formsRedux);
  console.log("reduxState:", reduxState);
  console.log("formElements:", formElements);

  // Form to be downloaded!
  const downloadForm = () => {
    console.log("in da downloadForm(..)::START");
    const formIndex = getFormIndex(reduxState, id);
    const updatedFormElements = reduxState.getIn(
      ["forms", formIndex, "formElements"]);
    let formToBeSaved = {
      id: id,
      formName: formName,
      /* TODO: Step2-  'formElements' value MUST be changed (use the one from Redux and NOT
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
    const fileName = formName + "-" + id + "-" + dateDetails;
    link.download = `${fileName}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("in da downloadForm(..)::END");
  }//downloadForm::END


  // TODO: Step3B - Fix Bootstrap CSS styling for input field to be INLINE with buttonS
  return (
    <div>
      <div className="form-group form-row">
        <legend style={{padding: "20px"}}>{formName}</legend>
        <ul>
          {formElements.map((formElement, index) => {
            const elementId = formElement.get("id");
            const label = formElement.get("label");
            const formIndex = getFormIndex(reduxState, id);
            const indexOfFormEl = indexOfFormElementFunction(reduxState, id, elementId);
            let value = reduxState.getIn(
              ["forms", formIndex, "formElements", indexOfFormEl, "value"]);
            // let value = formElement.get("value");

            const formElementType = formElement.get("formElementType");

            switch (formElementType) {
              case ADD_TEXT_INPUT_FIELD: {
                return (
                  <div key={index}>
                    <InputTextComponent
                      key={index}
                      id={elementId}
                      formId={id}
                      formElementTypeTIF={EDIT_INPUT_TEXT_FIELD}
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
                      id={elementId}
                      formId={id}
                      formElementTypeTAIF={EDIT_INPUT_TEXTAREA_FIELD}
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

/* NOTE: Might want to replace mapXXXToProps functions with
 * useSelector + useDispatch Hooks! */
function mapStateToProps(state) {
  const {mainReducer, rootReducer} = state;
  console.log("rootReducer", rootReducer);
  return {
    reduxState: mainReducer,
    formsRedux: mainReducer.get("forms")
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddSharedFormToState(im_linkedForm) {
      dispatch(addSharedFormToState(im_linkedForm));
    }
  }
}

// UserPOV = React.memo(UserPOV);

export default connect(mapStateToProps, mapDispatchToProps)(UserPOV);
