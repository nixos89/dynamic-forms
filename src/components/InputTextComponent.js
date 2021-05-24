import React from "react";
import {editCurrentInputField,} from "../redux/actions/actions";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

const InputTextComponent = (props) => {
  const dispatch = useDispatch();
  const {id, formId, value, label} = props;

  return (
    <div className="form-group row">
        <label className="col-md-3 col-form-label" htmlFor={id}>
          {label}
        </label>
      <div className="col-md-9">
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(event) => dispatch(
            editCurrentInputField(id, formId, event.target.value)
          )}
        />
      </div>
    </div>
  );
};

InputTextComponent.propTypes = {
  id: PropTypes.number,
  formId: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string,
  editCurrentInputField: PropTypes.func
}

export default InputTextComponent;
