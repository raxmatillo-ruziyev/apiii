// import React from 'react'
// import './App.css'
// import { Route, Routes } from 'react-router-dom'
// import Login from './Login/Login'
// import Home from './Home/Home'
// import Brend from './Brend/Brend'
// import Category from './Category/Category'
// import City from './City/City'
// import Model from './Model/Model'
// import Cars from './Cars/Cars'
// import Location from './Location/Location'
// const App = () => {
//   return (
//     <>
   
//       <Routes>
//         <Route exact path='/login' element={<Login/>}/>
//         <Route path='/' element={<Home/>}>
//           <Route path='/brend' element={<Brend/>}/>
//           <Route path='/model' element={<Model/>}/>
//           <Route path='/caregory' element={<Category/>}/>
//           <Route path='/city' element={<City/>}/>
//           <Route path='/car' element={<Cars/>}/>
//           <Route path='/loc' element={<Location/>}/>
//         </Route>
//       </Routes>
//     </>
//   )
// }

// export default App
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './Home/Home';
import Brend from './Brend/Brend';
import Category from './Category/Category';
import City from './City/City';
import Model from './Model/Model';
import Cars from './Cars/Cars';
import Location from './Location/Location';
import { AuthProvider } from './Login/ AuthContext';
import PrivateRoute from './Login/PrivateRoute';
import Login from './Login/Login';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <AuthProvider>
       <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<PrivateRoute element={<Home />} />}>
            <Route path="brend" element={<Brend />} />
            <Route path="model" element={<Model />} />
            <Route path="caregory" element={<Category />} />
            <Route path="city" element={<City />} />
            <Route path="car" element={<Cars />} />
            <Route path="loc" element={<Location />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
};

export default App;
