import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";
import { createStore } from 'redux';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // to work with the redux dev tools extension
);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.querySelector('main')
);

reportWebVitals();
