import React from 'react';
import './Home.scss';
import {  Outlet} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div  className='container'>
      <div className="boxcha">
         <Navbar/>
      </div>

    </div>
  );
};

export default Home;
