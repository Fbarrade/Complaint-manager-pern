import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Make sure to import Provider
import App from './App';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'animate.css/animate.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'wowjs/dist/wow.min.js';
import 'jquery.easing/jquery.easing.min.js';
import 'waypoints/lib/jquery.waypoints.min.js';
import 'counterup/jquery.counterup.min.js';
import 'owl.carousel/dist/owl.carousel.min.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

// ... the rest of your code ...

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
