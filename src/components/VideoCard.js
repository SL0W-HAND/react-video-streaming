import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {setFavorite, deleateFavorite} from '../actions'

const VideoCard = ({name, serverIp, id, setFavorite}) => {
    const handleSetFavorite = () => {
        setFavorite({
            name, serverIp, id
        })
    }
    
    return (
        <div className="card" >
        <Link  style={{ textDecoration: 'none' }} to={`/player/${id}`}>
                <img className="card-img-top" src={`http://${serverIp}:4000/video/${id}/poster`} alt={name}/>
                <div className="card-body">
                    <p className="card-text">{name}</p>
                </div>
                
        </Link>
        <button onClick={handleSetFavorite}>plus</button>
    
    </div>
    )
}

VideoCard.propTypes = {
    serverIp: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
}

const mapDispatchToProps = {
    setFavorite,
    deleateFavorite,
}


export default connect(null, mapDispatchToProps)(VideoCard)
