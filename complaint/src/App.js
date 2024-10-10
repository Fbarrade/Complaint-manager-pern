import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/pages/Home';
import NavBar from './components/inc/Navbar';
import ContactUs from './components/pages/ContactUs';
import About from './components/pages/About';
import { BrowserRouter as Router ,Routes,Route,Navigate,Outlet} from 'react-router-dom';
import Services from './components/pages/Services';
import Footer from './components/inc/footer';
import Slider from './components/inc/Slider';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Login/register';
import Dashboard from './components/pages/Dashboard';
import { useSelector } from 'react-redux'
import Complaints from './components/pages/complaints';
import AddComplaint from './components/pages/AddComplaint';
import EditComplaint from './components/pages/EditComplaint';
const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/Login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/Dashboard' />}</>
}
function App() {

  return (
    <Router>
      <div>
      <div class="container-fluid bg-dark px-6 d-none d-lg-block">
        <div class="row gx-1">
            <div class="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                <div class="d-inline-flex align-items-center" height='45px'>
                    <small class="me-3 text-light"><i class="fa fa-map-marker-alt me-2"></i> Fdala business Center,Mohammedia, Morocco</small>
                    <small class="me-3 text-light"><i class="fa fa-phone-alt me-2">+212666666</i></small>
                    <small class="text-light"><i class="fa fa-envelope-open me-2"></i>noofit.3s.ma</small>
                </div>
            </div>
            <div class="col-lg-4 text-center text-lg-end">
             
            </div>
        </div>
    </div>
      <div class="container-fluid position-relative p-0">
        
        <NavBar  />
        
        </div>
        <div class="modal fade" id="searchModal" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content" style={{backgroundColor:"rgba(9, 30, 62, .7)"}}>
                <div class="modal-header border-0">
                    <button type="button" class="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex align-items-center justify-content-center">
                    <div class="input-group" max-width="600px;">
                        <input type="text" class="form-control bg-transparent border-primary p-3" placeholder="Type search keyword"/>
                        <button class="btn btn-primary px-4"><i class="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path='/AddComplaint' element={<AddComplaint/>}/>
          <Route path="/editComplaint/:complaintId" element={<EditComplaint />} />
          <Route element={<PrivateRoutes />}>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/complaints' element={<Complaints />} />
          
        </Route>

        <Route element={<RestrictedRoutes />}>
        <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          
        </Route>
         
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
export default App