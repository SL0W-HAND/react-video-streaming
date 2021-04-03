import React from 'react'
import PropTypes from 'prop-types'
import VideoCard from './VideoCard'

const FavoriteVideos = ({videos,serverIp}) => {
    return (
        <React.Fragment>
        {videos.length?
        <div className="container">
                {videos.map(video =>
                    <VideoCard key={video.id}  {...video} serverIp={serverIp}/>
                )}
        </div>
        :null}
        </React.Fragment>
    )
   
}

FavoriteVideos.propTypes = {
 videos: PropTypes.array,
}

export default FavoriteVideos
