import React from "react";

const AddedFieldComponent = (props) => {

  const labelId = `label${props.id}`;
  const formElementTypeFieldId = `formElementTypeField${props.id}`;

  return (
    <React.Fragment>
      <div className="input-group mb-2 mr-sm-2">
        <input placeholder="Etikettnavn..."
               id={labelId}
               name="labelField"
        />
      </div>
      <div className="input-group mb-2 mr-sm-2">
        <select id={formElementTypeFieldId}
                name="formElementTypeField"
                className="custom-select"
        >
          <option value="INPUT_TEXT_FIELD">Tekstfelt</option>
          <option value="INPUT_TEXTAREA_FIELD">Tekstområdet</option>
        </select>
      </div>
    </React.Fragment>

  );
}

export default AddedFieldComponent;