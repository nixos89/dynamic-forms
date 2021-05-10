import {
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_TEXTAREA_INPUT_FIELD,
  CLEAR_CURRENT_FORM,
  DELETE_FIELD,
  DELETE_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
  SET_LINKED_FORM,
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

export const setDisplayedForm = (encodedForm) => ({
  type: SET_LINKED_FORM,
  payload: {
    encodedForm: encodedForm
  }
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
