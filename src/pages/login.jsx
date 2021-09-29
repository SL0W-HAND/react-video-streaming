import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//libraries
import axios from 'axios';
import ipServer from '../ipConfig';

const Login = () => {
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

		axios
			.post(
				`http://${ipServer}/signin`,
				{
					password: data.password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			)
			.then((response) => {
				localStorage.setItem('authenticated', response.data.auth);
				if (response.data.auth === true) {
					history.push('/');
				} else {
					//error mesage
				}
			})
			.catch((error) => {
				localStorage.setItem('authenticated', false);
				console.log(error);
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

export default Login;
