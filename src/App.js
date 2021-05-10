// import "./App.css";
import Header from "./containers/Header";
import MainContent from "./containers/MainContent";
import Footer from "./containers/Footer";
import UserPOV from "./components/UserPOV";
import {Route, Switch} from "react-router-dom";

function App() {

  /* TODO: Step2 - implement React-Router elements here (encapsulate MainContent and UserPOV with <Switch> element).
      BTW, retrieve parameter value out of URL and pass it to UserPOV for rendering.
       const formId = getUrlParam("form?json"); get form Id from URL param -> use useParams HOOK by this example:
       https://reactrouter.com/web/example/url-params
  */
  // const params = useParams();
  // console.log("(in da App.js) params:", params);
  // const encodedData = "/form?json=eyJpZCI6NTU1LCJmb3JtTmFtZSI6Ik1lZGFyYmVpZGVyZSBuYXZuIiwiZm9ybUVsZW1lbnRzIjpbeyJpZCI6MSwiZm9ybUV" +
  //   "sZW1lbnRUeXBlIjoiQUREX1RFWFRfSU5QVVRfRklFTEQiLCJsYWJlbCI6Ik5hdm4iLCJwbGFjZWhvbGRlciI6IiIsInZhbHVlIjoiTmlrb2xhIn0seyJp" +
  //   "ZCI6MiwiZm9ybUVsZW1lbnRUeXBlIjoiQUREX1RFWFRfSU5QVVRfRklFTEQiLCJsYWJlbCI6IkV0dGVybmF2biIsInZhbHVlIjoiU3RldmFub3ZpYyJ9L" +
  //   "HsiaWQiOjMsImZvcm1FbGVtZW50VHlwZSI6IkFERF9URVhUQVJFQV9JTlBVVF9GSUVMRCIsImxhYmVsIjoiSW5mbyIsInZhbHVlIjoiSmVnIGhldGVyIE5" +
  //   "pa29sYS4gSCB2YSBoZXRlciBkdT8gIn1dfQ==";
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
