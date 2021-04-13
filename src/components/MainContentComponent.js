import React from "react";

function MainContentComponent(props) {
  return (
    <div className="form-control">
      <form onSubmit={props.handleSubmit}>
        <input type="text" value={props.formType} placeholder="Type of form" />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default MainContentComponent;
