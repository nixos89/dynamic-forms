import React, { useState } from "react";

const InputTextComponent = (props) => {
  const [elems, setElems] = useState(props.form);

  return (
    <React.Fragment>
      {/*<label>{this.props.label}</label>*/}
      <label>{this.props.label}</label>
      <input type="text" name={props.value} />
    </React.Fragment>
  );
};

export default InputTextComponent;
