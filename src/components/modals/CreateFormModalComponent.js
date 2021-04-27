import React, {useState} from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewFieldToForm, addNewForm, clearCurrentForm, newFormChanged} from "../../redux/actions/actions";
import PropTypes from "prop-types";
import {List} from "immutable";
import AddFieldComponent from "../fields/AddFieldComponent";

/* Links with ideas:
    1) https://www.pluralsight.com/guides/passing-state-of-parent-to-child-component-as-props
    2) https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
    3) https://stackoverflow.com/a/35641680/6805866
*/
const CreateFormModalComponent = (props) => {
  const {message, newFormChanged, addNewField, newFormName} = props;
  const [modalIsOpen, setIsOpen] = useState(false);

  let subtitle = "Subtitle const";
  let im_newFormElements = [];

  // TODO: Step1C - Use this method for adding Field into Modal Footer section
  const addFieldFunction = () => {
    im_newFormElements.set({
      id: (Math.random() + 100),
      formElementType: "",
      label: "",
      value: ""
    });
  }

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
            <div className="form-inline">
              <div className="form-group mb-2">
                <input type="text"
                       onChange={(event) => newFormChanged(event.target.value)}
                       id="formName" placeholder="Skjemaer navn"
                />

                <button className="btn btn-primary">Sende in</button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => clearCurrentForm}>
                  Nullstille
                </button>
              </div>
              <div className="form-group mb-2">
                {/* TODO: Step1B - Implement action for ADDING NEW Input Text(Area) field! */}
                <button className="btn btn-success" onClick={() => addNewField()}>Nytt felt</button>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <div className="form-inline">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Felt navn"
              />
            </div>
            <div className="form-group mb-2">
              <select id="selectInputType" className="custom-select">
                <option value="textField">Tekstfelt</option>
                <option value="textAreaField">Tekstområdet</option>
              </select>
            </div>
          </div>
        </div>
        {/* TODO: Step1D - Place here NEWLY CREATED form fields */}
        <ul>

          {/*<AddFieldComponent label={}/>*/}
        </ul>

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

// TODO: Step1A - Use 'onAddNewFieldToForm' function for adding new Field into Modal-Footer area!
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newFormChanged: newFormChanged,
      onAddNewFieldToForm: addNewFieldToForm,
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
