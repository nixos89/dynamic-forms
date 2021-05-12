import {fromJS} from "immutable";

export function getFormIndex(state, formId) {
  return state.get("forms").findIndex((im_form) => im_form.get("id") === formId);
}

export function getFormIndexByForms(forms, formId) {
  return forms.findIndex((im_form) => im_form.get("id") === formId);
}

export function indexOfFormElementFunction(state, formId, elementId) {
  /* NOTE: Try this https://stackoverflow.com/a/40627682/6805866 out or
      this one: https://cutt.ly/5v7kJnB */
  const formIndex = getFormIndex(state, formId);

  const finalRes = state
    .getIn(["forms", formIndex, "formElements"])
    .findIndex((im_formElement) => im_formElement.get("id") === elementId);
  return finalRes;
}

export function getSharedForm(pathName){
  let encodedData = pathName.slice(1);
  const jsonFormString = decodeURIComponent(escape(atob(encodedData)));
  return fromJS(JSON.parse(jsonFormString));
}