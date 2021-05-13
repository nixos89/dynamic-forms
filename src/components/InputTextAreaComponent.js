import React from "react";
import {useDispatch} from "react-redux";
import {editCurrentTextAreaField} from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  const dispatch = useDispatch();
  const {id, value, formId, label, formElementTypeTAIF} = props;

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
            onChange={(event) =>
              dispatch(editCurrentTextAreaField(id, formId, formElementTypeTAIF,
                event.target.value))
            }
          />
      </div>
    </div>
  );
};

export default InputTextAreaComponent;
