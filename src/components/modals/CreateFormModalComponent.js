import React, {useState} from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewFieldToForm, addNewForm, clearCurrentForm, newFormChanged} from "../../redux/actions/actions";
import PropTypes from "prop-types";
import AddedFieldComponent from "../fields/AddedFieldComponent";
import {ADD_TEXT_INPUT_FIELD} from "../../redux/actions/actionTypes";
import {logger} from "redux-logger/src";

/* TODO: read this about managing state:
     https://www.digitalocean.com/community/tutorials/how-to-manage-state-on-react-class-components
     ...as well as this: https://stackoverflow.com/a/43571049/6805866 */
class CreateFormModalComponent extends React.Component {

  constructor(props) {
    super(props);
    // const {message, newFormChanged, onAddNewFieldToForm, newFormName} = this.props;
    this.state = {
      message: props.message,
      im_newFormElements: [],
      subtitle: "Subtitle const",
      modalIsOpen: false,
    };
  }

  setIsOpen(value) {
    this.setState({
      modalIsOpen: value
    })
  }

  // TODO: Step1C - Use this method for adding Field into Modal Footer section
  addFieldFunction(event) {
    event.preventDefault();
    this.setState((prevState) => {
      im_newFormElements: prevState.im_newFormElements.push({
        id: Math.floor(Math.random() * 100) + 100,
        label: "",
        formElementType: ADD_TEXT_INPUT_FIELD
      })
    });

    console.log("(in da addFieldFunction): im_newFormElements: ",
      this.state.im_newFormElements);
  }

  /* NOTE: Use Memoization to FIX declared functions inside of CreateFormModalComponent */
  openModal = () => {
    this.setIsOpen(true);
  };

  afterOpenModal() {
    console.log("afterOpenModal clicked!!!")
  };

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  };

  formSubmitted = (e) => {
    e.preventDefault();
    console.log("========== User has submitted values! ==========");
    addNewForm({
      message: this.state.message,
      formElements: [],
    });
  };

  render() {

    console.log("STATE", this.state);

    return (
      <div>
        <button className="btn btn-success" onClick={() => this.openModal()}>
          Nytt Skjema
        </button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={() => this.afterOpenModal()}
               onRequestClose={this.closeModal} message={this.message}
               style={customStyles} contentLabel="Example Modal">
          <button type="button" className="close" aria-label="Close"
                  onClick={() => this.closeModal()}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-header">
            <h2 ref={(_subtitle) => (this.state.subtitle = _subtitle)}>
              {this.state.message}
            </h2>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-inline">
                <div className="form-group mb-2">
                  <input type="text"
                         onChange={(event) => newFormChanged(event.target.value)}
                         id="formName" placeholder="Skjemaer navn"
                  />

                  <input type="submit" className="btn btn-primary" value="Sende in"/>
                  &nbsp;
                  <input type="reset" value="Nullstille" className="btn btn-danger"
                    // onClick={() => clearCurrentForm}
                  />
                </div>
                <div className="form-group mb-2">
                  {/* TODO: Step1B - Implement action for ADDING NEW Input Text(Area) field! */}
                  <input type="button" value="Nytt felt" className="btn btn-success"
                         onClick={this.addFieldFunction.bind(this)}/>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {
              this.state.im_newFormElements.length === 0 ? <p>No elements for new form yet!</p>
                :
                <ul>
                  {this.state.im_newFormElements.map((formElement, index) => {
                    return (<AddedFieldComponent/>);
                  })}
                </ul>
            }
          </div>
        </Modal>
      </div>
    );
  }
}; // CreateFormModalComponent::END

function mapStateToProps(state) {
  const {addingReducer} = state;
  return {
    newFormName: addingReducer.get("newFormName"),
    clearCurrentForm: addingReducer.get("")
  };
}

/* TODO: Step1A - Use 'onAddNewFieldToForm' function for adding new Field into
         Modal-Footer area! */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newFormChanged: newFormChanged,
      // "onAddNewFieldToForm" is necessary for creating new field in modal for NEW form!
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
