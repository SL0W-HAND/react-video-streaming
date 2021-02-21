import React, { Component } from 'react';
import { AccessAlarm, ThreeDRotation, HomeIcon} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'

export class Navbar extends Component {
    render() {
        return (
            <nav className="nav">
                <div className='nav_container'>
                    <div>
                        <Link to='home'>
                            <h1><img src={logo} alt='logo' className='app_logo'/></h1>   
                        </Link>                      
                        <Link to='home'>
                            <h1 className="">Home</h1>
                        </Link>  
                        <Link to='home'>
                                <h1 className="">random</h1>
                        </Link>                       
                    </div>    
                    <from className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </from>
                </div>
            </nav>
        )
    }
}

export default Navbar;