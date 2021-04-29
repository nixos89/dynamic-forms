import React from "react";
import AddedFieldComponent from "./AddedFieldComponent";

/* TODO - Use this component to place AddedFieldComponent in <ul> by
    following this example:
    https://scotch.io/tutorials/create-a-simple-to-do-app-with-react
*/
const AddedFieldList = (props) => {
  const {addedField} = props;

  return (
    <ul>
      <AddedFieldComponent/>
    </ul>
  );

}

export default AddedFieldList;