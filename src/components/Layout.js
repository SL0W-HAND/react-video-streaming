import React from 'react';
import Navbar from './Navbar';

const Layout = ({children}) => (
    <div className='Layout'>
        <Navbar/>
        {children}
    </div>
);


export default Layout;