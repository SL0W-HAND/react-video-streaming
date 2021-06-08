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
        <div className="video-card">
                <img src={`http://${serverIp}:4000/video/${id}/poster`} className="card-img" alt={name}/>  
                <div className="card-img-overlay">
                    <Link  style={{ textDecoration: 'none' }} to={`/player/${id}`}>
                        <h5 className="card-title ">{name}</h5>
                    </Link>
                    <div className='info-container'>
                        <p className="card-text">{`${Math.floor(duration/60)}:${((duration/60)-Math.floor(duration/60)).toFixed(2)}`}</p>
                        {isList ?
                            <button style={{ position:'relative' }} onClick={handelDeleateFavorite}><FontAwesomeIcon icon={['fas', 'minus-circle']} size='1x'/></button>  
                            :<button style={{ tposition:'relative' }} onClick={handleSetFavorite}><FontAwesomeIcon icon={['fas', 'plus-circle']} size='1x'/></button>
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