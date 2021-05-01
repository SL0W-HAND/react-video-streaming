import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Home from './pages/Home.js';
import Player from './pages/Player.js';
import login from './pages/login.js'
import NotFound from './pages/NotFound.js';
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/App.css';

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={login}/>
                    <Route exact path="/player/:id" component={Player}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        </Router>
    );
}
export default App;