import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
// import '../css/admin.css';
// import '../css/manage_admin.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Manage_User: React.FC = () => {
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



    
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/user")
    .then((res) => res.json())
    .then((data) => setData(data))
    .then((err) => console.log(err));
  }, []);


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
                    <Link to={`/admin_profile/${localStorage.getItem('admin_id')}`} style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                        <i className='bx bxs-user-circle' style={{ marginRight: '5px' }}></i> Profile
                    </Link>
                </li>
                <li>
                  <a
                    href="#"
                    style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}
                    onClick={() => {
                      // Clear local storage
                      localStorage.clear();
                      
                      // Redirect to the login page or another account page
                      window.location.href = '/login'; // Adjust this path as necessary
                    }}
                  >
                    <i className='bx bxs-log-out-circle' style={{ marginRight: '5px' }}></i> Logout
                  </a>
                </li>
                </ul>
              </>
            )}
          </div>
          </nav>
  
          <main>
          <h1 className="title1" style={{marginBottom: '20px',}}>Manage User</h1>
          <div className="action-btn" >
                 

                 
          <div className="container1" style={{marginBottom: '20px',}}>
               
           
                  </div>
                  <table className="admin-table">
                      <thead>
                      <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birthdate</th>
                            <th>Gender</th>
                            <th>Image</th>
                            <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                    {data.map((data, key) => (
                      <tr key={key}>
                        <td>{data['id']}</td>
                        <td>{data['first_name']}</td>
                        <td>{data['last_name']}</td>
                        <td>{data['email']}</td>
                        <td>{data['birthdate']}</td>
                        <td>{data['gender']}</td>
                        <td>
                          <img 
                            src={`http://localhost:8081/uploads/${data['image']}`} 
                            alt="User" 
                            className="user-image"
                            style={{ width: '80px', height: 'auto' }}
                          />
                        </td>
                        <td>{data['status']}</td>
            
                      </tr>
                    ))}
                  </tbody>
                  </table>
              </div>
            
          </main>
        </section>
      </div>
    );
}

export default Manage_User