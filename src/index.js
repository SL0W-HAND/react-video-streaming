import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import reducer from './reducers/index';
import serverIp from './ipConfig.js';
import axios from 'axios';

const initialState = {'user':{},'videos':[], 'serverIp':serverIp, 'favList':[]}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,composeEnhancers())

var data = []

axios.get(`http://${serverIp}:4000/videos`)
  .then(function (response) {
    // handle success
    data = response.data
    console.log('dd')
     store.dispatch({
      type:'SET_VIDEOS',
      payload:data
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
