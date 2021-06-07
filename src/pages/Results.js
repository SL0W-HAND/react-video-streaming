import React from 'react';
import { connect } from 'react-redux';
import VideoCard from '../components/VideoCard';

const Results = props => {

    const params = props.match.params.id.split('_').join(' ');

    const Allvideos = props.videos.filter((data) => {
        return data.name.toLowerCase().includes(params);
    });
    //slice for the max number of results on the screen

    return (
        <div>
           {params.lenght === 0
            ? <h1>nel</h1>
            : Allvideos.lenght === 0 
                ?<h1>nel</h1>
                :Allvideos.map(video =>
                    <VideoCard key={video.id}  {...video} serverIp={props.serverIp}/>
                )
           }
        </div>
    );
};

const mapStateToProps = state => {
    return{
        videos:state.videos,
        serverIp:state.serverIp
    };
};

export default connect(mapStateToProps,null)(Results);