import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index'
import serverIp from './ipConfig.js';

//the error is herex

const data = [
  {
      "id": 0,
      "name": "All Along The Watchtower.mp4",
      "duration": 246.288
  },
  {
      "id": 1,
      "name": "Guitar Flex on Instagram_ _Haha_ Can you relate_ ➖(MP4).mp4",
      "duration": 16.433984
  },
  {
      "id": 2,
      "name": "Our Third Dimension on Instagram_ _Spectacular exp(MP4).mp4",
      "duration": 7.3
  }
]

const initialState = {"lol":'chill','videos':data, 'serverIp':serverIp, 'favList':[]}

const store = createStore(reducer, initialState)

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
