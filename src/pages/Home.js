import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serverIp from '../ipConfig.js';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch(`http://${serverIp}:4000/videos`);
            const data = await response.json();
            this.setState({ videos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App">
                    <div className="container">
                        {this.state.videos.map(video =>
                            <div className="video_card" key={video.id}>
                                <Link style={{ textDecoration: 'none' }} to={`/player/${video.id}`}>
                                    <div>
                                        <img src={`http://${serverIp}:4000${video.poster}`} alt={video.name} />
                                        <div className="card-body">
                                            <p>{video.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
            </div>
        )
    }
}
