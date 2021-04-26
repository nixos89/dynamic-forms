import React, { useState } from "react";
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

/* TODO: Step1A - Extract react-modal from MainContent.js into this
    file and make it work! Take a look on these links:
    1) https://www.pluralsight.com/guides/passing-state-of-parent-to-child-component-as-props
    2) https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
    3) https://stackoverflow.com/a/35641680/6805866 */
const CreateFormModalComponent = (props) => {
  const {message, modalIsOpen} = props;

  let subtitle = "Subtitle const";
  let messageForNewFieldForms =
    "Newly created form fields will be placed HERE!";


  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    // TODO: Step1B- Solve this problem with passing HOOKs from Parent to Child Component!
    // setIsOpen(false);
  };

  return (
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
      {/* TODO: Step3 - Place here NEWLY CREATED form fields */}
    </Modal>
  );
};

function mapStateToProps(state) {}

function mapDispatchToProps(dispatch) {
  return {};
}

export default CreateFormModalComponent;
