// constant "actions"
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

const initialState = {
  message: "",
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
}; //END::initialState

/** TODO: Finish implementing actions */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_FORM_CHANGED: {
      return {
        ...state,
        newForm: action.newForm,
      };
    }
    case ADD_NEW_FORM: {
      return {
        // returns (shallow) copy of state (do NOT modify EXISTING 1, but return NEW 1)
        ...state,
        addNewForm: action.newForm,
      };
    }
    default:
      return state;
  }
} //END::reducer
