import React /*, { useState }*/ from "react";
import InputTextComponent from "./InputTextComponent";

function FormComponent(/*props*/) {
  // TODO: try using Hooks HERE (i.e. in one of SUB-Components)!!!
  /* const [propsValues, setPropsValues] = useState(props);*/

  return (
    <React.Fragment>
      <label>Input type</label>
      <input type="text" name="textField" />
      {/*<InputTextComponent*/}
      {/*  label={this.props.forms.formElements.label}*/}
      {/*  name={this.props.forms.formElements.value}*/}
      {/*/>*/}
    </React.Fragment>
  );
}

export default FormComponent;
