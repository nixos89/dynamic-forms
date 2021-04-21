import { fromJS } from "immutable";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
} from "../actions/actionTypes";

const im_initialState = fromJS({
  message: "Vær så snill opprett skjemaer",
  // use List and Map from Immutable.js library
  newFormName: "",
  showModal: false,
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
});

export default im_initialState;
