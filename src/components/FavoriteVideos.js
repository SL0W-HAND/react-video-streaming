import React from 'react';
import PropTypes from 'prop-types';
import VideoCard from './VideoCard';

const FavoriteVideos = ({videos,serverIp}) => {
    return (
        <React.Fragment>
        {videos.length ?
            <div className='Favorite-videos'>
                {videos.map(video =>
                    <VideoCard key={video.id}  {...video} serverIp={serverIp} isList/>
                )}
            </div>
            :null
        }
        </React.Fragment>
    ); 
};

FavoriteVideos.propTypes = {
 videos: PropTypes.array,
};

export default FavoriteVideos;