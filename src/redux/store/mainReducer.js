import {
  ADD_NEW_FIELD,
  ADD_NEW_FORM,
  DELETE_FIELD,
  DELETE_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";
import {getFormIndex, indexOfFormElementFunction} from "./reducerUtils";
import {fromJS, Map} from "immutable";

export function mainReducer(state = im_initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM: {
      console.log("*** in da case ADD_NEW_FORM::START ***");
      const {id, formName, formElements} = action.payload;
      const newFormToAdd = Map({id: id, formName: formName, formElements: formElements});

      const newState = state.update("forms", forms => forms.push(newFormToAdd));
      console.log("newState:", newState);
      console.log("*** in da case ADD_NEW_FORM::END ***");
      return newState;
    }
    case ADD_NEW_FIELD: {
      const {formElementType, label} = action.payload;
      return fromJS({
        id: Math.random() + 100,
        formElementType: formElementType,
        label: label,
      });
    }
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
        ["forms", formIndex, "formElements", indexOfFormEl, "value"],
        inputTextAreaFieldValue
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
      if ((currentFormElements.size-1) === 0) {
        updatedState = state.deleteIn(["forms", formIndex]);
      }
      return updatedState;
    }
    default: {
      return state;
    }
  }
}