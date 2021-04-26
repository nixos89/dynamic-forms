import {
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FORM,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
  SHOW_FORM_MODAL,
  HIDE_FORM_MODAL,
  // FILL_FORM,
  // EDIT_FORM,
  // DELETE_FORM,
  CLEAR_CURRENT_FORM,
} from "./actionTypes";


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

export const editCurrentTextField = (key, id, formId, formElementTypeTIF, inputTextFieldValue) => ({
  type: EDIT_INPUT_TEXT_FIELD,
  payload: {
    id: id,
    formId: formId,
    key: key,
    formElementTypeTIF: formElementTypeTIF,
    inputTextFieldValue: inputTextFieldValue,
  },
});

export const editCurrentTextAreaField = (key, id, formId, formElementTypeTAIF,
                                         inputTextAreaFieldValue) => ({
  type: EDIT_INPUT_TEXTAREA_FIELD,
  payload: {
    key: key,
    id: id,
    formId: formId,
    formElementTypeTAIF: formElementTypeTAIF,
    inputTextAreaFieldValue: inputTextAreaFieldValue,
  }
});

export const showFormModal = (modalProps, modalType) => ({
  type: SHOW_FORM_MODAL,
  payload: {
    modalProps,
    modalType
  }
});

export const hideFormModal = () => ({
  type: HIDE_FORM_MODAL
});

export const clearCurrentForm = () => {
  return {
    type: CLEAR_CURRENT_FORM,
  };
};
