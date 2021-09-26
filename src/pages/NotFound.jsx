import React from 'react';
import Error404 from '../components/Error404';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
	const history = useHistory();
	if (!sessionStorage.getItem('authenticated')) {
		history.push('/login');
	}
	return <Error404 />;
};

export default NotFound;
