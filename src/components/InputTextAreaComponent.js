import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  const { id, value, label } = props;

  return (
    <React.Fragment>
      <label>{label}</label>
      <textarea
        type="textarea"
        rows={4}
        cols={30}
        value={value}
        onChange={(event) =>
          props.onEditCurrentTextAreaField(event.target.value, id)
        }
      />
      <br />
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: Step3 - fix this method to work properly with Immutable.js data!
    onEditCurrentTextAreaField(inputTextAreaFieldValue, id) {
      dispatch(actions.editCurrentTextAreaField(inputTextAreaFieldValue, id));
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextAreaComponent);
