import {fromJS} from "immutable";

export function getFormIndex(state, formId) {
  return state.get("forms").findIndex((im_form) => im_form.get("id") === formId);
}

export function getFormIndexByForms(forms, formId) {
  return forms.findIndex((im_form) => im_form.get("id") === formId);
}

export function indexOfFormElementFunction(state, formId, elementId) {
  const formIndex = getFormIndex(state, formId);
  return state
    .getIn(["forms", formIndex, "formElements"])
    .findIndex((im_formElement) => im_formElement.get("id") === elementId);
}

export function getSharedForm(pathName){
  let encodedData = pathName.slice(1);
  const jsonFormString = decodeURIComponent(escape(atob(encodedData)));
  return fromJS(JSON.parse(jsonFormString));
}