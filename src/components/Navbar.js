import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Searcher from './Searcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Random from './Random'

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
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <div>
                            <Link className="navbar-brand" to='/'>
                                <FontAwesomeIcon icon={['fas', 'home']} size='2x' />
                            </Link> 
                            <Random/>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
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