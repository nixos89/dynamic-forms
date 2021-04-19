import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../redux/actions/actions";
import PropTypes from "prop-types";
import FormListComponent from "../components/FormListComponent";

class MainContent extends Component {

  formSubmitted = (e) => {
    e.preventDefault();
    console.log("========== User has submitted values! ==========");
    this.props.onAddNewForm({
      message: this.props.message,
      formElements: [],
    });
  };

  resetForm = (e) => {
    e.preventDefault();
    this.props.onClearCurrentForm({
      newFormName: ""
    });
  }

  render() {
    return (
      <main>
        <hr />
        <h2>{this.props.message}</h2>
        <div className="form-control">
          <form onSubmit={this.formSubmitted} id="dynamicForm">
            <input
              type="text"
              onChange={(event) =>
                this.props.onNewFormChanged(event.target.value)
              }
              value={this.props.newFormName}
              id="formName"
              placeholder="Skjemaer navn"
            />
            &nbsp;
            <button className="btn btn-primary">Sende in</button>
            &nbsp;
            <button className="btn btn-danger" onClick={this.resetForm}>
              Nullstille
            </button>
          </form>
        </div>
        <br />
        <FormListComponent forms={this.props.forms} />
        <br />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
    newFormName: state.newFormName,
    forms: state.forms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNewFormChanged(newFormName) {
      dispatch(actions.newFormChanged(newFormName));
    },
    onAddNewForm(newForm) {
      dispatch(actions.addNewForm(newForm));
    },
    onClearCurrentForm() {
      dispatch(actions.clearCurrentForm());
    },
  };
}

/** Read this https://reactjs.org/docs/typechecking-with-proptypes.html */
MainContent.propTypes = {
  formType: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
