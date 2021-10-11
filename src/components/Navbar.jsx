import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { setAuthenticated } from '../actions/index';
import { connect } from 'react-redux';
import serverIp from '../ipConfig';

//components
import Searcher from './Searcher';

const Navbar = ({ setAuthenticated }) => {
	const history = useHistory();

	//handle random button click
	const handleClick = () => {
		axios
			.get(`http://${serverIp}/random`, { withCredentials: true })
			.then((res) => {
				history.push(`/player/${res.data.id}`);
			})
			.catch((err) => {
				setAuthenticated(false);
			});
	};
	return (
		<header className='Navbar'>
			<nav className='navbar navbar-expand-lg navbar-dark '>
				<div className='container-fluid'>
					<div>
						<Link className='navbar-brand' to='/'>
							<FontAwesomeIcon icon={['fas', 'home']} size='2x' />
						</Link>
						<button onClick={handleClick}>
							<FontAwesomeIcon
								icon={['fas', 'random']}
								size='2x'
							/>
						</button>
					</div>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarColor01'
						aria-controls='navbarColor01'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse'
						id='navbarColor01'
					>
						<Searcher className='navbar-nav' />
					</div>
				</div>
			</nav>
		</header>
	);
};

const mapDispatchToProps = {
	setAuthenticated,
};

export default connect(null, mapDispatchToProps)(Navbar);
