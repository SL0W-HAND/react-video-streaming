import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

//components
import Home from './pages/Home';
import Player from './pages/Player';
import Login from './pages/login';
import NotFound from './pages/NotFound';
import Results from './pages/Results';
import serverIp from './ipConfig';

//libraries
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
	faChevronDown,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuthenticated } from './actions/index';

library.add(
	faRandom,
	faHeart,
	faTrashAlt,
	faSearch,
	faHome,
	faStepBackward,
	faChevronDown,
	faChevronRight
);

const Loader = ({ auth }) => {
	const authenticated = auth;
	if (authenticated === false) {
		return <Redirect to='/login' />;
	} else {
		return <div>loading</div>;
	}
};

function App({ authenticatedState, setAuthenticated }) {
	const [IsAuthenticated, setIsAuthenticated] = React.useState(null);

	React.useEffect(() => {
		axios
			.get(`http://${serverIp}/refresh_token`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 200) {
					//change global value
					setAuthenticated(true);
					localStorage.setItem('authenticated', true);
					//change local value
					setIsAuthenticated(true);
				} else {
					localStorage.setItem('authenticated', false);

					//change global value
					setAuthenticated(false);
					//change local value
					setIsAuthenticated(false);
				}
			})
			.catch((err) => {
				localStorage.setItem('authenticated', false);

				//change global value
				setAuthenticated(false);
				//change local value
				setIsAuthenticated(false);
			});
	}, []);

	//every 5 minutes, make a request to the server to get the latest token
	setInterval(() => {
		axios
			.get('/refresh_token', {
				withCredentials: true,
			})
			.catch((err) => {
				console.log(err);
			});
	}, 1000 * 60 * 5);

	React.useEffect(() => {
		//change the local value every time the global value changes
		setIsAuthenticated(authenticatedState);
	}, [authenticatedState]);

	return (
		<Router>
			<Switch>
				<Route
					exact
					path='/'
					render={() =>
						IsAuthenticated === true ? (
							<Home />
						) : (
							<Loader auth={IsAuthenticated} />
						)
					}
				/>
				<Route exact path='/login' component={Login} />
				<Route
					exact
					path='/player/:id'
					render={(props) =>
						IsAuthenticated === true ? (
							<Player {...props} />
						) : (
							<Loader auth={IsAuthenticated} />
						)
					}
				/>
				<Route
					exact
					path='/search/:id'
					render={(props) =>
						IsAuthenticated === true ? (
							<Results {...props} />
						) : (
							<Loader auth={IsAuthenticated} />
						)
					}
				/>
				<Route
					render={(props) =>
						IsAuthenticated === true ? (
							<NotFound {...props} />
						) : (
							<Loader auth={IsAuthenticated} />
						)
					}
				/>
			</Switch>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		authenticatedState: state.auth,
	};
};

const mapDispatchToProps = {
	setAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
