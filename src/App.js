import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Home from './pages/Home.js';
import Player from './pages/Player.js';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/player/:id" component={Player}></Route>
            </Switch>
        </Router>
    );
}
export default App;