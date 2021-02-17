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
                <nav className='nav'>
                    <Link to='Home'>
                        <h1>Home</h1>
                    </Link>
                </nav>
                    <div className="contain">
                        {this.state.videos.map(video =>
                            <Link key={video.id} style={{ textDecoration: 'none' }} to={`/player/${video.id}`}>
                                <div className="card" >
                                    <img className="card-img-top" src={`http://${serverIp}:4000/video/${video.id}/poster`} alt={video.name}/>
                                    <div className="card-body">
                                        <p className="card-text">{video.name}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
            </div>
        )
    }
}