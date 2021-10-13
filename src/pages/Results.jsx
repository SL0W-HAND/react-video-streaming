import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//libraries
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import serverIp from '../ipConfig';
import devConfig from '../devConfig';
import { setAuthenticated } from '../actions/index';

//components
import VideoCard from '../components/VideoCard';
import Error404 from '../components/Error404';
import Navbar from '../components/Navbar';

const Results = (props, { setAuthenticated }) => {
	const params = props.match.params.id.split('_').join(' ');

	const history = useHistory();
	const [AllVideos, setAllVideos] = useState([]);

	if (props.user === null) {
		history.push('/login');
	}

	useEffect(() => {
		axios
			.get(`http://${serverIp}/videos/search_results/${params}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				let videos = res.data;
				setAllVideos(videos);
			})
			.catch((err) => {
				console.log(err);
				setAuthenticated(false);
			});
	}, []);
	useEffect(() => {
		axios
			.get(`http://${serverIp}/videos/search_results/${params}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log('not found');
				setAllVideos(res.data);
			})
			.catch((err) => {
				console.log(err);
				setAuthenticated(false);
			});
	}, [props.match.params.id]);

	return (
		<div className='Layout'>
			<Navbar />

			<main className='Home-container'>
				<section className='videos'>
					{AllVideos.length === 0 ? null : (
						<span>
							<h2>Results for "{props.match.params.id}"</h2>
						</span>
					)}
					<div className='vid-container'>
						{AllVideos.length === 0 ? (
							<div className='notfound'>
								<h1>
									Not results for "{props.match.params.id}"
								</h1>
								<Error404 />
							</div>
						) : (
							AllVideos.map((video) => (
								<VideoCard
									key={video.id}
									{...video}
									cardStyle='card1'
								/>
							))
						)}
					</div>
				</section>
			</main>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		videos: state.videos,
		user: state.user,
	};
};

const mapDispatchToProps = {
	setAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
