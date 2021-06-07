import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link,useHistory } from 'react-router-dom';


const Searcher = ({videos}) => {

    const [filteredData,setFilteredData] = useState([]);

    const [InputValue, setInputValue] = useState('');

    const handleSearch = (event) => {
        let result = [];
        let value = event.target.value.toLowerCase();
        setInputValue(value.split(' ').join('_'));
        //console.log(InputValue)
        if (event.target.value !== 0) {
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
        <div>
            <label>Search:</label>
            <div>
                <input type="text" onChange={(event) =>handleSearch(event)} />
                <button onClick={handleClick}>find</button>
            </div>
            <ul>
                {filteredData.map(video =>
                    <li><Link to={`/player/:${video.id}`}>{video.name}</Link></li>    
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