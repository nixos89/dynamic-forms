import React from "react";


const AddedFieldComponent = (props) => {

  const {label, formElementType} = props;

  return (
    <React.Fragment>
      <div className="input-group mb-2 mr-sm-2">
        <input placeholder="Label name..."/>
      </div>
      <div className="input-group mb-2 mr-sm-2">
        <select id="formElementType" className="custom-select">
          <option value="text">
            Tekstfelt
          </option>
          <option value="textarea">Tekstområdet</option>
        </select>
      </div>
    </React.Fragment>
  );
}

// function mapDispatchToProps(dispatch) {
//   return {
//     onAddNewFieldToForm(label, value, formElementType) {
//       dispatch(addNewFieldToForm(label, value, formElementType))
//     }
//   }
// }

export default AddedFieldComponent;
// export default connect(null, mapDispatchToProps)(AddedFieldComponent);