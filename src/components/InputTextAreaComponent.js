import React from "react";
import {connect} from "react-redux";
import { editCurrentTextAreaField } from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  const {id, value, formId, label, formElementTypeTAIF} = props;

  return (
    <React.Fragment>
      <div className="form-group row">
        <label htmlFor={id} className="col-sm-3 col-form-label">
          {label}
        </label>
        <div className="col-sm-9">
          <textarea
            type="textarea"
            className="form-control"
            // id={id}
            // formId={formId}
            rows={3}
            cols={30}
            value={value}
            onChange={(event) =>
              props.onEditCurrentTextAreaField(id, formId, formElementTypeTAIF, event.target.value)
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditCurrentTextAreaField(id, formId, formElementTypeTAIF, inputTextAreaFieldValue) {
      dispatch(editCurrentTextAreaField(id, formId, formElementTypeTAIF, inputTextAreaFieldValue));
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTextAreaComponent);
