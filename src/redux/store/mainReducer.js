import {
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FIELD,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  SHOW_FORM_MODAL,
  DELETE_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
}
  from "../actions/actionTypes";
import im_initialState from "./initialState";
import {getFormIndex, indexOfFormElementFunction} from "./reducerUtils";
import {fromJS, Map} from "immutable";

export function mainReducer(state = im_initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      const newState = state.set("newFormName", action.newForm);
      console.log("(in da case-ADD_NEW_FORM_CHANGED) newState:", newState);
      return newState;
    }
    case ADD_NEW_FORM: {
      console.log("*** in da case ADD_NEW_FORM::START ***");
      const {id, formName, formElements} = action.payload;
      const newFormToAdd = Map({id: id, formName: formName, formElements: formElements});

      // console.log("newFormToAdd:", newFormToAdd);
      // const formsSize = state.get("forms").size; // eq to .length

      const newState = state.update("forms", forms => forms.push(newFormToAdd));
      console.log("newState:", newState);
      console.log("*** in da case ADD_NEW_FORM::END ***");
      return newState;
    }
    case ADD_NEW_FIELD: {
      const {formElementType, label} = action.payload;
      const toBeCreatedForm = fromJS({
        id: Math.random() + 100,
        formElementType: formElementType,
        label: label,
      });
      return toBeCreatedForm;
    }
    case ADD_TEXT_INPUT_FIELD: {
      const newState = state;
      return newState;
    }
    case ADD_TEXTAREA_INPUT_FIELD: {
      const newState = state;
      return newState;
    }
    case SHOW_FORM_MODAL: {
      const res = state.setIn("showModal", true);
      console.log("(in da case SHOW_FORM_MODAL) res:", res);
      return res;
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
      const updatedState = state.deleteIn(["forms", formIndex]);
      return updatedState;
    }
    default: {
      return state;
    }
  }
}