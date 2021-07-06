import React from 'react';
import { connect } from 'react-redux';
import VideoCard from '../components/VideoCard';
import Error404 from '../components/Error404';
import { useHistory } from 'react-router-dom';

const Results = props => {

    const params = props.match.params.id.split('_').join(' ');

    const history = useHistory();

    const Allvideos = props.videos.filter((data) => {
        return data.name.toLowerCase().includes(params);
    });

    if (props.user === null) {
        history.push('/login')
    }
   
    return (
        <main className='Home-container'>
            <section className='videos'>
                {Allvideos.length === 0
                    ? null
                    :<span><h2>Results for "{props.match.params.id}"</h2></span>
                }
                <div className='vid-container'>
                {Allvideos.length === 0 
                    ?<div className='notfound'>
                        <h1>Not results</h1>
                        <Error404/>
                    </div>
                    : Allvideos.map(video =>
                        <VideoCard key={video.id}  {...video} serverIp={props.serverIp}/>
                    )
                }
                </div>
            </section>
        </main>
    );
};

const mapStateToProps = state => {
    return{
        videos:state.videos,
        serverIp:state.serverIp,
        user:state.user,
    };
};

export default connect(mapStateToProps,null)(Results);