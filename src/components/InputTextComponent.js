import React from "react";
import {editCurrentTextField} from "../redux/actions/actions";
import {useDispatch} from "react-redux";

const InputTextComponent = (props) => {
  const dispatch = useDispatch();
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
            className="form-control"
            value={value}
            onChange={(event) => dispatch(
              editCurrentTextField(
                id,
                formId,
                formElementTypeTIF,
                event.target.value
              ))
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputTextComponent;
