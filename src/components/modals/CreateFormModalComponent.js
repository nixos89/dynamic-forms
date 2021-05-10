import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewForm, clearCurrentForm, newFormChanged} from "../../redux/actions/actions";
import AddedFieldList from "../fields/AddedFieldList";
import {fromJS} from "immutable";

class CreateFormModalComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      newFormElements: [],
      formName: "",
      subtitle: "Subtitle const",
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
    // const formElements = fromJS(this.state.newFormElements);
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

  afterOpenModal() {
    console.log("afterOpenModal clicked!!!")
  };

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  };

  render() {
    console.log("RENDER STATE", this.state);
    console.log("RENDER Redux STATE", this.props.reduxState);

    return (
      <div>
        <button className="btn btn-success" onClick={() => this.openModal()}>
          Nytt Skjema
        </button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={() => this.afterOpenModal()}
               onRequestClose={this.closeModal.bind(this)} message={this.message}
               style={customStyles} contentLabel="Example Modal">
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
                  <input type="reset" value="Nullstille" className="btn btn-danger"/>
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
}; // CreateFormModalComponent::END


function mapStateToProps(state) {
  const {mainReducer} = state;
  return {
    reduxState: mainReducer,
    forms: mainReducer.get("forms")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newFormChanged: newFormChanged,
      onAddNewForm: addNewForm,
      onClearCurrentForm: clearCurrentForm,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFormModalComponent);
