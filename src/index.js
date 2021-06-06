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
async function fetchData() {
  const response = await fetch(`http://${serverIp}:4000/videos`);
  const data1 = await response.json();
  console.log(data1)
  return{
    data1
  }
   
}
const data = [
  {
      "id": 0,
      "name": "All Along The Watchtower(360P)_1.mp4",
      "duration": 246.287708,
      "path": "C:\\Users\\US3R\\Desktop\\vid\\All Along The Watchtower(360P)_1.mp4"
  },
  {
      "id": 1,
      "name": "Bee Gees - Stayin_ Alive (Official Music Video)(360P)_1.mp4",
      "duration": 249.5,
      "path": "C:\\Users\\US3R\\Desktop\\vid\\Bee Gees - Stayin_ Alive (Official Music Video)(360P)_1.mp4"
  },
  {
      "id": 2,
      "name": "Eric Clapton - I Shot The Sheriff [Crossroads 2010] (Official Live Video)(360P)_1.mp4",
      "duration": 508.508,
      "path": "C:\\Users\\US3R\\Desktop\\vid\\Eric Clapton - I Shot The Sheriff [Crossroads 2010] (Official Live Video)(360P)_1.mp4"
  },
  {
      "id": 3,
      "name": "Little Wing(360P)_1.mp4",
      "duration": 151.458333,
      "path": "C:\\Users\\US3R\\Desktop\\vid\\Little Wing(360P)_1.mp4"
  }
]

const initialState = {"lol":'chill','user':{},'videos':data, 'serverIp':serverIp, 'favList':[]}

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
