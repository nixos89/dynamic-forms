import React, { useState } from "react";
import { store } from "../redux/store";
import { Map } from "immutable";
import FormComponent from "./FormComponent";

function FormListComponent(props) {
  const [formItems, setFormItem] = useState(props.forms);
  const mappedFormItems = Map(formItems);

  /** TODO: use PropTypes for checking types of FormComponent fields */
  // useEffect((e) => {
  //   e.target.type === "INPUT_TEXT_FIELD" ?
  // },[formItem]);

  return (
    <React.Fragment>
      {mappedFormItems.forEach((item) => (
        <FormComponent> </FormComponent>
      ))}
    </React.Fragment>
  );
}

export default FormListComponent;
