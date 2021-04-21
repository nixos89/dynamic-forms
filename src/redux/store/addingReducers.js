import {
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  SHOW_FORM_MODAL,
} from "../actions/actionTypes";

import im_initialState from "./initialState";

export function addingReducer(state = im_initialState, action) {
  /* TODO: Refactor 'addingReducer' methods to be compatible to work with
      Immutable.js objects -> 'state.forms' needs to be iterable!!! */

  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      return {
        ...state,
        state: action.newFormName,
      };
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
    case ADD_TEXTAREA_INPUT_FIELD:
      {
        return {
          ...state,
          forms: [...state.get("forms"), action.inputTextAreaField],
        };
      }
      {
        /* SHOW_FORM_MODAL is sufficient since LOCAL state is being used in MainComponent! */
      }
    case SHOW_FORM_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }

    default:
      return state;
  }
}
