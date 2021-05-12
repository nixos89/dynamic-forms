import React from "react";
import {useDispatch} from "react-redux";
import {editCurrentTextAreaField} from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  const dispatch = useDispatch();
  const {id, value, formId, label, formElementTypeTAIF} = props;

  return (
    <React.Fragment>
      <div className="form-group row" >
        <label htmlFor={id} className="col-sm-3 col-form-label">
          {label}
        </label>
        <div className="col-sm-9">
          <textarea
            type="textarea"
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
    </React.Fragment>
  );
};

export default InputTextAreaComponent;
