import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Searcher = ({videos}) => {

    const [filteredData,setFilteredData] = useState([]);

    const [InputValue, setInputValue] = useState('');

    const [ResultsStyle, setResultsStyle] = useState("none");

    const history = useHistory();

    const handleSearch = (event) => {
        let result = [];
        let value = event.target.value.toLowerCase();
        setInputValue(value.split(' ').join('_'));
        if (event.target.value.length !== 0) {
            result = videos.filter((data) => {
                return data.name.toLowerCase().includes(value);
            });
            //slice for the max number of results on the screen
            setFilteredData(result.slice(0, 10));
            if (result.length !== 0) {
                setResultsStyle("2px solid #F184B5");   
            }else{
                setResultsStyle("none")
            }
        } else {
            setFilteredData([]);
            setResultsStyle("none")
        };
    };


    const handleClick = (event) => {
        event.preventDefault() 
            
        if (InputValue.length !== 0) {
            history.push(`/search/${InputValue}`) 
            setFilteredData([])
            setResultsStyle("none")      
        } else {
            //prevent default and bootstrap alert   
        }
    }

    return (
        <div className='searcher'>
            <form className="d-flex" onSubmit={handleClick}>
                <input type="text" className="form-control me-sm-2" onChange={(event) => handleSearch(event)} placeholder='search'/>
                <button className="btn btn-secondary my-2 my-sm-0" type='submit'><FontAwesomeIcon icon={['fas', 'search']} size='1x' /></button>
            </form>
            <ul style={{border:ResultsStyle}}>
                {filteredData.map(video =>
                    <li key={`link${video.id}`}><Link to={`/player/${video.id}`}>{video.name}</Link></li>    
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