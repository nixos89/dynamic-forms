import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import customStyles from "./customStyles";
import {bindActionCreators} from "redux";
import {addNewForm, clearCurrentForm, newFormChanged} from "../../redux/actions/actions";
import {ADD_TEXT_INPUT_FIELD} from "../../redux/actions/actionTypes";
import AddedFieldList from "../fields/AddedFieldList";
import {fromJS} from "immutable";

/* TODO: read this about managing state:
     https://www.digitalocean.com/community/tutorials/how-to-manage-state-on-react-class-components
     ...as well as this: https://stackoverflow.com/a/43571049/6805866 */
class CreateFormModalComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      im_newFormElements: [],
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

  // TODO: Fix re-rendering to be instant when "Nytt felt" button is clicked!
  addFieldFunction(event) {
    event.preventDefault();
    this.state.im_newFormElements.push({
      id: Math.floor(Math.random() * 100) + 100,
      label: "",
      formElementType: ADD_TEXT_INPUT_FIELD
    });
    this.setState({im_newFormElements: this.state.im_newFormElements});
  }

  deleteAddedField(event, index) {
    event.preventDefault();
    this.state.im_newFormElements.splice(index, 1)
    this.setState({
      im_newFormElements: this.state.im_newFormElements
    });
  }

  formSubmitted = (event) => {
    event.preventDefault();
    // console.log("event.target.getElementById(\"formName\"):", event.target.getElementById("formName"));
    const formNameElement = document.getElementById("formName");

    let formId = Math.floor(Math.random() * 100) + 100;
    this.props.onAddNewForm(formId, formNameElement.value, fromJS(this.state.im_newFormElements));
  };

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
            <form onSubmit={this.formSubmitted}>
              <div className="form-inline">
                <div className="form-group mb-2">
                  <input type="text"
                    // onChange={(event) => newFormChanged(event.target.value)}
                         id="formName" name="formName" placeholder="Skjemaer navn"
                  />

                  <input type="submit" className="btn btn-primary" value="Sende in"/>
                  &nbsp;
                  <input type="reset" value="Nullstille" className="btn btn-danger"
                    // onClick={() => clearCurrentForm}
                  />
                </div>
                <div className="form-group mb-2">
                  <input type="button" value="Nytt felt" className="btn btn-success"
                         onClick={this.addFieldFunction}/>
                </div>
              </div>
              <AddedFieldList newFormElements={this.state.im_newFormElements}
                              onDeleteField={this.deleteAddedField}/>
            </form>
          </div>
          <div className="modal-footer">


          </div>
        </Modal>
      </div>
    );
  }
}; // CreateFormModalComponent::END

// map function(S) for handling AddedFieldComponent
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

CreateFormModalComponent.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFormModalComponent);
