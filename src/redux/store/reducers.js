import {
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FORM,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  // ADD_NUMBER_INPUT_FIELD,
  // SHOW_FORM_MODAL,
  // HIDE_FORM_MODAL,
  // FILL_FORM,
  // EDIT_FORM,
  // DELETE_FORM,
  CLEAR_CURRENT_FORM,
} from "../actions/actionTypes";

import initialState from "./initialState";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      return {
        ...state,
        newFormName: action.newFormName,
      };
    }
    case ADD_NEW_FORM: {
      return {
        ...state,
        forms: [...state.forms, action.newForm],
      };
    }
    case ADD_TEXT_INPUT_FIELD: {
      return {
        ...state,
        forms: [...state.forms, action.inputTextField],
      };
    }
    case ADD_TEXTAREA_INPUT_FIELD: {
      return {
        ...state,
        forms: [...state.forms, action.inputTextAreaField],
      };
    }
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
