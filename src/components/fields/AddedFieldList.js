import React from "react";
import AddedFieldComponent from "./AddedFieldComponent";

const AddedFieldList = (props) => {
  const {newFormElements, onDeleteFieldClick} = props;

  return (
    (newFormElements.length === 0) ?
      <p><b>Ingen elementer</b> er lagt til ennå!</p>
      :
      <ul>
        {newFormElements.map((formElement, index) => {
          return (
            <div className="form-inline" key={index}>
              <div className="input-group mb-2 mr-sm-2">
                <AddedFieldComponent
                  key={index}
                  id={formElement.id}
                  label={formElement.label}
                  formElementType={formElement.formElementType}
                />
              </div>

              <div className="input-group mb-2 mr-sm-2">
                <button onClick={(event) => onDeleteFieldClick(event, index)}
                        className="btn btn-danger">x
                </button>
              </div>
            </div>
          );
        })}
      </ul>
  );
}


export default AddedFieldList;