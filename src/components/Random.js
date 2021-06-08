import React from 'react'
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Random = ({videos}) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/player/${videos[Math.floor(Math.random() * videos.length)].id}`);
        window.location.reload(true);
    }

    return (
        <button  onClick={handleClick}>
            <FontAwesomeIcon icon={['fas', 'random']} size='2x' />
        </button> 
    )
}

const mapStateToProps = state => {
    return{
        videos:state.videos
    };
};

export default connect(mapStateToProps,null)(Random);
