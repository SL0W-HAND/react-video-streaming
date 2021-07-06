import React,{useState, useEffect} from 'react';
import serverIp from '../ipConfig.js';
import {connect} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Player = props => {
   
    const {id} = useParams()

    const [VideoData, setVideoData] = useState({})

    const [VideoUrl, setVideoUrl] = useState('')

    const history = useHistory();

    useEffect(async () => {
        await axios.get(`http://${serverIp}/video/${props.match.params.id}/data`,{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem('token')}`
                }
            }
        ).then(response => {
                setVideoData(response.data);
            });
        console.log(VideoData) 
        setVideoUrl(`http://${serverIp}/video/${id}`)   
    },[id]);

    if (props.user === null) {
      history.push('/login')
    }
    return (
        <main className='VideoPlayer'>
            <div>
                <button type='button' onClick={()=> props.history.goBack()}>
                    <FontAwesomeIcon icon={['fas', 'step-backward']} size='2x' />   
                </button>
                <h1>{VideoData.name}</h1>
            </div>
            <video controls autoPlay muted src={VideoUrl}>
            </video>
        </main>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps,null)(Player);