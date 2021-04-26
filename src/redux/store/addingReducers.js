import {
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  SHOW_FORM_MODAL,
} from "../actions/actionTypes";

import im_initialState from "./initialState";

export function addingReducer(state = im_initialState, action) {
  /* TODO: Step2 - Refactor 'addingReducer' methods to be compatible to work with
      Immutable.js objects -> 'state.forms' needs to be iterable!!! */

  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      const newState = state.set("newFormName", action.newForm);
      console.log("(in da case-ADD_NEW_FORM_CHANGED) newState:", newState);
      return newState;
    }
    case ADD_NEW_FORM: {
      return {
        ...state,
        forms: [...state.get("forms"), action.newForm],
      };
    }
    case ADD_TEXT_INPUT_FIELD: {
      return {
        ...state,
        forms: [...state.get("forms"), action.inputTextField],
      };
    }
    case ADD_TEXTAREA_INPUT_FIELD: {
      return {
        ...state,
        forms: [...state.get("forms"), action.inputTextAreaField],
      };
    }
    case SHOW_FORM_MODAL: {
      const res = state.setIn("showModal", true);
      console.log("(in da case SHOW_FORM_MODAL) res:", res);
      return res;
    }
    default:
      return state;
  }
}
