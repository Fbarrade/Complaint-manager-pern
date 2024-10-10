import React from "react";
import { useEffect,useState} from "react";
import {Link} from 'react-router-dom'
import Voitheia from '../images/Voitheia.png'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo,onLogout } from '../../api/auth'
import { unauthenticateUser } from '../../redux/slices/authSlice'
function NavBar(){
  const { isAuth } = useSelector((state) => state.auth);
  const loginText = isAuth ? "Log Out" : "Login";
  const loginLink = isAuth ? "/Login" : "/Login";
  const dispatch = useDispatch()
  const [scrolled, setScrolled] = useState(false);
  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
return(
        <nav class="navbar navbar-expand-lg navbar-dark px-5 py-3 py-lg-0">
            <Link to="/Home" class="navbar-brand p-0">
                <h1 class="m-0">  Voitheia</h1>
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto py-0">
                    <Link to="/Home" class="nav-item nav-link active">Home</Link>
                    <Link to='/About' class="nav-item nav-link">About</Link>
                    <Link to="/Services" class="nav-item nav-link">Services</Link>
                    
                    <Link to="/ContactUs" class="nav-item nav-link">Contact</Link>
                </div>
                <butaton type="button" class="btn text-primary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fa fa-search"></i></butaton>
                <Link  onClick={() => logout()}  to={loginLink} class="btn btn-primary py-2 px-4 ms-3" style ={{color:"blue",backgroundColor:'#fff'}}>{loginText}</Link>
            </div>
        </nav>

        /*<nav class="navbar navbar-expand-lg flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-0 border-bottom" style={{ backgroundColor: "#FFFFFF", marginBottom:"0px" }}>
          <div class="container">
          <div class="logo">
       
        <Link class="navbar-brand ms-5" to="/Home">Voitheia Services</Link>
      </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul class="navbar-nav mb-4 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" to="/Home">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to="/About">About</Link>
                </li>
                <li class="nav-item dropdown">
                  <Link class="nav-link dropdown-toggle" to="/Services" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Services
                  </Link>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" to="/">Action</a></li>
                    <li><a class="dropdown-item" to="/">Another action</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" to="/">Something else here</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to="/ContactUs">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div class="col-md-3 text-end">
              <button type="button" class="btn btn-outline-primary me-2">Login</button>
              <button type="button" class="btn btn-primary">Sign-up</button>
            </div>
          </div>
        </nav>
*/
       
      
     
    );
}
export default NavBar;