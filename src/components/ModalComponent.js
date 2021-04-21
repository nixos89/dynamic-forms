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

const ModalComponent = (props) => {
  const { message, openModal } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle = "Subtitle const";

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
  );
};

export default ModalComponent;
