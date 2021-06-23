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
        <main className='Home-container'>
            <section className='vid-container'>
            {params.lenght === 0
                ? <h1>No results</h1>
                : Allvideos.lenght === 0 
                    ? <h1>Not results</h1>
                    : Allvideos.map(video =>
                        <VideoCard key={video.id}  {...video} serverIp={props.serverIp}/>
                    )
            }
            </section>
        </main>
    );
};

const mapStateToProps = state => {
    return{
        videos:state.videos,
        serverIp:state.serverIp
    };
};

export default connect(mapStateToProps,null)(Results);