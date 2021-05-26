import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewForm} from "../../redux/actions/actions";
import AddedFieldList from "../fields/AddedFieldList";
import {fromJS} from "immutable";

class CreateFormModalComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newFormElements: [],
      formName: "",
      modalIsOpen: false,
    };
    this.handleOnAddNewFieldClick = this.handleOnAddNewFieldClick.bind(this);
    this.handleOnDeleteFieldClick = this.handleOnDeleteFieldClick.bind(this);
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this);
  }

  setIsOpen(value) {
    this.setState({
      modalIsOpen: value
    })
  }

  handleOnAddNewFieldClick(event) {
    event.preventDefault();
    this.state.newFormElements.push({
      id: Math.floor(Math.random() * 100) + 100,
      label: "",
      formElementType: ""
    });
    this.setState({newFormElements: this.state.newFormElements});
  }


  handleOnDeleteFieldClick(event, index) {
    event.preventDefault();
    this.state.newFormElements.splice(index, 1)
    this.setState({
      newFormElements: this.state.newFormElements
    });
  }

  handleOnFormSubmit = (event) => {
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
    this.props.addNewForm(id, newFormName, formElements);

    this.setState({
      formName: "",
      newFormElements: [],
      modalIsOpen: false
    });
  };

  // handleOnNewFormButtonClick
  handleOnNewFormButtonClick = () => {
    this.setIsOpen(true);
  };

  // handleOnModalCloseButtonClick
  handleOnModalCloseButtonClick() {
    this.setIsOpen(false);
  };

  render() {
    return (
      <div>
        <div className="form-inline">
          <div className="form-group mb-2">
            <button className="btn btn-success" onClick={() => this.handleOnNewFormButtonClick()}>
              <span role="img" aria-label="plus-sign">➕</span> Nytt Skjema
            </button>
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <p style={{fontStyle: "italic"}}>Vær så snill klikk "Nytt Skjema" for å opprett skjemaer</p>
          </div>
        </div>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleOnModalCloseButtonClick.bind(this)}
               message={this.message} style={customStyles} contentLabel="Example Modal">
          <button type="button" className="close" aria-label="Close"
                  onClick={() => this.handleOnModalCloseButtonClick()}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-header">
            <h2>
              {this.props.message}
            </h2>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handleOnFormSubmit} id="formNameElement">
              <div className="form-inline">
                <div className="form-group mb-2">
                  <input type="text" id="formNameField" placeholder="Skjemaer navn..."/>
                  &nbsp;
                  <input type="submit" value="Sende in" className="btn btn-success"/>
                  &nbsp;
                  <input type="reset" value="Nullstille" className="btn btn-outline-warning"/>
                  &nbsp;
                  <input type="button" value="Nytt felt" className="btn btn-primary"
                         onClick={this.handleOnAddNewFieldClick}/>
                </div>
              </div>
              <AddedFieldList newFormElements={this.state.newFormElements}
                              onDeleteFieldClick={this.handleOnDeleteFieldClick}
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
      addNewForm
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(CreateFormModalComponent);
