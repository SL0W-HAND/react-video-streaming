import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {setFavorite, deleateFavorite} from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VideoCard = ({name, serverIp, id, duration, setFavorite, deleateFavorite, isList}) => {
    const handleSetFavorite = () => {
        setFavorite({
            name, serverIp, id,duration
        });
    };

    const handelDeleateFavorite = () => {
        deleateFavorite(id);
    };
    
    return (
        <div className="card mb-3">
            <Link  style={{ textDecoration: 'none' }} to={`/player/${id}`}>
                <h3 className="card-header">{name}</h3>
            </Link>
            <Link  style={{ textDecoration: 'none' }} to={`/player/${id}`}>
                <img src={`http://${serverIp}/video/${id}/poster`} className="d-block user-select-none" alt={name}/>  
            </Link>
            <div className="card-footer text-muted flex">
                <p className="card-text">{`${Math.floor(duration/60)}:${(((duration/60)-Math.floor(duration/60)).toFixed(2))*100}`}</p>
                {isList ?
                    <button className="card-link" onClick={handelDeleateFavorite}><FontAwesomeIcon icon={['fas', 'minus-circle']} size='2x'/></button>  
                    :<button className="card-link" onClick={handleSetFavorite}><FontAwesomeIcon icon={['fas', 'plus-circle']} size='2x'/></button>
                }
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