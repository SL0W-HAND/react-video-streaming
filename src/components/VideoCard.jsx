import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import { setFavorite, deleateFavorite } from '../actions';

const VideoCard = ({
	name,
	serverIp,
	id,
	duration,
	setFavorite,
	deleateFavorite,
	isList,
	cardStyle,
}) => {
	const handleSetFavorite = () => {
		setFavorite({
			name,
			serverIp,
			id,
			duration,
		});
	};

	const handelDeleateFavorite = () => {
		deleateFavorite(id);
	};

	return (
		<div className={cardStyle}>
			<Link style={{ textDecoration: 'none' }} to={`/player/${id}`}>
				<img
					src={`http://${serverIp}/video/${id}/poster`}
					className='d-block user-select-none'
					alt={name}
				/>
			</Link>
			<div className='gradient' />

			<div className='card_info'>
				<Link style={{ textDecoration: 'none' }} to={`/player/${id}`}>
					<h3 className='name'>{name}</h3>
				</Link>
				<div className='info'>
					<p>{`${Math.floor(duration / 60)}:${
						(duration / 60 - Math.floor(duration / 60)).toFixed(2) *
						100
					}`}</p>
					{isList ? (
						<button
							className='card-link'
							onClick={handelDeleateFavorite}
						>
							<FontAwesomeIcon
								icon={['fas', 'trash-alt']}
								size='2x'
							/>
						</button>
					) : (
						<button
							className='card-link'
							onClick={handleSetFavorite}
						>
							<FontAwesomeIcon
								icon={['fas', 'heart']}
								size='2x'
							/>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	setFavorite,
	deleateFavorite,
};

export default connect(null, mapDispatchToProps)(VideoCard);
