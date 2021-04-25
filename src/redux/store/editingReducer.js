import {
  CLEAR_CURRENT_FORM,
  EDIT_INPUT_TEXT_FIELD,
  EDIT_INPUT_TEXTAREA_FIELD,
} from "../actions/actionTypes";
import im_initialState from "./initialState";

function indexOfFormElementFunction(state, formId, elementId) {
  console.log("(in da indexOfFormElementFunction): formId =", formId);
  console.log("(in da indexOfFormElementFunction): elementId =", elementId);
  console.log(
    "(in da indexOfFormElementFunction): state.getIn(['forms', formId, 'formElements']) =",
    state.getIn(["forms", formId, "formElements"])
  );
  return state
    .getIn(["forms", formId, "formElements"])
    .indexOf((im_formElement) => im_formElement.get("id") === elementId);
}

export function editingReducer(state = im_initialState, action) {
  /* TODO: IMPORTANT - Fix editing issues with folowwing action.typeS:
       EDIT_INPUT_TEXT_FIELD and EDIT_INPUT_TEXTAREA_FIELD */
  switch (action.type) {
    case EDIT_INPUT_TEXT_FIELD: {
      const {id, formId, inputTextFieldValue, formElementTypeTIF} = action.payload;
      console.log("======== in da case EDIT_INPUT_TEXT_FIELD::START =======");
      console.log("action.type:", action.type, "\nid:", id, "\nformId:", formId,
        "\ninputTextFieldValue:", inputTextFieldValue
      );
      console.log("state:", state);
      const realFormId = formId - 1;
      const indexOfFormEl = indexOfFormElementFunction(state, realFormId, id);

      console.log(
        'state.getIn(["forms", realFormId, "formElements",indexOfFormEl, "formElementType"], formElementType):',
        state.getIn(["forms", realFormId, "formElements", indexOfFormEl, "formElementType"],
          formElementTypeTIF));
      console.log("======== in da case EDIT_INPUT_TEXT_FIELD::END =======");

      return state.setIn(["forms", realFormId, "formElements", indexOfFormEl, "value"],
        inputTextFieldValue
      );
    }
    case EDIT_INPUT_TEXTAREA_FIELD: {
      const {id, formId, inputTextAreaFieldValue, formElementTypeTAIF} = action;
      const realFormId = formId - 1;

      const indexOfITAF = indexOfFormElementFunction(state, realFormId, id);
      console.log("======== in da case EDIT_INPUT_TEXTAREA_FIELD::START =======");
      console.log(
        'state.getIn(["forms", realFormId, "formElements",indexOfFormEl, "formElementType"], formElementType):',
        state.getIn(["forms", realFormId, "formElements", indexOfITAF, "formElementType"],
          formElementTypeTAIF));
      console.log("======== in da case EDIT_INPUT_TEXTAREA_FIELD::END =======");
      return state.setIn(
        ["forms", realFormId, "formElements", indexOfITAF, "value"],
        inputTextAreaFieldValue
      );
    }
    case CLEAR_CURRENT_FORM: {
      return {
        ...state,
        newFormName: "",
      };
    }
    default: {
      return state;
    }
  }
}
