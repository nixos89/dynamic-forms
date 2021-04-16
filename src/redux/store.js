// constant "actions"
import { List, Map } from "immutable";
const ADD_NEW_FORM_CHANGED = "ADD_NEW_FORM_CHANGED";
const ADD_NEW_FORM = "ADD_NEW_FORM";
const ADD_TEXT_INPUT_FIELD = "ADD_TEXT_INPUT_FIELD";
const ADD_TEXTAREA_INPUT_FIELD = "ADD_TEXTAREA_INPUT_FIELD";
// const ADD_NUMBER_INPUT_FIELD = "ADD_NUMBER_INPUT_FIELD";
// const SHOW_FORM_MODAL = "SHOW_FORM_MODAL";
// const HIDE_FORM_MODAL = "HIDE_FORM_MODAL";
// const FILL_FORM = "FILL_FORM";
// const EDIT_FORM = "EDIT_FORM";
// const DELETE_FORM = "DELETE_FORM";

// field types
// const INPUT_TYPE_TEXT = "INPUT_TYPE_TEXT";
// const INPUT_TYPE_NUMBER = "INPUT_TYPE_NUMBER";

/** Add rest like from https://www.youtube.com/watch?v=_l8z3TTlQQo */
export const actions = {
  newFormChanged(newForm) {
    return {
      type: ADD_NEW_FORM_CHANGED,
      newForm,
    };
  },
  addNewForm(newForm) {
    return {
      type: ADD_NEW_FORM,
      newForm,
    };
  },
};

/** TODO: review initialState for complex data maybe take a look here:
 *  https://stackoverflow.com/q/37980109/6805866 */
const initialState = {
  message: "Var så snill opprett skjemaer",
  // use List and Map from Immutable.js library
  forms: [
    {
      //form-object-0
      formName: "Medarbeidere navn",
      formElements: [
        {
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "Navn",
          value: "Nikola",
        },
        {
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "Etternavn",
          value: "Stevanovic",
        },
        {
          formElementType: ADD_TEXTAREA_INPUT_FIELD,
          label: "Info",
          value: "Jeg heter Nikola. Hva heter du? ",
        },
      ],
    },
  ],
}; //END::initialState

/** TODO: Finish implementing actions */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      return {
        ...state,
        formName: action.newForm,
      };
    }
    case ADD_NEW_FORM: {
      return {
        // returns (shallow) copy of state (do NOT modify EXISTING 1, but return NEW 1)
        ...state,
        forms: [...state.forms, action.newForm],
      };
    }
    default:
      return state;
  }
} //END::reducer
