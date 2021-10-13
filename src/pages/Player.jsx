import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//libraries
import { setFavorite, deleateFavorite, setAuthenticated } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import serverIp from '../ipConfig.js';
import devConfig from '../devConfig';

//componets
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';

const Player = (props, { setFavorite, deleateFavorite, setAuthenticated }) => {
	const [Favlist, setFavlist] = useState([]);

	const { id } = useParams();

	const [VideoData, setVideoData] = useState({});

	const [VideoUrl, setVideoUrl] = useState('');

	const [Recomendations, setRecomendations] = useState([]);

	const [Colapsable, setColapsable] = useState('open');

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
					setAuthenticated(false);
				}
				setVideoData(response.data);
			})
			.catch((error) => {
				setAuthenticated(false);
			});

		setVideoUrl(`http://${serverIp}/video/${id}`);

		setFavlist(props.favList);
		axios
			.get(`http://${serverIp}/recomendations/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setRecomendations(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(props);
	}, []);

	useEffect(() => {
		setVideoUrl(`http://${serverIp}/video/${id}`);
		axios
			.get(`http://${serverIp}/recomendations/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setRecomendations(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`http://${serverIp}/video/${props.match.params.id}/data`, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.status !== 200) {
					setAuthenticated(false);
				}
				setVideoData(response.data);
			})
			.catch((error) => {
				setAuthenticated(false);
			});
	}, [props.match.params.id]);

	useEffect(() => {
		setFavlist(props.favList);
	}, [props.favList]);

	return (
		<div className='Layout'>
			<Navbar />
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
						<div className='favorites_title'>
							<h1>Favorites</h1>
							{Colapsable === 'open' ? (
								<FontAwesomeIcon
									icon={['fas', 'chevron-down']}
									size='2x'
									onClick={() => setColapsable('close')}
									className='colapsable_icon'
								/>
							) : (
								<FontAwesomeIcon
									icon={['fas', 'chevron-right']}
									size='2x'
									onClick={() => setColapsable('open')}
									className='colapsable_icon'
								/>
							)}
						</div>
						<div className={Colapsable}>
							<Carousel
								cardStyle='card2'
								videos={Favlist}
								islist={true}
							/>
						</div>
					</section>
					<section className='recomendations'>
						<Carousel
							cardStyle='card2'
							videos={Recomendations}
							islist={false}
						/>
					</section>
				</div>
			</main>
		</div>
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
	setAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
