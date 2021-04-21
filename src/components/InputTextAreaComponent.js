import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "../redux/actions/actions";

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
            props.onEditCurrentTextAreaField(event.target.value, id)
          }
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: Step1 - fix this method to work properly with Immutable.js data!
    onEditCurrentTextAreaField(inputTextAreaFieldValue, id) {
      dispatch(actions.editCurrentTextAreaField(inputTextAreaFieldValue, id));
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextAreaComponent);
