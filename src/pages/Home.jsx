import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Components
import VideoCard from '../components/VideoCard';
import Carousel from '../components/Carousel';
import Pagination from '../components/Pagination';
import axios from 'axios';

const Home = (props) => {
	const [Favlist, setFavlist] = useState([]);

	const [ServerIp, setServerIp] = useState('');

	const [Videos, setVideos] = useState([]);

	const [currentPage, setcurrentPage] = useState(1);

	const [totalPages, settotalPages] = useState(1);

	const history = useHistory();

	const fetchData = async () => {
		axios
			.get(`http://${props.serverIp}/videos/${currentPage}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setVideos(res.data.videos);
				setcurrentPage(res.data.page);
				settotalPages(res.data.total_pages);
			})
			.catch((err) => {
				console.log(err);
				sessionStorage.clear();
				history.push('/login');
			});
	};

	useEffect(() => {
		setFavlist(props.favList);
		setServerIp(props.serverIp);
		fetchData();
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
					islist={true}
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
			<p>{currentPage}</p>
			<p>{totalPages}</p>

			{totalPages > 1 ? (
				<Pagination
					currentPage={setcurrentPage}
					totalPages={totalPages}
				/>
			) : null}
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
