import React from "react";
import {editCurrentTextField} from "../redux/actions/actions";
import { connect } from "react-redux";

const InputTextComponent = (props) => {
  const {key, id, formId, value, label, formElementTypeTIF, onEditCurrentTextField} = props;

  return (
    <React.Fragment>
      <div className="form-group row">
        <label htmlFor={id} className="col-sm-3 col-form-label">
          {label}
        </label>{" "}
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(event) =>
              onEditCurrentTextField(
                key,
                id,
                formId,
                formElementTypeTIF,
                event.target.value
              )
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditCurrentTextField(key, id, formId, formElementTypeTIF, inputTextFieldValue) {
      dispatch(
        editCurrentTextField(key, id, formId, formElementTypeTIF, inputTextFieldValue)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextComponent);
