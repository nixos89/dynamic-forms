import React, { useState } from "react";
import { connect } from "react-redux";
import { editCurrentTextAreaField } from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  const { id, value, label } = props;

  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-3 col-form-label">
        {label}
      </label>
      <div className="col-sm-9">
        <textarea
          type="textarea"
          className="form-control"
          id={id}
          rows={3}
          cols={30}
          value={value}
          onChange={(event) =>
            props.onEditCurrentTextAreaField(id, event.target.value)
          }
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: Step2 - fix this method to work properly with Immutable.js data!
    onEditCurrentTextAreaField(id, inputTextAreaFieldValue) {
      dispatch(editCurrentTextAreaField(id, inputTextAreaFieldValue));
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextAreaComponent);
