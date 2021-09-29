import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//libraries
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//components
import VideoCard from '../components/VideoCard';
import Error404 from '../components/Error404';

const Results = (props) => {
	const params = props.match.params.id.split('_').join(' ');

	const history = useHistory();

	const [AllVideos, setAllVideos] = useState([]);

	if (props.user === null) {
		history.push('/login');
	}

	useEffect(() => {
		axios
			.get(`http://${props.serverIp}/videos/search_results/${params}`, {
				withCredentials: true,
			})
			.then((res) => {
				setAllVideos(res.data);
			})
			.catch((err) => {
				console.log(err);
				localStorage.setItem('authenticated', false);
			});
	}, []);
	useEffect(() => {
		axios
			.get(`http://${props.serverIp}/videos/search_results/${params}`, {
				withCredentials: true,
			})
			.then((res) => {
				setAllVideos(res.data);
			})
			.catch((err) => {
				console.log(err);
				localStorage.setItem('authenticated', false);
			});
	}, [props.match.params.id]);

	return (
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
							<h1>Not results</h1>
							<Error404 />
						</div>
					) : (
						AllVideos[0].videos.map((video) => (
							<VideoCard
								key={video.id}
								{...video}
								serverIp={props.serverIp}
								cardStyle='card1'
							/>
						))
					)}
				</div>
			</section>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		videos: state.videos,
		serverIp: state.serverIp,
		user: state.user,
	};
};

export default connect(mapStateToProps, null)(Results);
