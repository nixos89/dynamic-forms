import React, {useState} from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewForm, clearCurrentForm, newFormChanged} from "../../redux/actions/actions";
import PropTypes from "prop-types";
import {List} from "immutable";

/* TODO: Step1A - Extract react-modal from MainContent.js into this
    file and make it work! Take a look on these links:
    1) https://www.pluralsight.com/guides/passing-state-of-parent-to-child-component-as-props
    2) https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
    3) https://stackoverflow.com/a/35641680/6805866 */
const CreateFormModalComponent = (props) => {
  const {message, newFormChanged} = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle = "Subtitle const";
  let messageForNewFieldForms = "Newly created form fields will be placed HERE!";

  /* NOTE: Use Memoization to FIX declared functions inside of CreateFormModalComponent */
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

  const formSubmitted = (e) => {
    e.preventDefault();
    console.log("========== User has submitted values! ==========");
    addNewForm({
      message: message,
      formElements: List([]),
    });
  };

  return (
    <React.Fragment>
      <button className="btn btn-success" onClick={() => openModal()}>
        Nytt Skjema
      </button>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal}
             onRequestClose={closeModal} message={props.message}
             style={customStyles} contentLabel="Example Modal">
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="modal-header">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-row align-items-center">
              <div className="form-group">
                <div className="col-auto">
                  <input type="text"
                         onChange={(event) => newFormChanged(event.target.value)}
                         value={props.newFormName} id="formName" placeholder="Skjemaer navn"
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary">Sende in</button>

                  <button className="btn btn-danger" onClick={() => clearCurrentForm}>
                    Nullstille
                  </button>
                </div>
              </div>
              <br/>
              <br/>
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
          <p style={{color: "red", fontWeight: "bold"}}>
            {messageForNewFieldForms}
          </p>
        </div>
        {/* TODO: Step3 - Place here NEWLY CREATED form fields */}
      </Modal>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  const {addingReducer} = state;
  return {
    newFormName: addingReducer.get("newFormName"),
    clearCurrentForm: addingReducer.get("")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newFormChanged: newFormChanged,
      addNewForm: addNewForm,
      onClearCurrentForm: clearCurrentForm,
    },
    dispatch
  );
}

CreateFormModalComponent.propTypes = {
  newFormName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFormModalComponent);
