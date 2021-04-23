import {
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FORM,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
  // ADD_NUMBER_INPUT_FIELD,
  // SHOW_FORM_MODAL,
  // HIDE_FORM_MODAL,
  // FILL_FORM,
  // EDIT_FORM,
  // DELETE_FORM,
  CLEAR_CURRENT_FORM,
  SHOW_FORM_MODAL,
} from "./actionTypes";

/* TODO: Step1 - Check Milos I. fieldAction.js payload examples in that file and
 *   where those same arrow funcs are being used!!! */
export const newFormChanged = (newFormName) => {
  return {
    type: ADD_NEW_FORM_CHANGED,
    newFormName,
  };
};

export const addNewForm = (newForm) => {
  return {
    type: ADD_NEW_FORM,
    newForm,
  };
};

export const addTextInputField = (inputTextField) => {
  return {
    type: ADD_TEXT_INPUT_FIELD,
    inputTextField,
  };
};

export const addTextAreaInputField = (inputTextAreaField) => {
  return {
    type: ADD_TEXTAREA_INPUT_FIELD,
    inputTextAreaField,
  };
};

export const editCurrentTextField = (inputTextFieldValue, id) => {
  return {
    type: EDIT_INPUT_TEXT_FIELD,
    inputTextFieldValue,
    id,
  };
};

export const editCurrentTextAreaField = (id, inputTextAreaFieldValue) => {
  return {
    type: EDIT_INPUT_TEXTAREA_FIELD,
    id,
    inputTextAreaFieldValue,
  };
};

export const showFormModal = (clicked) => {
  return {
    type: SHOW_FORM_MODAL,
    clicked,
  };
};

export const clearCurrentForm = () => {
  return {
    type: CLEAR_CURRENT_FORM,
  };
};
