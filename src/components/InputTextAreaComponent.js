import React from "react";
import {useDispatch} from "react-redux";
import {editCurrentInputField} from "../redux/actions/actions";
import PropTypes from "prop-types";

const InputTextAreaComponent = (props) => {
  const dispatch = useDispatch();
  const {id, value, formId, label} = props;

  return (
    <div className="form-group row">
      <label className="col-md-3 col-form-label" htmlFor={id}>
        {label}
      </label>
      <div className="col-md-9">
          <textarea
            className="form-control"
            rows={3}
            cols={30}
            value={value}
            onChange={(event) => dispatch(
              editCurrentInputField(id, formId, event.target.value)
            )}
          />
      </div>
    </div>
  );
};

InputTextAreaComponent.propTypes = {
  id: PropTypes.number,
  formId: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string,
  editCurrentInputField: PropTypes.func
}

export default InputTextAreaComponent;
