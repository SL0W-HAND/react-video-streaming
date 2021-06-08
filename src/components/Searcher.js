import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Searcher = ({videos}) => {

    const [filteredData,setFilteredData] = useState([]);

    const [InputValue, setInputValue] = useState('');

    const handleSearch = (event) => {
        let result = [];
        let value = event.target.value.toLowerCase();
        setInputValue(value.split(' ').join('_'));
        if (event.target.value.length !== 0) {
            result = videos.filter((data) => {
                return data.name.toLowerCase().includes(value);
            });
            //slice for the max number of results on the screen
            setFilteredData(result.slice(0, 2));
        } else {
            setFilteredData([]);
        };
    };


    const history = useHistory();
    const handleClick = () => history.push(`/search/${InputValue}`);

    return (
        <div className='searcher'>
            <div>
                <input type="text" onChange={(event) =>handleSearch(event)}/>
                <button onClick={handleClick}><FontAwesomeIcon icon={['fas', 'search']} size='1x' /></button>
            </div>
            <ul>
                {filteredData.map(video =>
                    <li><Link  to={`/player/${video.id}`}>{video.name}</Link></li>    
                )}
            </ul>
        </div>
    );
};



const mapStateToProps = state => {
    return{
        videos:state.videos
    };
};

export default connect(mapStateToProps,null)(Searcher);