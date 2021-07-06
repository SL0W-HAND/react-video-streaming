import React, {useState, useEffect } from 'react';
import {  connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import FavoriteVideos from '../components/FavoriteVideos';


const Home = props => {

    const [Favlist, setFavlist] = useState([])

    const [ServerIp, setServerIp] = useState('')

    const history = useHistory();

    useEffect(() => {
        setFavlist(props.favList)
        setServerIp(props.serverIp)
    })

    
    //    {props.user === null ? history.push('/login') : null }
    if (props.user === null) {
        history.push('/login')
    }
    
        return (
            <main className='Home-container'>
                <FavoriteVideos serverIp={ServerIp} videos={Favlist}/>
                <section className='videos'>
                    <span><h2>Videos</h2></span>
                    <div className='vid-container'>
                        {props.videos.length !== 0 ?
                            props.videos.map(video =>
                                <VideoCard key={video.id}  {...video} serverIp={ServerIp}/>
                            )
                            :null       
                        }
                </div>
                </section>
            </main>
        );
    
};

const mapStateToProps = state => {
    return {
        videos: state.videos,
        serverIp: state.serverIp,
        favList: state.favList,
        user: state.user,
    };
};

export default connect(mapStateToProps,null)(Home);