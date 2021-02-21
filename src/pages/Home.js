import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serverIp from '../ipConfig.js';
import Navbar from '../components/Navbar'

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
                <Navbar/>
                <div className="container">
                    {this.state.videos.map(video =>
                    <div className="card" >
                        <Link key={video.id} style={{ textDecoration: 'none' }} to={`/player/${video.id}`}>
                                <img className="card-img-top" src={`http://${serverIp}:4000/video/${video.id}/poster`} alt={video.name}/>
                                <div className="card-body">
                                    <p className="card-text">{video.name}</p>
                                </div>
                            
                        </Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}