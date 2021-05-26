import React from "react";
import {getFormIndex} from "../redux/store/reducerUtils";
import InputTextComponent from "./InputTextComponent";
import InputTextAreaComponent from "./InputTextAreaComponent";
import {deleteField, deleteForm} from "../redux/actions/actions";
import {INPUT_TEXT_FIELD, INPUT_TEXTAREA_FIELD} from "../redux/store/formElementTypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as ImmutablePropTypes from "react-immutable-proptypes";

function FormComponent(props) {
  const {
    formName: im_formName,
    formElements: im_formElements,
    formId: im_formId,
    deleteForm, key, updatedFormElements, deleteField} = props;

  const shareForm = () => {
    const updatedFormElementsJS = updatedFormElements.toJS();
    let formToBeSaved = {
      id: im_formId,
      formName: im_formName,
      formElements: updatedFormElementsJS
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

  const deleteButtonFunc = (formId, id) => {
    return (
      <button
        onClick={() => deleteField(formId, id)}
        className="btn btn-outline-danger btn-sm">
          <span style={{color: "white"}} role="img" aria-label="x-sign">❌</span>
      </button>
    )
  }


  return (
    <div key={key} className="justify-content-center">
      <div className="form-row ">
        <legend style={{padding: "20px"}}><b style={{
          textDecorationStyle: "underline",
          fontStyle: "italic"
        }}>{im_formName}</b></legend>
      </div>
      <div className="form-group justify-content-center">
        <ul>
          {im_formElements.map((formElement, index) => {
            const im_id = formElement.get("id");
            const im_label = formElement.get("label");
            const im_value = formElement.get("value");
            const im_formElementType = formElement.get("formElementType");
            deleteButtonFunc(im_formId, im_id)

            switch (im_formElementType) {
              case INPUT_TEXT_FIELD: {
                return (
                  <div key={index} className="form-row ">
                    <div className="col-9">
                      <InputTextComponent
                        key={index}
                        id={im_id}
                        formId={im_formId}
                        label={im_label}
                        value={im_value}
                      />
                    </div>
                    <div className="col-3">
                      {deleteButtonFunc(im_formId, im_id)}
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
                          id={im_id}
                          formId={im_formId}
                          label={im_label}
                          value={im_value}
                        />
                      </div>
                      <div className="col-3">
                        {deleteButtonFunc(im_formId, im_id)}
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
        <button onClick={() => deleteForm(im_formId)}
                className="btn btn-danger btn-sm">Slett Form
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const {mainReducer} = state;
  const formIndex = getFormIndex(mainReducer, ownProps.formId);
  const updatedFormElements = mainReducer.getIn(["forms", formIndex, "formElements"]);
  return {
    updatedFormElements: updatedFormElements,
    updatedFormElementsOwnProps: ownProps.formElements
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteField,
    deleteForm
  }, dispatch)
}

FormComponent.propTypes = {
  im_formId: PropTypes.number,
  im_formName: PropTypes.string,
  formElements: ImmutablePropTypes.list.isRequired,
  updatedFormElements: ImmutablePropTypes.list.isRequired,
  shareForm: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
