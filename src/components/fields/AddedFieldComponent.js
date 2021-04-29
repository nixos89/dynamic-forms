import React from "react";
import {connect} from "react-redux";
import {addNewFieldToForm} from "../../redux/actions/actions";
import {ADD_TEXT_INPUT_FIELD} from "../../redux/actions/actionTypes";


const AddedFieldComponent = (props) => {

  const {label, formElementType} = props;

  // TODO: Step2 - use Bootstrap CSS classes to nicely align elements!
  return (
    <React.Fragment>
      <input placeholder="Some value"/>
      <select id="formElementType" className="custom-select">
        <option value="text" defaultValue={formElementType === ADD_TEXT_INPUT_FIELD}>
          Tekstfelt
        </option>
        <option value="textarea">Tekstområdet</option>
      </select>
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