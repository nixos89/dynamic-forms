import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewForm} from "../../redux/actions/actions";
import AddedFieldList from "../fields/AddedFieldList";
import {fromJS} from "immutable";
import PropTypes from "prop-types";

class CreateFormModalComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      newFormElements: [],
      formName: "",
      modalIsOpen: false,
    };
    this.addFieldFunction = this.addFieldFunction.bind(this);
    this.deleteAddedField = this.deleteAddedField.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  setIsOpen(value) {
    this.setState({
      modalIsOpen: value
    })
  }

  addFieldFunction(event) {
    event.preventDefault();
    this.state.newFormElements.push({
      id: Math.floor(Math.random() * 100) + 100,
      label: "",
      formElementType: ""
    });
    this.setState({newFormElements: this.state.newFormElements});
  }


  deleteAddedField(event, index) {
    event.preventDefault();
    this.state.newFormElements.splice(index, 1)
    this.setState({
      newFormElements: this.state.newFormElements
    });
  }

  formSubmitted = (event) => {
    event.preventDefault();
    const newFormName = document.getElementById("formNameField").value;
    const labelFieldsByNameValues = Array.from(
      document
        .getElementsByName("labelField")
        .values());
    const selectFieldsByNameValues = Array.from(
      document
        .getElementsByName("formElementTypeField")
        .values());

    const updatedNewFormElements = this.state.newFormElements;
    for (let i = 0; i < labelFieldsByNameValues.length; i++) {
      updatedNewFormElements[i].label = labelFieldsByNameValues[i].value;
      updatedNewFormElements[i].formElementType = selectFieldsByNameValues[i].value;
      updatedNewFormElements[i].value = "";
    }

    let id = Math.floor(Math.random() * 100) + 100;
    const formElements = fromJS(updatedNewFormElements);
    this.props.onAddNewForm(id, newFormName, formElements);

    this.setState({
      formName: "",
      newFormElements: [],
      modalIsOpen: false
    });
  };

  openModal = () => {
    this.setIsOpen(true);
  };

  // afterOpenModal() {};

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  };

  render() {
    return (
      <div>
        <div className="form-inline">
          <div className="form-group mb-2">
            <button className="btn btn-success" onClick={() => this.openModal()}>
              <span role="img" aria-label="plus-sign">➕</span> Nytt Skjema
            </button>
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <p style={{fontStyle: "italic"}}>Vær så snill klikk "Nytt Skjema" for å opprett skjemaer</p>
          </div>
        </div>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
               message={this.message} style={customStyles} contentLabel="Example Modal">
          <button type="button" className="close" aria-label="Close"
                  onClick={() => this.closeModal()}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-header">
            <h2>
              {this.state.message}
            </h2>
          </div>
          <div className="modal-body">
            <form onSubmit={this.formSubmitted} id="formNameElement">
              <div className="form-inline">
                <div className="form-group mb-2">
                  <input type="text" id="formNameField" placeholder="Skjemaer navn..."/>
                  &nbsp;
                  <input type="submit" value="Sende in" className="btn btn-success"/>
                  &nbsp;
                  <input type="reset" value="Nullstille" className="btn btn-outline-warning"/>
                  &nbsp;
                  <input type="button" value="Nytt felt" className="btn btn-primary"
                         onClick={this.addFieldFunction}/>
                </div>
              </div>
              <AddedFieldList newFormElements={this.state.newFormElements}
                              onDeleteField={this.deleteAddedField}
              />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onAddNewForm: addNewForm,
    },
    dispatch
  );
}

CreateFormModalComponent.propTypes = {
  addNewForm: PropTypes.func,
  setIsOpen: PropTypes.func,
  addFieldFunction: PropTypes.func,
  deleteAddedField: PropTypes.func,
  formSubmitted: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
}

export default connect(null, mapDispatchToProps)(CreateFormModalComponent);
