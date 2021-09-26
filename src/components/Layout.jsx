import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router';

const Layout = ({ children }) => {
	return (
		<div className='Layout'>
			<Navbar />
			{children}
		</div>
	);
};
export default Layout;
