import React from "react";

function MainContentComponent(props) {
  return (
    <main>
      <div className="form-control">
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            value={props.formType}
            placeholder="Type of form"
          />
          &nbsp;
          <button>Submit</button>
        </form>
      </div>
    </main>
  );
}

export default MainContentComponent;
