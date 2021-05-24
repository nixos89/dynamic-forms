import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FormListComponent from "../components/FormListComponent";
import Modal from "react-modal";
import CreateFormModalComponent from "../components/modals/CreateFormModalComponent";
import * as ImmutablePropTypes from "react-immutable-proptypes";

Modal.setAppElement("#root");

const MainContent = (props) => {
  const {message, forms} = props;

  return (
    <div className="justify-content-center">
      <main id="main" role="main" className="flex-shrink-0">
        <div id="container" className="container h-100">
          <hr/>
          <div className="form-row justify-content-center">
            <CreateFormModalComponent message={message}/>
          </div>
          <hr/>
          <FormListComponent forms={forms}/>
          <br/>
        </div>
      </main>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const {mainReducer} = state;
  console.log("mainReducer:", mainReducer);
  console.log("ownProps:", ownProps);
  return {
    message: mainReducer.get("message"),
    forms: mainReducer.get("forms")
  };
}

MainContent.propTypes = {
  message: PropTypes.string,
  forms: ImmutablePropTypes.list.isRequired,
};

export default connect(mapStateToProps)(MainContent);
