import React from "react";
import { connect } from "react-redux";
import { actions } from "../redux/actions/actions";

const InputTextAreaComponent = (props) => {
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <textarea
        type="textarea"
        rows={4}
        cols={30}
        value={props.value}
        onChange={(event, id) =>
          props.onChangeInputTextArea(event.target.value, props.id)
        }
      />
      <br />
    </React.Fragment>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     value: state.value,
//     label: state.label
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeInputTextArea(inputTextAreaFieldValue, id) {
      dispatch(actions.addTextAreaInputField(inputTextAreaFieldValue, id));
    },
  };
};

export default connect(mapDispatchToProps)(InputTextAreaComponent);
