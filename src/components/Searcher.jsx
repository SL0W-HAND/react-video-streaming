import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import serverIp from '../ipConfig';

const Searcher = ({ videos }) => {
	const [filteredData, setFilteredData] = useState([]);

	const [InputValue, setInputValue] = useState('');

	const [ResultsStyle, setResultsStyle] = useState('none');

	const history = useHistory();

	const handleSearch = (event) => {
		let result = [];
		let value = event.target.value.toLowerCase();
		value = value.split(' ').join('_');

		if (value.length > 0) {
			console.log(value);
			axios
				.get(`http://${serverIp}/videos/search/${value}`, {
					withCredentials: true,
				})
				.then((res) => {
					result = res.data;
					setFilteredData(result);
					setResultsStyle('list-group');
				})
				.catch((err) => {
					console.log(err);
					history.push('/login');
					localStorage.setItem('authenticated', false);
				});
		}
		if (event.target.value.length !== 0) {
			if (result.length !== 0) {
				setResultsStyle('list-group');
			} else {
				setResultsStyle('none');
			}
		} else {
			setFilteredData([]);
			setResultsStyle('none');
		}
	};

	const handleClick = (event) => {
		event.preventDefault();

		if (InputValue.length !== 0) {
			history.push(`/search/${InputValue}`);
			setFilteredData([]);
			setResultsStyle('none');
		} else {
			//prevent default and bootstrap alert
		}
	};

	return (
		<div className='searcher'>
			<form className='d-flex' onSubmit={handleClick}>
				<input
					type='text'
					className='form-control me-sm-2'
					onChange={(event) => handleSearch(event)}
					placeholder='search'
				/>
				<button type='submit'>
					<FontAwesomeIcon icon={['fas', 'search']} size='2x' />
				</button>
			</form>
			<ul className={ResultsStyle}>
				{filteredData.map((video) => (
					<li key={`link${video.id}`}>
						<Link to={`/player/${video.id}`}>{video.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		videos: state.videos,
	};
};

export default connect(mapStateToProps, null)(Searcher);
