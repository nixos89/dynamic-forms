import React from "react";
import {editCurrentInputField,} from "../redux/actions/actions";
import {useDispatch} from "react-redux";

const InputTextComponent = (props) => {
  const dispatch = useDispatch();
  const {
    id: im_id,
    formId: im_formId,
    value: im_value,
    label: im_label
  } = props;

  return (
    <div className="form-group row">
      <label className="col-md-3 col-form-label" htmlFor={im_id}>
        {im_label}
      </label>
      <div className="col-md-9">
        <input
          type="text"
          className="form-control"
          value={im_value}
          onChange={(event) => dispatch(
            editCurrentInputField(im_id, im_formId, event.target.value)
          )}
        />
      </div>
    </div>
  );
};

export default InputTextComponent;
