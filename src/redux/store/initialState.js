import { fromJS } from "immutable";
import {
  ADD_TEXT_INPUT_FIELD,
  ADD_TEXTAREA_INPUT_FIELD,
} from "../actions/actionTypes";

const im_initialState = fromJS({
  appName: "Nikolas søknad om dynamiske skjemaer",
  message: "Vær så snill opprett skjemaer",
  showModal: false,
  forms: [
    {
      //form-object-0
      id: 555,
      formName: "Medarbeidere navn",
      formElements: [
        {
          id: 1,
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "Navn",
          placeholder: "",
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
          value: "Jeg heter Nikola. H va heter du? ",
        },
      ],
    },
    {
      //form-object-1
      id: 578,
      formName: "Ledernavn",
      formElements: [
        {
          id: 1,
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "CEO",
          value: "Marko Jevtovic",
        },
        {
          id: 2,
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "CTO",
          value: "Milos Ignjatovic",
        },
        {
          id: 3,
          formElementType: ADD_TEXT_INPUT_FIELD,
          label: "CFO",
          value: "Filip Gacevic",
        },
      ],
    },
  ],
});

export default im_initialState;
