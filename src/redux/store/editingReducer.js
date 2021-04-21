import {
  CLEAR_CURRENT_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";

export function editingReducer(state = im_initialState, action) {
  /* TODO: Refactor 'editingReducer' methods to be compatible to work with Immutable.js objects! */

  // state.get("forms").flatMap(value => console.log("(in da flatMap) value.get('id'):", value.get("id")));
  // console.log("(in da 'editingReducer') forms:", forms);
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
          ...state.get("forms"),
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
