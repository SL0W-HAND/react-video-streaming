import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//libraries
import axios from 'axios';
import serverIp from '../ipConfig';
import devConfig from '../devConfig';
import { setAuthenticated } from '../actions/index';

const Login = ({ setAuthenticated }) => {
	const history = useHistory();

	const [data, setData] = useState({
		password: '',
	});

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const sendLogin = (event) => {
		event.preventDefault();
		axios.defaults.withCredentials = true;
		axios
			.post(
				`http://${serverIp}/login`,
				{
					password: data.password,
				},
				{
					headers: {
						crossDomain: true,
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				if (response.data.auth === true) {
					setAuthenticated(true);
					history.push('/');
				} else {
					//error mesage

					setAuthenticated(false);
				}
			})
			.catch((error) => {
				setAuthenticated(false);
			});
	};

	return (
		<form className='Login' onSubmit={sendLogin}>
			<span>
				<h1>🎬</h1>
			</span>
			<fieldset>
				<legend>Password</legend>
				<div className='form'>
					<input
						type='password'
						id='exampleInputPassword1'
						placeholder='Password'
						onChange={handleInputChange}
						name='password'
					/>
				</div>
				<button type='submit'>Send</button>
			</fieldset>
		</form>
	);
};

const mapDispatchToProps = {
	setAuthenticated,
};

export default connect(null, mapDispatchToProps)(Login);
