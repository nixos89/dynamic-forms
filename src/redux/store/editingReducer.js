import {
  ADD_TEXTAREA_INPUT_FIELD,
  CLEAR_CURRENT_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";
import { fromJS } from "immutable";

function printToConsole(state, elementId, elementValue) {
  const fieldTypeId = 3;
  // TODO: Step1 - set 'inputTextAreaFieldValue' onto 'result' variable
  const inputTextAreaFieldValue =
    "Jeg heter Nikola. Hva heter du? Vaer så snill si dein navn.";
  // const result = state.getIn(["forms", 0, "formElements", fieldTypeId]);
  // console.log("++++ result:", result, " ++++");
  console.log("(in da printToConsole) state:", state);
  console.log("(in da printToConsole) elementId-1 =", elementId - 1);
  const newTextAreaValue = state
    .get("forms")
    .get(0)
    .get("formElements")
    .get(elementId - 1)
    .get("value");
  console.log("++++ res2:", newTextAreaValue, " ++++");
  const newState = state
    .get("forms")
    .mergeDeepIn([0, "formElements", elementId - 1, "value"], newTextAreaValue);
  console.log("/////// newState:", newState, " ///////");
  return newState;
}

export function editingReducer(state = im_initialState, action) {
  /* TODO: Refactor 'editingReducer' methods to be compatible to work with
      Immutable.js objects -> 'state.forms' needs to be iterable!!!
      1 Idea: access fields by passing IDs of each element (forms' ID,
      formElements' ID) so it know EXACTLY which field to change!!! */
  switch (action.type) {
    case EDIT_INPUT_TEXT_FIELD:
      return {
        ...state,
        forms: [...state.get("forms"), action.inputTextFieldValue, action.id],
      };
    case EDIT_INPUT_TEXTAREA_FIELD:
      /* TODO: Step2 - use payload to pass action params for better-easier
          readability and Immutable data manipulation! Try out this answer:
           https://stackoverflow.com/a/48756515/6805866*/
      const { id, inputTextAreaFieldValue } = action;

      console.log("(in da CASE) state:", state);

      const indexOfFormElement = state
        .getIn(["forms", 0, "formElements"])
        .indexOf((im_formElement) => im_formElement.get("id") === id);

      return state.setIn(
        ["forms", 0, "formElements", indexOfFormElement, "value"],
        inputTextAreaFieldValue
      );

    case CLEAR_CURRENT_FORM: {
      return {
        ...state,
        newFormName: "",
      };
    }
    default:
      return state;
  }
}
