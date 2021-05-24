import React from "react";
import {getFormIndex} from "../redux/store/reducerUtils";
import InputTextComponent from "./InputTextComponent";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {deleteField} from "../redux/actions/actions";
import {INPUT_TEXT_FIELD, INPUT_TEXTAREA_FIELD} from "../redux/store/formElementTypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as ImmutablePropTypes from "react-immutable-proptypes";

function FormComponent(props) {
  const {formName, formElements, formId, deleteForm, key, updatedFormElements} = props;

  const shareForm = () => {
    /* TODO: fix properly sharing UPDATED pre-created forms from `initialState`
        (i.e. after deleting field, changing its value, etc.) */
    console.log("id=", formId, ", formName:", formName, ", formElements:", formElements);
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
    document.body.removeChild(link);
  }


  return (
    <div key={key} className="justify-content-center">
      <div className="form-row ">
        <legend style={{padding: "20px"}}><b style={{
          textDecorationStyle: "underline",
          fontStyle: "italic"
        }}>{formName}</b></legend>
      </div>
      <div className="form-group justify-content-center">
        <ul>
          {formElements.map((formElement, index) => {
            const id = formElement.get("id");
            const label = formElement.get("label");
            const value = formElement.get("value");
            const formElementType = formElement.get("formElementType");

            switch (formElementType) {
              case INPUT_TEXT_FIELD: {
                return (
                  <div key={index} className="form-row ">
                    <div className="col-9">
                      <InputTextComponent
                        key={index}
                        id={id}
                        formId={formId}
                        label={label}
                        value={value}
                      />
                    </div>
                    <div className="col-3">
                      <button
                        onClick={() => props.onDeleteField(formId, id)}
                        className="btn btn-outline-danger btn-sm">
                        <span style={{color: "white"}}
                              role="img"
                              aria-label="x-sign">❌</span>
                      </button>
                    </div>
                  </div>
                );
              }
              case INPUT_TEXTAREA_FIELD: {
                return (
                  <div key={index}>
                    <div className="form-row">
                      <div className="col-9">
                        <InputTextAreaComponent
                          key={index}
                          id={id}
                          formId={formId}
                          label={label}
                          value={value}
                        />
                      </div>
                      <div className="col-2">
                        <button
                          onClick={() => props.onDeleteField(formId, id)}
                          className="btn btn-outline-danger btn-sm">
                          <span style={{color: "white"}}
                                role="img"
                                aria-label="x-sign">❌</span>
                        </button>
                      </div>
                    </div>
                  </div>//END::<div key={index} className="form-row align-items-center">
                );
              }
              default: {
                return (<p>Ingen inntastingsfelt lagt til i gjeldende skjemaer ennå!</p>);
              }
            }
          })}
        </ul>
      </div>
      {/*END::<div className="form-group form-row">*/}
      <div className="form-group row justify-content-center">
        <button onClick={shareForm}
                className="btn btn-outline-success btn-sm">Del skjema
        </button>
        &nbsp;
        <button onClick={() => deleteForm(formId)}
                className="btn btn-danger btn-sm">Slett Form
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {mainReducer, formId} = state;
  const formIndex = getFormIndex(mainReducer, formId);
  return {
    updatedFormElements: mainReducer.getIn(["forms", formIndex, "formElements"])
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      onDeleteField: deleteField
    }, dispatch)
}

FormComponent.propTypes = {
  formId: PropTypes.number,
  formName: PropTypes.string,
  formElements: ImmutablePropTypes.list.isRequired,
  updatedFormElements: ImmutablePropTypes.list.isRequired,
  deleteForm: PropTypes.func,
  shareForm: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
