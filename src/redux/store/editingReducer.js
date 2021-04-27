import {
  DELETE_FORM, EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";
import {fromJS, Map, List} from "immutable";

function getFormIndex(state, formId) {
  return state
    .get("forms")
    .findIndex((im_form) => im_form.get("id") === formId);
}

function indexOfFormElementFunction(state, formId, elementId) {
  console.log("(in da indexOfFormElementFunction): formId =", formId);
  console.log("(in da indexOfFormElementFunction): elementId =", elementId);
  console.log(
    "(in da indexOfFormElementFunction): state.getIn(['forms', formId, 'formElements']) =",
    state.getIn(["forms", formId, "formElements"])
  );
  return state
    .getIn(["forms", formId, "formElements"])
    .indexOf((im_formElement) => im_formElement.get("id") === elementId);
}

export function editingReducer(state = im_initialState, action) {
  switch (action.type) {
    case EDIT_INPUT_TEXT_FIELD: {
      const {id: elementId, formId, inputTextFieldValue} = action.payload;
      const formIndex = getFormIndex(state, formId);
      const indexOfFormEl = indexOfFormElementFunction(state, formId, elementId);

      return state.setIn(["forms", formIndex, "formElements", indexOfFormEl, "value"],
        inputTextFieldValue
      );
    }
    case EDIT_INPUT_TEXTAREA_FIELD: {
      const {id: elementId, formId, inputTextAreaFieldValue} = action.payload;
      const formIndex = getFormIndex(state, formId);
      const indexOfFormEl = indexOfFormElementFunction(state, formId, elementId);

      return state.setIn(
        ["forms", realFormId, "formElements", indexOfITAF, "value"],
        inputTextAreaFieldValue
      );
    }
    case DELETE_FORM: {
      const {formId} = action.payload;
      const formIndex = getFormIndex(state, formId);
      const updatedState = state.deleteIn(["forms", formIndex]);
      return updatedState;
    }
    default: {
      return state;
    }
  }
}
