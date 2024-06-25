import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
