import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {setFavorite, deleateFavorite} from '../actions';

const VideoCard = ({name, serverIp, id, setFavorite, deleateFavorite, isList}) => {
    const handleSetFavorite = () => {
        setFavorite({
            name, serverIp, id
        });
    };

    const handelDeleateFavorite = () => {
        deleateFavorite(id);
    };
    
    return (
        <div>
        <Link  style={{ textDecoration: 'none' }} to={`/player/${id}`}>
                <img src={`http://${serverIp}:4000/video/${id}/poster`} alt={name}/>
                <div>
                    <p>{name}</p>
                </div>
                
        </Link>
        {isList ?
            <button onClick={handelDeleateFavorite}>minus</button> : 
            <button onClick={handleSetFavorite}>plus</button>
        }
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