import React, { Component } from 'react';
import serverIp from '../ipConfig.js';
import { Link } from 'react-router-dom';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {}
        };
    }
    async componentDidMount() {
        try {
            const res = await fetch(`http://${serverIp}:4000/video/${this.state.videoId}/data`);
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <nav className='nav'>
                    <Link to='Home'>
                        <h1>Home</h1>
                    </Link>
                </nav>
                </header>
                <video controls muted autoPlay>
                    <source src={`http://${serverIp}:4000/video/${this.state.videoId}`} type="video/mp4"></source>
                </video>
                <h1>{ this.state.videoData.name }</h1>
            </div>
        )
    }
}