import {
  CLEAR_CURRENT_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";

export function editingReducer(state = im_initialState, action) {
  /* TODO: Refactor 'addingReducer' methods to be compatible to work with
      Immutable.js objects -> 'state.forms' needs to be iterable!!!
      1 Idea: access fields by passing IDs of each element (forms' ID,
      formElements' ID) so it know EXACTLY which field to change!!! */
  switch (action.type) {
    case EDIT_INPUT_TEXT_FIELD:
      return {
        ...state,
        forms: [...state.get("forms"), action.inputTextFieldValue, action.id],
      };
    case EDIT_INPUT_TEXTAREA_FIELD:
      return {
        ...state,
        forms: [
          ...state.get("forms").get("formElements.0"),
          action.inputTextAreaFieldValue,
          action.id,
        ],
      };
    case CLEAR_CURRENT_FORM: {
      return {
        ...state,
        newFormName: "",
      };
    }
    default:
      return state;
  }
}
