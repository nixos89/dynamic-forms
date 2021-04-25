import React from "react";
import {editCurrentTextField} from "../redux/actions/actions";
import { connect } from "react-redux";

const InputTextComponent = (props) => {
  const {id, formId, value, label, formElementTypeTIF} = props;

  return (
    <React.Fragment>
      <div className="form-group row">
        <label htmlFor={id} className="col-sm-3 col-form-label">
          {label}
        </label>{" "}
        <div className="col-sm-9">
          <input
            type="text"
            // id={id}
            // formid={formId}
            className="form-control"
            value={value}
            onChange={(event) =>
              props.onEditCurrentTextField(
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
    onEditCurrentTextField(id, formId, formElementTypeTIF, inputTextFieldValue) {
      dispatch(
        editCurrentTextField(id, formId, formElementTypeTIF, inputTextFieldValue)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextComponent);
