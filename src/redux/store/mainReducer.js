import {
  ADD_NEW_FIELD,
  ADD_NEW_FORM,
  ADD_SHARED_FORM_TO_STATE,
  DELETE_FIELD,
  DELETE_FORM,
  EDIT_INPUT_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";
import {getFormIndex, indexOfFormElementFunction} from "./reducerUtils";
import {fromJS, Map} from "immutable";

export function mainReducer(state = im_initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM: {
      const {id, formName, formElements} = action.payload;
      const newFormToAdd = Map({id: id, formName: formName, formElements: formElements});
      return state.update("forms", forms => forms.push(newFormToAdd));
    }
    case ADD_NEW_FIELD: {
      const {formElementType, label} = action.payload;
      return fromJS({
        id: Math.random() + 100,
        formElementType: formElementType,
        label: label,
      });
    }
    case EDIT_INPUT_FIELD: {
      const {id: elementId, formId, inputFieldValue} = action.payload;
      const formIndex = getFormIndex(state, formId);
      const indexOfFormEl = indexOfFormElementFunction(state, formId, elementId);
      return state.setIn(
        ["forms", formIndex, "formElements", indexOfFormEl, "value"],
        inputFieldValue
      );
    }
    case DELETE_FORM: {
      const {formId} = action.payload;
      const formIndex = getFormIndex(state, formId);
      return state.deleteIn(["forms", formIndex]);
    }
    case DELETE_FIELD: {
      const {formId, id} = action.payload; // 'id' is ID of inputElement
      const formIndex = getFormIndex(state, formId);
      const indexOfFormEl = indexOfFormElementFunction(state, formId, id);
      let updatedState = state.deleteIn(["forms", formIndex, "formElements", indexOfFormEl]);
      let currentFormElements = state.getIn(["forms", formIndex, "formElements"]);
      if ((currentFormElements.size - 1) === 0) {
        updatedState = state.deleteIn(["forms", formIndex]);
      }
      return updatedState;
    }
    case ADD_SHARED_FORM_TO_STATE: {
      const {im_linkedForm} = action.payload;
      const formIndex = getFormIndex(state, im_linkedForm.get("id"));
      let updatedState;
      if (formIndex !== -1) {
        updatedState = state.setIn(["forms", formIndex, "formElements"], im_linkedForm.get("formElements"));
      } else {
        updatedState = state.update("forms", forms => forms.push(im_linkedForm));
      }
      return updatedState;
    }
    default: {
      return state;
    }
  }
}