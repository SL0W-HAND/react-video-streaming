import React, { useState, useEffect } from 'react';
import serverIp from '../ipConfig.js';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from '../components/Carousel';

const Player = (props) => {
	const { id } = useParams();

	const [VideoData, setVideoData] = useState({});

	const [VideoUrl, setVideoUrl] = useState('');

	const [Recomendations, setRecomendations] = useState([]);

	const history = useHistory();

	if (!localStorage.getItem('authenticated')) {
		history.push('/login');
	}

	useEffect(() => {
		axios
			.get(`http://${serverIp}/video/${props.match.params.id}/data`, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.status !== 200) {
					history.push('/login');
					localStorage.setItem('authenticated', false);
				}
				setVideoData(response.data);
			})
			.catch((error) => {
				localStorage.setItem('authenticated', false);
				history.push('/login');
			});
		setVideoUrl(`http://${serverIp}/video/${id}`);
		axios
			.get(`http://${serverIp}/recomendations/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setRecomendations(response.data);
			});
	}, []);

	return (
		<main className='VideoPlayer'>
			<div>
				<button type='button' onClick={() => props.history.goBack()}>
					<FontAwesomeIcon
						icon={['fas', 'step-backward']}
						size='2x'
					/>
				</button>
				<h1>{VideoData.name}</h1>
			</div>
			<video controls autoPlay muted src={VideoUrl}></video>
			<Carousel serverIp={serverIp} videos={Recomendations} />
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, null)(Player);
