import {
  DELETE_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
}
  from "../actions/actionTypes";
import im_initialState from "./initialState";
import {getFormIndex, indexOfFormElementFunction} from "./reducerUtils";

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
