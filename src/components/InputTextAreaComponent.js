import React from "react";
import {connect} from "react-redux";
import {editCurrentTextAreaField} from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  const {key, id, value, formId, label, formElementTypeTAIF} = props;
  // console.log("reduxState:", props.reduxState);
  return (
    <React.Fragment>
      <div className="form-group row" key={key}>
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
              props.onEditCurrentTextAreaField(key, id, formId, formElementTypeTAIF,
                event.target.value)
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  const {mainReducer} = state;
  return {
    reduxState: mainReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditCurrentTextAreaField(key, id, formId, formElementTypeTAIF, inputTextAreaFieldValue) {
      dispatch(editCurrentTextAreaField(key, id, formId, formElementTypeTAIF,
        inputTextAreaFieldValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTextAreaComponent);
