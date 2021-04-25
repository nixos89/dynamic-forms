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

/* TODO: Step1a - Extract react-modal from MainContent.js into this
    file and make it work! */
const CreateFormModalComponent = (props) => {
  const { message, openModal } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle = "Subtitle const";
  let messageForNewFieldForms =
    "Newly created form fields will be placed HERE!";

  const onOpenModal = () => {
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
      {/* TODO: Step4 - Place here NEWLY CREATED form fields */}
    </Modal>
  );
};

function mapStateToProps(state) {}

function mapDispatchToProps(dispatch) {
  return {};
}

export default CreateFormModalComponent;
