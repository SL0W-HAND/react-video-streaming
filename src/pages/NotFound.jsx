import React from 'react';
import { useHistory } from 'react-router-dom';
import Error404 from '../components/Error404';

const NotFound = () => {
	const history = useHistory();
	if (!sessionStorage.getItem('authenticated')) {
		history.push('/login');
	}
	return <Error404 />;
};

export default NotFound;
