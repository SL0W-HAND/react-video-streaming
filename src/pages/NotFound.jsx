import React from 'react';
import Error404 from '../components/Error404';
import Navbar from '../components/Navbar';

const NotFound = () => {
	return (
		<div className='Layout'>
			<Navbar />
			<Error404 />
		</div>
	);
};

export default NotFound;
