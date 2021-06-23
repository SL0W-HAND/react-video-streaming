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
import Results from './pages/Results.js';
import Layout from './components/Layout'
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/quartz/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from '@fortawesome/fontawesome-svg-core';
import './styles/modules.scss';
import { faHome, faMinusCircle, faPlusCircle, faRandom, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add( 
    faRandom,
    faPlusCircle,
    faMinusCircle,
    faSearch,
    faHome
)

function App() {
    return (
        <Router >
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={login}/>
                    <Route exact path="/player/:id" component={Player}/>
                    <Route exact path="/search/:id" component={Results}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        </Router>
    );
}
export default App;