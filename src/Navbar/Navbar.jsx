import React from 'react'
import './Navbar.scss'
import { Link, Outlet } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
       <div className="navbar">
        <div className="container">
        <ul className="navbar-list">
        <li className='navbar-item'><Link className='nav-link' to={'/model'}>Model</Link></li>
          <li className='navbar-item'><Link className='nav-link' to={'/caregory'}>Category</Link></li>
          <li className='navbar-item'><Link className='nav-link' to={'/brend'}>Brend</Link></li>
          <li className='navbar-item'><Link className='nav-link' to={'/city'}>City</Link></li>
          <li className='navbar-item'><Link className='nav-link' to={'/car'}>Cars</Link></li>
          <li className='navbar-item'><Link className='nav-link' to={'/loc'}>Location</Link></li>
      </ul>
        </div>
       </div>
    
    </>
  )
}

export default Navbar
