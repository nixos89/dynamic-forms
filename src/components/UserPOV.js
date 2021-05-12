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
import {fromJS} from "immutable";
import {getFormIndex, indexOfFormElementFunction} from "../redux/store/reducerUtils";
import {addSharedFormToState} from "../redux/actions/actions";

class UserPOV extends React.Component {

  /* NOTE: IFF class-based component use `componentDidMount` (invoke e.g.
      `addFormToGlobalState` action) or some Hook IFF functional component!
      P.S. Hooks that follow should be on TOP of the UserPOV body!  */
  constructor(props) {
    super(props);
    const {location, reduxState} = props;
    console.log("reduxState:", reduxState);
    let pathName = location.pathname;
    let encodedData = pathName.slice(1);
    const jsonFormString = decodeURIComponent(escape(atob(encodedData)));
    const im_linkedForm = fromJS(JSON.parse(jsonFormString));
    const id = im_linkedForm.get("id");
    const formName = im_linkedForm.get("formName");
    this.state = {
      id: id,
      formName: formName,
      im_linkedForm: im_linkedForm,
      formElements: [],
      currentReduxState: reduxState
    }
    this.downloadForm = this.downloadForm.bind(this);
  }


  static getDerivedStateFromProps(props, state) {
    // props.onAddSharedFormToState(state.im_linkedForm);// behaves as setState({..}) -> throws an error
    console.log("reduxState:", props.reduxState);
    const formIndex = getFormIndex(state.currentReduxState, state.id);
    const updatedFormElements = state.currentReduxState.getIn(["forms", formIndex, "formElements"]);

    // if (props.reduxState !== state.currentReduxState) {
    //   return {
    //     currentReduxState: props.reduxState,
    //     formElements: updatedFormElements
    //   }
    // }
    return {
      currentReduxState: props.reduxState,
      formElements: updatedFormElements
    }
    // return null;
  }

  // NOTE: can not use "componentWillMount()" as it does NOT work in React 17+
  componentDidMount() {
    console.log("this.state.im_linkedForm:", this.state.im_linkedForm);
    this.props.onAddSharedFormToState(this.state.im_linkedForm);
    // TODO: Step1 - Retrieve result into `updatedState`
    /*
    const updatedState = this.props.onAddSharedFormToState(this.state.im_linkedForm);
    console.log("updatedState:", updatedState);
    console.log("reduxState:", this.props.reduxState);

    const formIndex = getFormIndex(this.state.currentReduxState, this.state.id);
    const updatedFormElements = this.state.currentReduxState.getIn(
      ["forms", formIndex, "formElements"]);

    this.setState({
      formElements: updatedFormElements
    });*/
  }


  // Form to be downloaded!
  downloadForm() {
    console.log("in da downloadForm(..)::START");
    const formIndex = getFormIndex(this.props.reduxState, this.state.id);
    const updatedFormElements = this.state.currentReduxState.getIn(
      ["forms", formIndex, "formElements"]);
    let formToBeSaved = {
      id: this.state.id,
      formName: this.state.formName,
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
    const fileName = this.state.formName + "-" + this.state.id + "-" + dateDetails;
    link.download = `${fileName}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("in da downloadForm(..)::END");
  }//downloadForm::END


  // TODO: Step3B - Fix Bootstrap CSS styling for input field to be INLINE with buttonS
  render() {
    return (
      <div>
        <div className="form-group form-row">
          <legend style={{padding: "20px"}}>{this.state.formName}</legend>
          <ul>
            {this.state.formElements.map((formElement, index) => {
              const elementId = formElement.get("id");
              const label = formElement.get("label");
              const formIndex = getFormIndex(this.state.currentReduxState, this.state.id);
              const indexOfFormEl = indexOfFormElementFunction(this.state.currentReduxState,
                this.state.id, elementId);
              // let value = formElement.get("value");
              let value = this.state.currentReduxState.getIn(
                ["forms", formIndex, "formElements", indexOfFormEl, "value"]);

              const formElementType = formElement.get("formElementType");

              switch (formElementType) {
                case ADD_TEXT_INPUT_FIELD: {
                  return (
                    <div key={index}>
                      <InputTextComponent
                        key={index}
                        id={elementId}
                        formId={this.state.id}
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
                        formId={this.state.id}
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
          onClick={this.downloadForm}
          className="btn btn-success btn-sm">
          Save form
        </button>
      </div>
    )
  };
}

/* NOTE: IFF UserPOV is functional-based component might want to replace
 * mapXXXToProps functions with useSelector + useDispatch Hooks ! */
function mapStateToProps(state) {
  const {mainReducer, rootReducer} = state;
  console.log("rootReducer:", rootReducer);
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
