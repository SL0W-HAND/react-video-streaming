import React, { Component } from 'react';
import {  connect } from 'react-redux';
import VideoCard from '../components/VideoCard'
import FavoriteVideos from '../components/FavoriteVideos'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            favList: [],
            lol:'',
            serverIp:''
        };
    }
    async componentDidMount() {
        try {
            /*
            const response = await fetch(`http://${serverIp}:4000/videos`);
            const data = await response.json();
            this.setState({ videos: [...data] });
            */
        } catch (error) {
            console.log(error);
        }
        this.setState({
            lol:this.props.lol,
            videos:this.props.videos, 
            serverIp: this.props.serverIp,
            favList:this.props.favList
        });
    }
    render() {
        return (
        <div>
                <FavoriteVideos serverIp={this.state.serverIp} videos={this.props.favList}/>
                <div className="container">
                    {this.state.videos.map(video =>
                            <VideoCard key={video.id}  {...video} serverIp={this.state.serverIp}/>
                        )}
                    <h1>{this.state.lol}</h1>
                </div>
            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lol: state.lol,
        videos: state.videos,
        serverIp: state.serverIp,
        favList: state.favList
    }
}

export default connect(mapStateToProps,null)(Home);
/*
{this.state.videos.map(video =>
                        <VideoCard key={video.id}  {...video} serverIp={this.state.serverIp}/>
                    )}
*/