import React, { useState } from "react";
import { actions } from "../redux/actions/actions";
import { connect } from "react-redux";

const InputTextComponent = (props) => {
  const { value, label, id } = props;

  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-3 col-form-label">
        {label}
      </label>{" "}
      <div className="col-sm-9">
        <input
          type="text"
          id={id}
          className="form-control"
          value={value}
          onChange={(f) => f}
        />
      </div>
    </div>
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
