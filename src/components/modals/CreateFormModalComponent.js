import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewForm, clearCurrentForm, newFormChanged} from "../../redux/actions/actions";
import AddedFieldList from "../fields/AddedFieldList";
import {fromJS} from "immutable";

/* TODO: read this about managing state:
     https://www.digitalocean.com/community/tutorials/how-to-manage-state-on-react-class-components*/
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
    this.userInputChange = this.userInputChange.bind(this);
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

  // TODO: Step1-  To implement next to functions
  //  use this: https://stackoverflow.com/a/37579502/6805866
  userInputChange(event, idx) {
    let input;
  }


  deleteAddedField(event, index) {
    event.preventDefault();
    this.state.newFormElements.splice(index, 1)
    this.setState({
      newFormElements: this.state.newFormElements
    });
  }

  formSubmitted = (event) => {
    // event.preventDefault();

    const formName = document.getElementById("formNameField").value;
    const labelFieldsByNameValues = Array.from(
      document
        .getElementsByName("labelField")
        .values());
    const selectFieldsByNameValues = Array.from(
      document
        .getElementsByName("formElementTypeField")
        .values());

    for (let i = 0; i < labelFieldsByNameValues.length; i++) {
      this.state.newFormElements[i].label = labelFieldsByNameValues[i].value;
      this.state.newFormElements[i].formElementType = selectFieldsByNameValues[i].value;
    }
    console.log("FINALLY - this.state.newFormElements:", this.state.newFormElements);

    this.setState({
      newFormElements: this.state.newFormElements
    });

    let id = Math.floor(Math.random() * 100) + 100;
    const im_newFormElements = fromJS(this.state.newFormElements)
    this.props.onAddNewForm(id, formName, im_newFormElements);
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
            <h2 ref={(_subtitle) => (this.state.subtitle = _subtitle)}>
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

// TODO: map function(S) for handling AddedFieldComponent
function mapStateToProps(state) {
  const {addingReducer} = state;
  return {
    // newFormName: addingReducer.get("newFormName")
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
