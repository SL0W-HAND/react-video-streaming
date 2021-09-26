import React from 'react';
import VideoCard from './VideoCard';
import Not_Found from '../assets/Not_found.png';

const Carousel = ({ videos, serverIp, cardStyle }) => {
	return (
		<React.Fragment>
			{videos.length ? (
				<div className='vid-container'>
					{videos.map((video) => (
						<VideoCard
							key={video.id}
							{...video}
							serverIp={serverIp}
							isList
							cardStyle={cardStyle}
						/>
					))}
				</div>
			) : (
				<div className='not_elements'>
					<img src={Not_Found} alt='not found image' />
					<span>
						<h3>You dont have nothing here, add something</h3>
					</span>
				</div>
			)}
		</React.Fragment>
	);
};

export default Carousel;
