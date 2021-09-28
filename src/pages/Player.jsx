import React, { useState, useEffect } from 'react';
import serverIp from '../ipConfig.js';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from '../components/Carousel';
import { setFavorite, deleateFavorite } from '../actions';

const Player = (props, { setFavorite, deleateFavorite }) => {
	const [Favlist, setFavlist] = useState([]);

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
		setFavlist(props.favList);
		axios
			.get(`http://${serverIp}/recomendations/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setRecomendations(response.data);
			});
	}, []);

	useEffect(() => {
		setVideoUrl(`http://${serverIp}/video/${id}`);
		axios
			.get(`http://${serverIp}/recomendations/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setRecomendations(response.data);
			});
	}, [props.match.params.id]);

	useEffect(() => {
		setFavlist(props.favList);
	}, [props.favList]);

	return (
		<main className='VideoContainer'>
			<div className='videoPlayer'>
				<video controls autoPlay muted src={VideoUrl}></video>
				<div className='info'>
					<button
						type='button'
						onClick={() => props.history.goBack()}
					>
						<FontAwesomeIcon
							icon={['fas', 'step-backward']}
							size='2x'
						/>
					</button>
					<h1>{VideoData.name}</h1>
				</div>
			</div>
			<div>
				<section className='favorites'>
					<h1>Favorites</h1>
					<Carousel
						serverIp={serverIp}
						cardStyle='card2'
						videos={Favlist}
						islist={true}
					/>
				</section>
				<section className='recomendations'>
					<Carousel
						serverIp={serverIp}
						cardStyle='card2'
						videos={Recomendations}
						islist={false}
					/>
				</section>
			</div>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		favList: state.favList,
	};
};

const mapDispatchToProps = {
	setFavorite,
	deleateFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
