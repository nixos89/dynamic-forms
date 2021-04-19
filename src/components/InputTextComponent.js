import React, { useState } from "react";

const InputTextComponent = (props) => {
  const [elements] = useState(props);

  return (
    <React.Fragment>
      <label>{elements.label}</label>
      <input type="text" value={elements.value} onChange={(f) => f} />
      <br />
    </React.Fragment>
  );
};

export default InputTextComponent;
