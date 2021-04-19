import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
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
      id: 1,
      formName: "Medarbeidere navn",
      formElements: [
        {
          id: 1,
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "Navn",
          value: "Nikola",
        },
        {
          id: 2,
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "Etternavn",
          value: "Stevanovic",
        },
        {
          id: 3,
          formElementType: ADD_TEXTAREA_INPUT_FIELD,
          label: "Info",
          value: "Jeg heter Nikola. Hva heter du? ",
        },
      ],
    },
  ],
};

export default initialState;
