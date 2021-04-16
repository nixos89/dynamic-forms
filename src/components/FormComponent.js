import React, { useState } from "react";

function FormComponent(props) {
  // TODO: try using Hooks HERE (i.e. in one of SUB-Components)!!!
  const [propsValues, setPropsValues] = useState(props);

  return (
    <React.Fragment>
      <label>Input type</label>
      <input type="text" name="textField" />
    </React.Fragment>
  );
}

export default FormComponent;
