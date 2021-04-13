import React, { Component } from "react";
import MainContentComponent from "../components/MainContentComponent";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("User has submitted values");
  };

  render() {
    return <MainContentComponent />;
  }
}

export default MainContent;
