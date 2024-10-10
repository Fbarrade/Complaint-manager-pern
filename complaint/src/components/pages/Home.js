import React from "react";
import { Link } from "react-router-dom";
import Vmc from "./inc/vmc";
import prestation from '../images/prestation.png'
import poignee from "../images/poignee.jpg"
import Slider from "../inc/Slider";
function Home(){

    return(
      <div>
       <Slider/>
        <section className="section">
       <div className="container">
       <div className="row">
        <div className="col-md-12 text-center">
        <h3 className="main-heading mt-5">Our web app</h3>
        <div className="underline mx-auto" ></div>
        <p ClassName="mt-7 mb-7">
       From the moment a complaint is submitted through the intuitive interface, Voitheia assigns it a unique ticket number, categorizes it based on predefined criteria, and promptly assigns it to the appropriate personnel or department. The application facilitates seamless communication between all parties involved, enabling constant updates, additional information sharing, and dialogue for a swift resolution. Voitheia also provides valuable insights through its analytics and reporting capabilities, allowing businesses to identify trends, measure resolution times, and gauge customer satisfaction levels. By integrating seamlessly with other systems, such as CRM software and notification platforms, Voitheia ensures a cohesive and streamlined complaint management process. With Voitheia, businesses can effectively address complaints, improve customer experience, and foster higher satisfaction levels.
        </p>
        <Link to='/about' className="btn btn-warning shadow mt-3">Read more</Link>
        
        </div>
       </div>
        </div>
        </section>
        <Vmc/>
        <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="section-title text-center position-relative pb-3 mb-5 mx-auto" max-width=" 600px;">
                <h5 class="fw-bold text-primary text-uppercase">Our Services</h5>
                <h1 class="mb-0">Manage your clients complaints efficiently</h1>
            </div>
            <div class="row g-5">
                <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                    <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon">
                            <i class="fa fa-shield-alt text-white"></i>
                        </div>
                        <h4 class="mb-3">Complaint classification</h4>
                        <p class="m-0">Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
                        <a class="btn btn-lg btn-primary rounded" href="">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                    <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon">
                            <i class="fa fa-chart-pie text-white"></i>
                        </div>
                        <h4 class="mb-3">Data Analytics</h4>
                        <p class="m-0">Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
                        <a class="btn btn-lg btn-primary rounded" href="">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.9s">
                    <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon">
                            <i class="fa fa-code text-white"></i>
                        </div>
                        <h4 class="mb-3">Auto assignement</h4>
                        <p class="m-0">Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
                        <a class="btn btn-lg btn-primary rounded" href="">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                
               
                
                
            </div>
        </div>
    </div>
        <section className="section  boder-top">
       <div className="container">
       <div className="row">
        <div className="col-md-12 mb-4 text-center">
        <h3 className="main-heading">Vision,Mission and Values</h3>
        <div className="underline mx-auto"></div>
        
        </div>
        <div className="col-md  ">
        <div className="card shadow">
          <img src={prestation} className="w-100 border-bottom img-serve"   alt='services'/>
          <div className="card-body">
            <h6>Service 1</h6>
            <div className='underline'></div>
              <p>
                our service is to provide It assistance to clients complaints using AI.
         
         </p>
         <Link to='/services' className="btn btn-link">read more </Link>
         </div>
        </div>
        </div>
        <div className="col-md  ">
        <div className="card shadow">
          <img src={prestation} className="w-100 border-bottom img-serve"   alt='services'/>
          <div className="card-body">
            <h6>Service 1</h6>
            <div className='underline'></div>
              <p>
                our service is to provide It assistance to clients complaints using AI.
         
         </p>
         <Link to='/services' className="btn btn-link">read more </Link>
         </div>
        </div>
        </div>
        <div className="col-md  ">
        <div className="card shadow">
          <img src={prestation} className="w-100 border-bottom img-serve"   alt='services'/>
          <div className="card-body">
            <h6>Service 1</h6>
            <div className='underline'></div>
              <p>
                our service is to provide It assistance to clients complaints using AI.
         
         </p>
         <Link to='/services' className="btn btn-link">read more </Link>
         </div>
        </div>
        </div>
       </div>
       </div>
       /</section>
      
       </div>
    );
}
export default Home;