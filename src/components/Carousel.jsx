import React from 'react';
import VideoCard from './VideoCard';
import Not_Found from '../assets/Not_found.png';

const Carousel = ({ videos, cardStyle, islist }) => {
	return (
		<React.Fragment>
			{videos.length ? (
				<div className='vid-container'>
					{videos.map((video) => (
						<VideoCard
							key={video._id}
							{...video}
							isList={islist}
							cardStyle={cardStyle}
						/>
					))}
				</div>
			) : (
				<div className='not_elements'>
					<img src={Not_Found} alt='not found ' />
					<span>
						<h3>You dont have nothing here, add something</h3>
					</span>
				</div>
			)}
		</React.Fragment>
	);
};

export default Carousel;
