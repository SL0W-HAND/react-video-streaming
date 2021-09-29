import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

//components
import serverIp from '../ipConfig';

const Searcher = () => {
	const [filteredData, setFilteredData] = useState([]);

	const [InputValue, setInputValue] = useState('');

	const [ResultsStyle, setResultsStyle] = useState('none');

	const history = useHistory();

	const handleSearch = (event) => {
		let result = [];
		let value = event.target.value.toLowerCase();
		//setting the input value
		value = value.split(' ').join('_');
		setInputValue(value);

		if (value.length > 0) {
			axios
				.get(`http://${serverIp}/videos/search/${value}`, {
					withCredentials: true,
				})
				.then((res) => {
					result = res.data;
					setFilteredData(result);
					console.log(result);
					if (result.length > 0) {
						setResultsStyle('list-group');
					}
				})
				.catch((err) => {
					console.log(err);
					history.push('/login');
					localStorage.setItem('authenticated', false);
				});
		}

		//manage styles of results div
		if (value.length !== 0) {
			if (result.length === 0) {
				setResultsStyle('none');
			}
		} else {
			setFilteredData([]);
			setResultsStyle('none');
		}
	};

	//redirect to sarch page
	const handleClick = (event) => {
		event.preventDefault();
		console.log(InputValue);
		if (InputValue.length !== 0) {
			history.push(`/search/${InputValue}`);
			setFilteredData([]);
			setResultsStyle('none');
		} else {
			//prevent default and bootstrap alert
		}
	};

	const cleanResults = () => {
		setFilteredData([]);
		setResultsStyle('none');
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
						<Link onClick={cleanResults} to={`/player/${video.id}`}>
							{video.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Searcher;
