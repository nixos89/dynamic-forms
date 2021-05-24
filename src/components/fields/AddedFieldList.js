import React from "react";
import AddedFieldComponent from "./AddedFieldComponent";
import PropTypes from "prop-types";

const AddedFieldList = (props) => {
  const {newFormElements, onDeleteField} = props;

  return (
    (newFormElements.length === 0) ?
      <p><b>No elements</b> have been added yet!</p>
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
                <button onClick={(event) => onDeleteField(event, index)}
                        className="btn btn-danger">x
                </button>
              </div>
            </div>
          );
        })}
      </ul>
  );
}

AddedFieldList.propTypes = {
  newFormElements: PropTypes.array.isRequired,
  onDeleteField: PropTypes.func
}

export default AddedFieldList;