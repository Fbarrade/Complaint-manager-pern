import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProtectedInfo, onLogout } from '../../api/auth';
import { unauthenticateUser } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import '../../App.css'
import {onGet } from '../../api/comp';
import 'chartjs-plugin-datalabels';

import moment from 'moment';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [charts, setCharts] = useState({}); // Use an object to store all chart instances
  const [chartData, setChartData] = useState([]); // State to store complaint data

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };
  const fetchComplaints = async () => {
    try {
      const response = await onGet();
      setChartData(response.data.complaints); // Set the fetched complaint data
      renderCharts(response.data.complaints); // Render charts using the fetched data
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderCharts = (complaintData) => {
    // Create and store the bar chart instance
    const ctx1 = document.getElementById('complaintsChart');
    const barChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Resolved', 'Pending', 'Open'],
        datasets: [
          {
            label: 'Complaints',
            data: [
              complaintData.filter((item) => item.status === 'Closed').length,
              complaintData.filter((item) => item.status === 'Pending Customer Response').length,
              complaintData.filter((item) => item.status === 'Open').length,
            ],
            backgroundColor: ['blue', 'gray', 'black'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 100,
        height: 400,
      },
    })
    const ctx2 = document.getElementById('AgeChart');
    const barChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Refund Request', 'Billing inquiry', 'Product inquiry','Cancellation request','Technical issue'],
        datasets: [
          {
            label: 'Complaints',
            data: [
              complaintData.filter((item) => item.category === 'Refund request').length,
              complaintData.filter((item) => item.category === 'Billing inquiry').length,
              complaintData.filter((item) => item.category === 'Product inquiry').length,
              complaintData.filter((item) => item.category === 'Cancellation request').length,
              complaintData.filter((item) => item.category === 'Technical issue').length,
            ],
            backgroundColor: ['blue', 'gray', 'black',"orange","green"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 100,
        height: 400,
      },
    })
    const ctx3= document.getElementById('pieChart');
    const pieChart = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels:['Refund Request', 'Billing inquiry', 'Product inquiry','Cancellation request','Technical issue'],
        datasets: [
          {
            data: [
              complaintData.filter((item) => item.category === 'Refund request').length,
              complaintData.filter((item) => item.category === 'Billing inquiry').length,
              complaintData.filter((item) => item.category === 'Product inquiry').length,
              complaintData.filter((item) => item.category === 'Cancellation request').length,
              complaintData.filter((item) => item.category === 'Technical issue').length,
            ],
            backgroundColor: [
              '#FF5733',
              '#FFC300',
              '#C70039',
              '#900C3F',
              '#581845',
              '#3498DB',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow chart to have custom dimensions
        // Set the dimensions of the chart here
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              const dataset = context.dataset.data;
              const total = dataset.reduce((acc, val) => acc + val);
              const percentage = ((value / total) * 100).toFixed(2);
              return percentage + '%';
            },
            color: '#000', // Customize the font color of the labels
          },
        },
        width: 100,
        height: 100,
      }
    });
    const ctx4= document.getElementById('PriorityChart');
    const pieChart2= new Chart(ctx4, {
      type: 'pie',
      data: {
        labels:['Critical', 'Low', 'High','Medium'],
        datasets: [
          {
            data: [
              complaintData.filter((item) => item.priority === 'Critical').length,
              complaintData.filter((item) => item.priority === 'Low').length,
              complaintData.filter((item) => item.priority === 'High').length,
              complaintData.filter((item) => item.priority=== 'Medium').length,
           
            ],
            backgroundColor: [
              'black',
              'blue',
              'green',
              'orange',
              
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow chart to have custom dimensions
        // Set the dimensions of the chart here
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              const dataset = context.dataset.data;
              const total = dataset.reduce((acc, val) => acc + val);
              const percentage = ((value / total) * 100).toFixed(2);
              return percentage + '%';
            },
            color: '#000', // Customize the font color of the labels
          },
        },
        width: 100,
        height: 100,
      }
    });
    const ctx5 = document.getElementById('PriorityBarChart');
    const barChar3 = new Chart(ctx5, {
      type: 'bar',
      data: {
        labels: ['Critical', 'Low', 'High','Medium'],
        datasets: [
          {
            label: 'Complaints',
            data: [complaintData.filter((item) => item.priority === 'Critical').length,
            complaintData.filter((item) => item.priority === 'Low').length,
            complaintData.filter((item) => item.priority === 'High').length,
            complaintData.filter((item) => item.priority=== 'Medium').length,
              
            ],
            backgroundColor: ['blue', 'gray', 'black','green'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 100,
        height: 400,
      },
    });
    const productCounts = {};
complaintData.forEach(item => {
  if (!productCounts[item.product]) {
    productCounts[item.product] = 1;
  } else {
    productCounts[item.product]++;
  }
});

const productLabels = Object.keys(productCounts);
const productValues = Object.values(productCounts);
    const ctx6 = document.getElementById('productTreeChart').getContext('2d');;
    const TreeChart = new Chart(ctx6, {
      type: 'bar',
      data: {
        labels:productLabels,
        datasets: [
          {
            label: 'Complaints',
            data: productCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true, // Nesting the bars
          },
          y: {
            beginAtZero: true,
          },
        },
        width: 100,
        height: 400,
      },
    })
    const SubjectCounts = {};
complaintData.forEach(item => {
  if (!SubjectCounts[item.subject]) {
    SubjectCounts[item.subject] = 1;
  } else {
    SubjectCounts[item.subject]++;
  }
});
const SubjectLabels = Object.keys(SubjectCounts);
const SubjectValues = Object.values(SubjectCounts);
const ctx7 = document.getElementById('SubjectTreeChart').getContext('2d');;
    const TreeChart2 = new Chart(ctx7, {
      type: 'bar',
      data: {
        labels:SubjectLabels,
        datasets: [
          {
            label: 'Complaints',
            data: SubjectCounts,
            backgroundColor: 'rgba(54, 200, 235, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true, // Nesting the bars
          },
          y: {
            beginAtZero: true,
          },
        },
        width: 100,
        height: 400,
      },
    })
const ctx8 = document.getElementById('lineChart').getContext('2d');

const ratings = complaintData.map(item => item.rating);
const filteredRatings = ratings.filter(rating => !isNaN(rating));

// Configure Moment.js as the date adapter
Chart.register({
  adapters: {
    date: {
      id: 'moment',
      formats: {
        datetime: 'YYYY-MM-DD HH:mm:ss', // Match your date format here
      },
    },
  },
});

const lineChart = new Chart(ctx8, {
  type: 'line',
  data: {
    labels: complaintData.map(item => moment(item.date_time)),
    datasets: [
      {
        label: 'Customer Satisfaction Rating',
        data: filteredRatings,
        borderColor: 'blue',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 10,
      },
    },
  },
});
    setCharts({ ...charts, barChart,barChart2,pieChart,pieChart2,barChar3,TreeChart,TreeChart2,lineChart});
  };
 
  useEffect(() => {
    protectedInfo();
    fetchComplaints();

    // // Create and store the bar chart instance
    // const ctx1 = document.getElementById('complaintsChart');
    // const barChart = new Chart(ctx1, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Resolved', 'Pending', 'Open'],
    //     datasets: [
    //       {
    //         label: 'Complaints',
    //         data: [10, 5, 3], // Placeholder values for testing
    //         backgroundColor: ['green', 'yellow', 'red'],
    //       },
    //     ],
        
    //   },options: {
    //     responsive: true,
    //     maintainAspectRatio: false, // Allow chart to have custom dimensions
    //     // Set the dimensions of the chart here
    //     width: 100,
    //     height: 400,
    //   }
      
    // });

    // Create and store the pie chart instance
    

    // // Store both chart instances in the state
    // setCharts({ barChart, pieChart });

    // Clean up the chart instances when component unmounts
    return () => {
      if (charts.barChart) {
        charts.barChart.destroy();
      }
    };
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
        
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
							<span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
						</a>
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							<li>
								<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
									<i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
							</li>
							<li>
								<Link to="/complaints" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Complaints</span> </Link>
							</li>
							<li>
								<Link to="profile" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>
							<li >
								<a href="#" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li>
						</ul>
					</div>
				</div>
          <div className="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center shadow'>
              <h4>Complaints management system</h4>
            </div>

            <div>
            <div className="p-2">
  <canvas id="complaintsChart" width="300" height="150" className="chart-canvas"></canvas>
</div>
<div className="p-2">
  <canvas id="AgeChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>
<div className="p-2">
  <canvas id="pieChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>
<div className="p-2">
  <canvas id="PriorityChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>
<div className="p-2">
  <canvas id="PriorityBarChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>
<div className="p-2">
  <canvas id="productTreeChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>
<div className="p-2">
  <canvas id="SubjectTreeChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>
<div className="p-2">
  <canvas id="lineChart" width="300" height="150" className="chart-canvas"></canvas>
  
</div>

</div>
 

 
          </div>
        </div>
      </div>

      <button onClick={() => logout()} className='btn btn-primary'>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;