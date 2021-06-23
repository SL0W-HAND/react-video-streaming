import React, { Component } from 'react';
import {  connect } from 'react-redux';
import VideoCard from '../components/VideoCard';
import FavoriteVideos from '../components/FavoriteVideos';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favList: [],
            serverIp:''
        };
    };

    componentDidMount() {
        this.setState({
            serverIp: this.props.serverIp,
            favList:this.props.favList
        });
    };

    render() {
        return (
            <main className='Home-container'>
                <FavoriteVideos serverIp={this.state.serverIp} videos={this.props.favList}/>
                <section className='videos'>
                    <span><h2>Videos</h2></span>
                    <div className='vid-container'>
                        {this.props.videos.length !== 0 ?
                            this.props.videos.map(video =>
                                <VideoCard key={video.id}  {...video} serverIp={this.state.serverIp}/>
                            )
                            :null       
                        }
                </div>
                </section>
            </main>
        );
    };
};

const mapStateToProps = state => {
    return {
        videos: state.videos,
        serverIp: state.serverIp,
        favList: state.favList
    };
};

export default connect(mapStateToProps,null)(Home);