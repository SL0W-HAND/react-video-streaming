import React,{useState, useEffect} from 'react';
import serverIp from '../ipConfig.js';
import {connect} from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Player = props => {
   
    const Id = props.match.params.id

    const [VideoData, setVideoData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://${serverIp}:4000/video/${Id}/data`,
            );
       
            setVideoData(result.data);
          };
       
          fetchData();
      },[Id]);

    return (
        <main className='VideoPlayer'>
            <div>
                <button type='button' onClick={()=> props.history.goBack()}>
                    <FontAwesomeIcon icon={['fas', 'step-backward']} size='2x' />   
                </button>
                <h1>{VideoData.name}</h1>
            </div>
            <video controls autoPlay>
                <source src={`http://${serverIp}:4000/video/${Id}`} type="video/mp4"></source>
            </video>
        </main>
        );
    
};

export default connect(null,null)(Player);