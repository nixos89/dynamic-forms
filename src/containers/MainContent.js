import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../redux/store";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
    };
    // this.formSubmitted = this.formSubmitted.bind(this);
  }

  formSubmitted = (e) => {
    e.preventDefault();
    console.log("User has submitted values");
  };

  render() {
    return (
      <main>
        <div className="form-control">
          <form onSubmit={this.formSubmitted}>
            <input
              type="text"
              onChange={(event) =>
                this.props.onNewFormChanged(event.target.value)
              }
              value={this.props.formType}
              placeholder="Please enter Type of Form"
            />
            &nbsp;
            <button className="btn btn-primary">Submit</button>
            &nbsp;
            <button className="btn btn-danger">Reset</button>
          </form>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
    formName: state.formName,
    formElements: state.formElements,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNewFormChanged(newForm) {
      dispatch(actions.newFormChanged(newForm));
    },
    onAddNewForm(newForm) {
      dispatch(actions.addNewForm(newForm));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
