import {
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FORM,
  ADD_TEXT_INPUT_FIELD,
  // ADD_TEXTAREA_INPUT_FIELD,
  // ADD_NUMBER_INPUT_FIELD,
  // SHOW_FORM_MODAL,
  // HIDE_FORM_MODAL,
  // FILL_FORM,
  // EDIT_FORM,
  // DELETE_FORM,
  CLEAR_CURRENT_FORM,
} from "./actionTypes";

export const actions = {
  newFormChanged(newFormName) {
    return {
      type: ADD_NEW_FORM_CHANGED,
      newFormName,
    };
  },
  addNewForm(newForm) {
    return {
      type: ADD_NEW_FORM,
      newForm,
    };
  },
  addTextInputField(inputTextField) {
    return {
      type: ADD_TEXT_INPUT_FIELD,
      inputTextField,
    };
  },
  addTextAreaInputField(inputTextAreaField) {
    return {
      type: ADD_TEXT_INPUT_FIELD,
      inputTextAreaField,
    };
  },
  clearCurrentForm() {
    return {
      type: CLEAR_CURRENT_FORM,
    };
  },
};
