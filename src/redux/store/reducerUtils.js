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

export function indexOfFormElementFunctionByForms(forms, formId, elementId) {
  /* NOTE: Try this https://stackoverflow.com/a/40627682/6805866 out or
      this one: https://cutt.ly/5v7kJnB */
  const formIndex = getFormIndexByForms(forms, formId);

  const finalRes = forms
    .getIn([formIndex, "formElements"])
    .findIndex((im_formElement) => im_formElement.get("id") === elementId);
  return finalRes;
}