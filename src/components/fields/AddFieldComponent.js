import React from "react";
import {connect} from "react-redux";
import {addNewFieldToForm} from "../../redux/actions/actions";
import {ADD_TEXT_INPUT_FIELD} from "../../redux/actions/actionTypes";


const AddFieldComponent = (props) => {

  const {label, value, formElementType} = props;

  return (
    <React.Fragment>
      <label>{label}</label>
      <input type={formElementType === ADD_TEXT_INPUT_FIELD ? "text" : "textarea"}
             value={value}/>
    </React.Fragment>
  );

}

function mapDispatchToProps(dispatch) {
  return {
    onAddNewFieldToForm(label, value, formElementType) {
      dispatch(addNewFieldToForm(label, value, formElementType))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddFieldComponent);