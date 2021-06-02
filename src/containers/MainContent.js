import React from "react";
import {connect} from "react-redux";
import FormListComponent from "../components/FormListComponent";
import Modal from "react-modal";
import CreateFormModalComponent from "../components/modals/CreateFormModalComponent";

Modal.setAppElement("#root");

const MainContent = (props) => {
  const {message, im_forms} = props;

  return (
    <div className="justify-content-center">
      <main id="main" role="main" className="flex-shrink-0">
        <div id="container" className="container h-100">
          <hr/>
          <div className="form-row justify-content-center">
            <CreateFormModalComponent message={message}/>
          </div>
          <hr/>
          <FormListComponent im_forms={im_forms}/>
          <br/>
        </div>
      </main>
    </div>
  );
};

function mapStateToProps(state) {
  const {mainReducer} = state;
  return {
    message: mainReducer.get("message"),
    im_forms: mainReducer.get("forms")
  };
}

export default connect(mapStateToProps)(MainContent);
