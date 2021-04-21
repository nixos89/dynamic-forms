import React, { useState } from "react";
import { actions } from "../redux/actions/actions";
import { connect } from "react-redux";

const InputTextComponent = (props) => {
  const { value, label, id } = props;

  return (
    <React.Fragment>
      <label>{label}</label>
      <input type="text" value={value} onChange={(f) => f} />
      <br />
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditCurrentTextField(inputTextAreaFieldValue, id) {
      dispatch(actions.editCurrentTextField(inputTextAreaFieldValue, id));
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextComponent);
