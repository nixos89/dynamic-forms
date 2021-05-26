import React from "react";
import {useDispatch} from "react-redux";
import {editCurrentInputField} from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
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
          <textarea
            className="form-control"
            rows={3}
            cols={30}
            value={im_value}
            onChange={(event) => dispatch(
              editCurrentInputField(im_id, im_formId, event.target.value)
            )}
          />
      </div>
    </div>
  );
};

export default InputTextAreaComponent;
