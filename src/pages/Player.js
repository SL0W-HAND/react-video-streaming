import React, { Component } from 'react';
import serverIp from '../ipConfig.js';
import {connect} from 'react-redux';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: null,
            videoData: {}
        };
    };

    async componentDidMount() {
        try {
            this.setState({videoId:this.props.match.params.id});
            const res = await fetch(`http://${serverIp}:4000/video/${this.state.videoId}/data`);
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        };
    };

    render() {
        return (
            <>
                <video style={{width:'100vw'}} controls muted autoPlay>
                    <source src={`http://${serverIp}:4000/video/${this.state.videoId}`} type="video/mp4"></source>
                </video>
                <div>
                <button type='button' onClick={()=> this.props.history.goBack()}>
                    Back
                </button>
                </div>
                <h1>{ this.state.videoData.name }</h1>
            </>
        );
    };
};

export default connect(null,null)(Player);