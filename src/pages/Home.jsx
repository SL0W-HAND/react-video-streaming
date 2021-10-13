import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ServerIp from '../ipConfig';
import devConfig from '../devConfig';

//libraries
import axios from 'axios';
import { setAuthenticated } from '../actions/index';

//Components
import VideoCard from '../components/VideoCard';
import Carousel from '../components/Carousel';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';

const Home = (props, { setAuthenticated }) => {
	const [Favlist, setFavlist] = useState([]);

	const [Videos, setVideos] = useState([]);

	const [currentPage, setcurrentPage] = useState(1);

	const [totalPages, setTotalPages] = useState(1);

	const fetchData = async () => {
		axios
			.get(`http://${ServerIp}/videos/${currentPage}`, {
				withCredentials: true,
			})
			.then((res) => {
				let page = res.data.page;
				setcurrentPage(page);
				let totalPages = parseInt(res.data.total_pages);
				setTotalPages(totalPages);
				setVideos(res.data.videos);
			})
			.catch((err) => {
				setAuthenticated(false);
				console.log(err);
			});
	};

	useEffect(() => {
		setFavlist(props.favList);

		fetchData();
	}, []);

	useEffect(() => {
		setFavlist(props.favList);
	}, [props.favList]);

	return (
		<div className='Layout'>
			<Navbar />

			<main className='Home-container'>
				<div className='fav-videos'>
					<span>
						<h2>Favorite videos</h2>
					</span>
					<Carousel
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
										key={video._id}
										{...video}
										cardStyle='card1'
									/>
							  ))
							: null}
					</div>
				</section>
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
	setAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
