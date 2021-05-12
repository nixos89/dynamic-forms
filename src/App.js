import React from "react";
import Header from "./containers/Header";
import MainContent from "./containers/MainContent";
import Footer from "./containers/Footer";
import UserPOV from "./components/UserPOV";
import {Route, Switch} from "react-router-dom";

function App() {

  return (
    <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
      <Header/>
      {/* {formId !== null ? <MainContent /> : <FormComponent formId={formId}/>} */}
      <Switch>
        <Route path="/" component={MainContent} exact/>
        <Route path="/:formId" component={UserPOV}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;

