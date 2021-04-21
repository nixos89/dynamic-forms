import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";
import PropTypes from "prop-types";
import { actions } from "../redux/actions/actions";
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

const MainContent = (props) => {
  const {
    message,
    modalTitle,
    addNewForm,
    newFormChanged,
    clearCurrentForm,
    forms,
  } = props;

  let subtitle = "Subtitle const";
  /* TODO: Check should you use 'useSelector' method instead of 'useState'. More at:
   *   https://react-redux.js.org/api/hooks#useselector*/
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("==== openModal has been invoked! ====");
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // saving changes for NEWLY CREATED form!
  // const [saveChanges, setSaveChanges] = useState(List[{}]);

  // NOTE: Use Memoization to FIX 'formSubmitted' and 'resetForm' functions!
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
      {Modal.setAppElement("#root")}
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
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        <button onClick={closeModal}>close</button>
        <div>
          <h2>Second h2</h2>
        </div>
        <form>
          <input />
          <select id="selectInputType">
            <option value="textField">Text Field</option>
            <option value="textAreaField">Textarea Field</option>
          </select>
          <button className="btn btn-primary">Tab navigation</button>
        </form>
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
          <button className="btn btn-danger" onClick={() => resetForm}>
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
    newFormName: editingReducer.get("newFormName"),
    forms: editingReducer.get("forms"),
    modalTitle: "Nytt Skjema - modalTitle",
    show: addingReducer.get("showModal"),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newFormChanged: actions.newFormChanged,
      addNewForm: actions.addNewForm,
      clearCurrentForm: actions.clearCurrentForm,
    },
    dispatch
  );
}

/** TODO: Read and implement properly by following article:
 * https://reactjs.org/docs/typechecking-with-proptypes.html */
MainContent.propTypes = {
  message: PropTypes.string,
  newFormName: PropTypes.string,
  show: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
