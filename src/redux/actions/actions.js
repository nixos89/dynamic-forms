import {
  ADD_NEW_FORM,
  ADD_NEW_FORM_CHANGED,
  ADD_SHARED_FORM_TO_STATE,
  DELETE_FIELD,
  DELETE_FORM,
  EDIT_INPUT_FIELD
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

export const editCurrentInputField = (id, formId, inputFieldValue) => ({
  type: EDIT_INPUT_FIELD,
  payload: {
    id: id,
    formId: formId,
    inputFieldValue: inputFieldValue,
  },
});


export const deleteField = (formId, id) => ({
  type: DELETE_FIELD,
  payload: {
    formId: formId,
    id: id
  }
});

export const deleteForm = (formId) => ({
  type: DELETE_FORM,
  payload: {
    formId: formId
  }
});


export const addSharedFormToState = (im_linkedForm) => ({
  type: ADD_SHARED_FORM_TO_STATE,
  payload: {
    im_linkedForm
  }
});