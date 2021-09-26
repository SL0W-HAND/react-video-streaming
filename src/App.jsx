import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Player from './pages/Player';
import Login from './pages/login';
import NotFound from './pages/NotFound';
import Results from './pages/Results';
import Layout from './components/Layout';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/simplex/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from '@fortawesome/fontawesome-svg-core';
import './styles/modules.scss';
import {
	faHome,
	faHeart,
	faRandom,
	faSearch,
	faStepBackward,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add(faRandom, faHeart, faTrashAlt, faSearch, faHome, faStepBackward);

function App() {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/player/:id' component={Player} />
					<Route exact path='/search/:id' component={Results} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	);
}
export default App;