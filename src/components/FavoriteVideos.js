import React from 'react';
import PropTypes from 'prop-types';
import VideoCard from './VideoCard';

const FavoriteVideos = ({videos,serverIp}) => {
    console.log(videos)
    return (
        <React.Fragment>
        {videos.length ?
            <div className='fav-videos'>
                <span><h2>Favorite videos</h2></span>
                <div className='vid-container'>
                    {videos.map(video =>
                        <VideoCard key={video.id} {...video} serverIp={serverIp} isList/>
                    )}
                </div>
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