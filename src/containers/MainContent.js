import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FormListComponent from "../components/FormListComponent";
import Modal from "react-modal";
import CreateFormModalComponent from "../components/modals/CreateFormModalComponent";

Modal.setAppElement("#root");

const MainContent = (props) => {
  const {message, forms} = props;

  // TODO: Step2 - Create hook for displaying message when NEW form has been CREATED/SAVED!!!

  return (
    <main id="main">
      <hr/>
      <CreateFormModalComponent message={message}/>
      <hr/>
      <h1>
        <b style={{backgroundColor: "lightblue"}}>Eksisterende Skjemaer</b>
      </h1>
      <FormListComponent forms={forms}/>
      <br/>
    </main>
  );
}; //MainContent::END

function mapStateToProps(state) {
  const {mainReducer} = state;
  return {
    message: mainReducer.get("message"),
    forms: mainReducer.get("forms"),
    show: mainReducer.get("showModal"),
  };
}

// More at: https://reactjs.org/docs/typechecking-with-proptypes.html
MainContent.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
};

export default connect(mapStateToProps)(MainContent);
