import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
 import '../css/admin.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Sidebar from '../admin/Sidebar'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard: React.FC = () => {
    const [sidebarHidden, setSidebarHidden] = useState<boolean>(false);
    const [profileDropdownVisible, setProfileDropdownVisible] = useState<boolean>(false);
    const [menuDropdownVisible, setMenuDropdownVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (profileDropdownVisible && !target.closest('.profile')) {
        setProfileDropdownVisible(false);
      }
      Object.keys(menuDropdownVisible).forEach(key => {
        if (menuDropdownVisible[key] && !target.closest(`.menu[data-key="${key}"]`)) {
          setMenuDropdownVisible(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profileDropdownVisible, menuDropdownVisible]);

  const chartDataPosts: ChartData<'line'> = {
    labels: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z"
    ],
    datasets: [
      {
        label: 'Series 1',
        data: [31, 40, 28, 51, 42, 109, 100],
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
      },
      {
        label: 'Series 2',
        data: [11, 32, 45, 32, 34, 52, 41],
        borderColor: '#33C1FF',
        backgroundColor: 'rgba(51, 193, 255, 0.2)',
        fill: true,
      }
    ]
  };
  
  const chartOptionsPosts: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'dd/MM/yy HH:mm'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };
  
  const chartDataRevenue: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Series 1',
        data: [1200, 1500, 1700, 1600, 1800, 1900, 2200, 2100, 2000, 2300, 2500, 2400],
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
      },
      {
        label: 'Series 2',
        data: [900, 1100, 1300, 1200, 1400, 1500, 1700, 1600, 1500, 1800, 1900, 1700],
        borderColor: '#33C1FF',
        backgroundColor: 'rgba(51, 193, 255, 0.2)',
        fill: true,
      }
    ]
  };
  
  const chartOptionsRevenue: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cash Value'
        }
      }
    }
  };
  
  const chartComparisonProducts: ChartData<'bar'> = {
    labels: ['Betta Splenders', 'Guppy', 'Gold Fish', 'Mud Fish'],
    datasets: [
      {
        label: 'Count',
        data: [234, 1500, 300, 400],
        backgroundColor: ['#33C1FF', '#FF5733'],
        borderColor: ['#33C1FF', '#FF5733'],
        borderWidth: 1
      }
    ]
  };
  
  const chartComparisonOptionsProducts: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Products'
        },
        stacked: true,
      },
      y: {
        title: {
          display: true,
          text: 'Count'
        },
        stacked: true,
      }
    }
  };


  const [adminProfile, setAdminProfile] = useState<{ image: string; first_name: string; last_name: string } | null>(null);


  useEffect(() => {
      const adminId = localStorage.getItem('admin_id'); // Retrieve the admin ID from local storage
  
      if (adminId) {
          // Fetch admin profile data using the updated endpoint
          fetch(`http://localhost:8081/admin/${adminId}`) // Adjusted endpoint to fetch by ID
              .then(res => {
                  if (!res.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return res.json();
              })
              .then(data => setAdminProfile(data[0] || null)) // Assuming the response is an array
              .catch(err => console.log(err));
      } else {
          console.log("Admin ID not found in local storage");
      }
  }, []);
  

  return (
    <div>
      <section id="sidebar" className={sidebarHidden ? 'hide' : ''}>
        <img 
          src={logo} 
          alt="Logo" 
          className="logo" 
          style={{
            height: 'auto',
            width: '90%',
            verticalAlign: 'middle',
            margin: '0 auto',
            display: 'flex'
          }} 
        />
       
       <Sidebar/>
      </section>

      <section id="content">
        <nav>
        <i
            className='bx bx-menu toggle-sidebar'
            onClick={() => setSidebarHidden(prev => !prev)}
          ></i>
          <span className="divider"></span>
          <div className="profile" style={{ marginLeft: '94%', position: 'absolute' }}>
            {adminProfile && ( // Ensure adminProfile is not null
              <>
                <img
                  src={`http://localhost:8081/uploads/${adminProfile.image}`} // Use dynamic image
                  alt="Profile"
                  onClick={() => setProfileDropdownVisible(prev => !prev)}
                />
                <ul className={`profile-link ${profileDropdownVisible ? 'show' : ''}`} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                  <li style={{ marginBottom: '5px', marginLeft: '15px', marginTop: '20px' }}>
                    <h1 style={{ fontSize: '12px', margin: 0 }}>Welcome: {adminProfile.first_name}</h1>
                  </li>
                  <li style={{ marginBottom: '5px' }}>
                    <Link to="/admin_profile" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                      <i className='bx bxs-user-circle ' style={{ marginRight: '5px' }}></i> Profile
                    </Link>
                  </li>
                  <li>
                    <a href="#" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                      <i className='bx bxs-log-out-circle' style={{ marginRight: '5px' }}></i> Logout
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        </nav>

        <main>
          <h1>Dashboard</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Home</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Dashboard</a></li>
          </ul>
          <div className="info-data">
            <div className="card">
              <div className="head">
                <div>
                  <h2>1500</h2>
                  <p>No of Users</p>
                </div>
                <i className='bx bx-user icon'></i>
              </div>
            </div>
            <div className="card">
					<div className="head">
						<div>
							<h2>1500</h2>
							<p>No of Products</p>
						</div>
						<i className='bx bx-store-alt icon'></i>
					</div>
				</div>
				<div className="card">
					<div className="head">
						<div>
							<h2>234</h2>
							<p>No of Orders</p>
						</div>
						<i className='bx bx-shopping-bag icon down'></i>
					</div>
				</div>
				<div className="card">
					<div className="head">
						<div>
							<h2>465</h2>
							<p>No of Categories</p>
						</div>
						<i className='bx bx-category icon'></i>
					</div>
				</div>
            
          </div>

          <div className="data">
  <div className="content-data">
    <div className="chart">
      <Line data={chartDataPosts} options={chartOptionsPosts} />
    </div>
    <h3 style={{ textAlign: 'center', fontSize: '16px', paddingTop: '3%' }}>Monthly counts of Post</h3>
  </div>

  <div className="content-data">
    <div className="chart">
      <Line data={chartDataRevenue} options={chartOptionsRevenue} />
    </div>
    <h3 style={{ textAlign: 'center', fontSize: '16px', paddingTop: '3%' }}>Revenue Sales Per Month</h3>
  </div>

  <div className="content-data">
    <div className="chart">
      <Bar data={chartComparisonProducts} options={chartComparisonOptionsProducts} />
    </div>
    <h3 style={{ textAlign: 'center', fontSize: '16px', paddingTop: '3%' }}>Highest Products Sales Per Month</h3>
  </div>
</div>


        </main>
      </section>
    </div>
  );
}

export default Dashboard;
