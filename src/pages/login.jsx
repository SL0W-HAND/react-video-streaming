import React, { useState } from 'react';
import axios from 'axios';
import ipServer from '../ipConfig';
import { useHistory } from 'react-router-dom';

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
				if (response.data.auth == true) {
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
			<fieldset>
				<legend>Enter the password</legend>
				<div className='form-group'>
					<input
						type='password'
						className='form-control'
						id='exampleInputPassword1'
						placeholder='Password'
						onChange={handleInputChange}
						name='password'
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Send
				</button>
			</fieldset>
		</form>
	);
};

export default Login;
