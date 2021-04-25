import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";
import PropTypes from "prop-types";
import {
  newFormChanged,
  addNewForm,
  clearCurrentForm,
} from "../redux/actions/actions";
import FormListComponent from "../components/FormListComponent";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

/* TODO: Step1b - IMPORTANT: Must be set in order for react-modal.Modal to work!
    BTW, if necessary move it into CreateFormModalComponent.js file */
Modal.setAppElement("#root");

const MainContent = (props) => {
  const {
    message,
    addNewForm,
    newFormChanged,
    clearCurrentForm,
    forms,
  } = props;

  let subtitle = "Subtitle const";
  let messageForNewFieldForms =
    "Newly created form fields will be placed HERE!";
  /* Maybe 'useSelector': https://react-redux.js.org/api/hooks#useselector */
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("==== openModal has been invoked! ====");
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "blue";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // NOTE: Use Memoization to FIX 'formSubmitted' and 'resetForm'
  // functions!
  const formSubmitted = (e) => {
    e.preventDefault();
    console.log("========== User has submitted values! ==========");
    addNewForm({
      message: message,
      formElements: List([]),
    });
  };

  const resetForm = (e) => {
    e.preventDefault();
    clearCurrentForm({
      newFormName: "",
    });
  };

  return (
    <main id="main">
      <hr />
      <button className="btn btn-success" onClick={() => openModal()}>
        Nytt Skjema
      </button>
      {/* react-modal::START*/}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        message={message}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={closeModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="modal-header">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Felt navn"
                />
              </div>
              <div className="col-auto">
                <select id="selectInputType" className="custom-select">
                  <option value="textField">Text Field</option>
                  <option value="textAreaField">TextArea Field</option>
                </select>
              </div>
              <button className="btn btn-primary">Leg til felt</button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <p style={{ color: "red", fontWeight: "bold" }}>
            {messageForNewFieldForms}
          </p>
        </div>
        {/* TODO: Step4 - Place here NEWLY CREATED form fields */}
      </Modal>
      {/* react-modal::END*/}

      <div className="form-control">
        <form onSubmit={formSubmitted} id="dynamicForm">
          <input
            type="text"
            onChange={(event) => newFormChanged(event.target.value)}
            value={props.newFormName}
            id="formName"
            placeholder="Skjemaer navn"
          />
          &nbsp;
          <button className="btn btn-primary">Sende in</button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => resetForm()}>
            Nullstille
          </button>
          &nbsp;
        </form>
      </div>
      <hr />
      <h1>
        <b style={{ backgroundColor: "lightblue" }}>Eksisterende Skjemaer</b>
      </h1>
      <FormListComponent forms={forms} />
      <br />
    </main>
  );
}; //MainContent::END

function mapStateToProps(state) {
  const { addingReducer, editingReducer } = state;
  return {
    message: editingReducer.get("message"),
    newFormName: addingReducer.get("newFormName"),
    forms: editingReducer.get("forms"),
    show: addingReducer.get("showModal"),
    modalTitle: "Nytt Skjema - modalTitle",
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newFormChanged: newFormChanged,
      addNewForm: addNewForm,
      clearCurrentForm: clearCurrentForm,
    },
    dispatch
  );
}

// More at: https://reactjs.org/docs/typechecking-with-proptypes.html
MainContent.propTypes = {
  message: PropTypes.string,
  newFormName: PropTypes.string,
  show: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
