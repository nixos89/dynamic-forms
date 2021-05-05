import React from "react";

const AddedFieldComponent = (props) => {

  return (
    <React.Fragment>
      <div className="input-group mb-2 mr-sm-2">
        <input placeholder="Etikettnavn..."
               id="labelField"
               name="labelField"
        />
      </div>
      <div className="input-group mb-2 mr-sm-2">
        <select id="formElementTypeField"
                name="formElementTypeField"
                className="custom-select"
        >
          <option value="ADD_TEXT_INPUT_FIELD">Tekstfelt</option>
          <option value="ADD_TEXTAREA_INPUT_FIELD">Tekstområdet</option>
        </select>
      </div>
    </React.Fragment>

  );
}

export default AddedFieldComponent;