import {
  ADD_NEW_FIELD,
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  CLEAR_CURRENT_FORM,
  DELETE_FIELD,
  DELETE_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
  HIDE_FORM_MODAL,
  SHOW_FORM_MODAL,
} from "./actionTypes";


export const newFormChanged = (newFormName) => {
  return {
    type: ADD_NEW_FORM_CHANGED,
    newFormName,
  };
};

export const addNewForm = (id, formName, formElements) => ({
  type: ADD_NEW_FORM,
  payload: {
    id: id,
    formName: formName,
    formElements: formElements
  }
});

export const addNewFieldToForm = (label, formElementType) => ({
  type: ADD_NEW_FIELD,
  payload: {
    label: label,
    formElementType: formElementType
  }
});

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

// by this:
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

export const deleteField = (formId, id) => ({
  type: DELETE_FIELD,
  payload: {
    formId: formId,
    id: id
  }
})

export const deleteForm = (formId) => ({
  type: DELETE_FORM,
  payload: {
    formId: formId
  }
});
