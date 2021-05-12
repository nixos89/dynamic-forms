import React from "react";

const AddedFieldComponent = (props) => {

  // console.log("props:", props);
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
          <option value="ADD_TEXT_INPUT_FIELD">Tekstfelt</option>
          <option value="ADD_TEXTAREA_INPUT_FIELD">Tekstområdet</option>
        </select>
      </div>
    </React.Fragment>

  );
}

export default AddedFieldComponent;