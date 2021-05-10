import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import {mainReducer} from "./redux/store/mainReducer";
import {logger} from "redux-logger/src";
import {BrowserRouter} from "react-router-dom";

const rootReducer = combineReducers({
  mainReducer: mainReducer
});

const createdStore = createStore(
  rootReducer,
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createdStore}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
