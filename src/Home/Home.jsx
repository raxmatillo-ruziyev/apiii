import React from 'react';
import './Home.scss';
import {  Outlet} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div  className='container' >
        <Navbar/>
        <Outlet/>

    </div>
  );
};

export default Home;
