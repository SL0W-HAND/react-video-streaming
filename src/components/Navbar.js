import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import Searcher from './Searcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{}
        };
    };

    componentDidMount(){
        this.setState({user:this.props.user})
    };


    render() {
        return (
            <header className='Navbar'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div className='links'>
                            <Link to='/home'>
                                <h1 className="navbar-brand">Home</h1>
                            </Link> 
                            <Link to='/home'>
                                <FontAwesomeIcon icon={['fas', 'random']} size='1x' />
                            </Link> 
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <Searcher className="navbar-nav"/>
                        </div>
                    </div>
                </nav>
            </header>
        );
    };
};

const mapStateToProps = state => {
    return{
        user:state.user
    };
};

export default connect(mapStateToProps,null)(Navbar);