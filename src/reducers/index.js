import {
  ADD_NEW_FORM_CHANGED,
  ADD_NEW_FORM,
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
  // ADD_NUMBER_INPUT_FIELD,
  // SHOW_FORM_MODAL,
  // HIDE_FORM_MODAL,
  // FILL_FORM,
  // EDIT_FORM,
  // DELETE_FORM,
  CLEAR_CURRENT_FORM,
} from "../actions/actionTypes";

/** TODO: review initialState for complex data maybe take a look here:
 *  https://stackoverflow.com/q/37980109/6805866 */
const initialState = {
  message: "Var så snill opprett skjemaer",
  // use List and Map from Immutable.js library
  newFormName: "",
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
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      return {
        ...state,
        newFormName: action.newFormName,
      };
    }
    case ADD_NEW_FORM: {
      return {
        ...state,
        forms: [...state.forms, action.newForm],
      };
    }
    case ADD_TEXT_INPUT_FIELD: {
      return {
        ...state,
        forms: [...state.forms, action.inputTextField],
      };
    }
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
