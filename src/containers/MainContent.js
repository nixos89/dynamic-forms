import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../redux/store";
import PropTypes from "prop-types";
import FormListComponent from "../components/FormListComponent";
import InputTextComponent from "../components/InputTextComponent";

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
    this.props.onAddNewForm({
      formName: this.props.newForm.formName,
      formElements: [],
    });
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
              placeholder="Please enter Type of FormComponent"
            />
            &nbsp;
            <button className="btn btn-primary">Submit</button>
            {/*&nbsp;*/}
            <button className="btn btn-danger">Reset</button>
          </form>
        </div>
        <FormListComponent forms={this.props.forms} />
        <br />
        {/*TODO: fix passed 'props' to InputTextComponent */}
        <InputTextComponent
          label={this.props.forms.formElements.label}
          name={this.props.forms.formElements.value}
        />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
    forms: state.forms,
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

/** Read this https://reactjs.org/docs/typechecking-with-proptypes.html */
MainContent.propTypes = {
  formType: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
