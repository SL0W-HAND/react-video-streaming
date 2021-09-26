import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Components
import VideoCard from '../components/VideoCard';
import Carousel from '../components/Carousel';
import axios from 'axios';

const Home = (props) => {
	const [Favlist, setFavlist] = useState([]);

	const [ServerIp, setServerIp] = useState('');

	const [Videos, setVideos] = useState([]);

	const history = useHistory();

	useEffect(() => {
		setFavlist(props.favList);
		setServerIp(props.serverIp);
		axios
			.get(`http://${props.serverIp}/videos/1`, { withCredentials: true })
			.then((res) => {
				console.log(res);
				setVideos(res.data.videos);
			})
			.catch((err) => {
				console.log(err);
				sessionStorage.clear();
				history.push('/login');
			});
	}, []);

	useEffect(() => {
		setFavlist(props.favList);
	});

	if (!localStorage.getItem('authenticated')) {
		history.push('/login');
	}

	return (
		<main className='Home-container'>
			<div className='fav-videos'>
				<span>
					<h2>Favorite videos</h2>
				</span>
				<Carousel
					serverIp={ServerIp}
					videos={Favlist}
					cardStyle='card1'
				/>
			</div>
			<section className='videos'>
				<span>
					<h2>Videos</h2>
				</span>
				<div className='vid-container'>
					{Videos !== 0
						? Videos.map((video) => (
								<VideoCard
									key={video.id}
									{...video}
									serverIp={ServerIp}
									cardStyle='card1'
								/>
						  ))
						: null}
				</div>
			</section>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		serverIp: state.serverIp,
		favList: state.favList,
	};
};

export default connect(mapStateToProps, null)(Home);
