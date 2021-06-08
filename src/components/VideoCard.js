import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {setFavorite, deleateFavorite} from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VideoCard = ({name, serverIp, id, duration, setFavorite, deleateFavorite, isList}) => {
    const handleSetFavorite = () => {
        setFavorite({
            name, serverIp, id
        });
    };

    const handelDeleateFavorite = () => {
        deleateFavorite(id);
    };
    
    return (
        <div class="card bg-dark text-white">
                <img src={`http://${serverIp}:4000/video/${id}/poster`} class="card-img" alt={name}/>  
                <div class="card-img-overlay">
                    <Link  style={{ textDecoration: 'none' }} to={`/player/${id}`}>
                        <h5 class="card-title ">{name}</h5>
                    </Link>
                    <div className='info-container'>
                        <p class="card-text">{`${Math.floor(duration/60)}:${((duration/60)-Math.floor(duration/60)).toFixed(2)}`}</p>
                        {isList ?
                            <button style={{ position:'relative' }} onClick={handelDeleateFavorite}><FontAwesomeIcon icon={['fas', 'minus-circle']} size='2x'/></button>  
                            :<button style={{ tposition:'relative' }} onClick={handleSetFavorite}><FontAwesomeIcon icon={['fas', 'plus-circle']} size='2x'/></button>
                        }
                    </div>
                </div>           
        </div>
    );
};

VideoCard.propTypes = {
    serverIp: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number
};

const mapDispatchToProps = {
    setFavorite,
    deleateFavorite,
};


export default connect(null, mapDispatchToProps)(VideoCard);