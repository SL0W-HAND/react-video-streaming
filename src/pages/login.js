import React, { useState }  from 'react';
import {connect} from 'react-redux';
import { setUser, setVideos } from '../actions';
import axios from 'axios';
import ipServer from '../ipConfig';
import { useHistory } from 'react-router-dom';

const Login = ({setUser, setVideos})=> {
  
  const history = useHistory();

  const [data, setData] = useState({
    name: '',
    password: ''
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    });
  };

  const sendLogin = (event) => {
    event.preventDefault();
    axios.post(`http://${ipServer}/signin`,{
                  password:data.password, 
                  name: data.name
              }, 
              {
                  headers: {
                  'Content-Type': 'application/json'
                  }
              }).then(response => {
                      sessionStorage.setItem('token',response.data.token)

                      axios.get(`http://${ipServer}/videos`,{
                        headers:{
                          Authorization:`Bearer ${response.data.token}`
                        }
                      })
                      .then(function (response) {
                        // handle success
                        setVideos(response.data)
                        history.push('/')
                      })
                      .catch(function (error,response) {
                        // handle error
                        console.log(error);
                        setVideos([])
                      })
                      .then(function () {
                      });
                      setUser(response.data.user);
    });
  };

  return (
    <form className='Login' onSubmit={sendLogin}>
      <fieldset>
        <legend>Enter your data</legend>
        <div className="form-group">
          <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
          <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={handleInputChange} name="name"/>
          <small id="emailHelp" className="form-text text-muted"/>We'll never share your email with anyone else.<small/>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleInputChange} name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </fieldset>
    </form>
  );
};

const mapDispatchToProps = {
	setUser,
  setVideos
};

export default connect(null,mapDispatchToProps)(Login);