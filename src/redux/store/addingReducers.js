import {
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FIELD,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  SHOW_FORM_MODAL,
} from "../actions/actionTypes";

import im_initialState from "./initialState";
import {fromJS} from "immutable";

export function addingReducer(state = im_initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      const newState = state.set("newFormName", action.newForm);
      console.log("(in da case-ADD_NEW_FORM_CHANGED) newState:", newState);
      return newState;
    }
    case ADD_NEW_FORM: {
      const newState = state;
      return newState;
    }
    case ADD_NEW_FIELD: {
      const {formElementType, label, value} = action.payload;
      const randomId = Math.random() + 100;
      const toBeCreatedForm = fromJS({
        id: randomId,
        formElementType: formElementType,
        label: label,
        value: value
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
    default:
      return state;
  }
}
