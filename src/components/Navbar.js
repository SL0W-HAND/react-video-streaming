import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import Searcher from './Searcher';

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
            <header>
                <nav>
                    <div>
                        <Link to='/home'>
                            <h1><img src={logo} alt='logo'/></h1>   
                        </Link>                      
                        <Link to='/home'>
                            <h1 className="">Home</h1>
                        </Link>  
                        <Link to='/home'>
                            <h1 className="">random</h1>
                        </Link>                       
                    </div>    
                    <Searcher/>
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