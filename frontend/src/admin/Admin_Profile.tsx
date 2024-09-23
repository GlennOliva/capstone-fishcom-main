import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
// import '../css/admin.css';
import '../css/admin_profile.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';



const Admin_Profile: React.FC = () =>{
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
  <h1>Update Profile</h1>
  <div className="container2">
    <form action="#" method="POST" className="profile-form">
    <div className="row">
        <div className="column left">
            <div className="image-section">
                <label htmlFor="current-image" className="form-label">Current Image:</label>
                <div className="image-placeholder"></div>
            </div>
            <label htmlFor="first-name" className="form-label">First Name:</label>
            <input type="text" id="first-name" name="first-name" placeholder="Enter First Name" required className="text-input" />

            <label htmlFor="email" className="form-label">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="Enter Email Address" required className="email-input" />

            <label htmlFor="birthdate" className="form-label">Birthdate:</label>
            <input type="date" id="birthdate" name="birthdate" required className="date-input" />
        </div>

        {/* Right Column */}
        <div className="column right">
            <label htmlFor="new-image" className="form-label">New Image:</label>
            <input type="file" id="new-image" name="new-image" className="file-input" />

            <label htmlFor="last-name" className="form-label">Last Name:</label>
            <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name" required className="text-input" />

            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter Password" required className="password-input" />

            <label htmlFor="gender" className="form-label">Gender:</label>
            <select id="gender" name="gender" required className="select-input">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
    </div>
      <button type="submit" className="update-btn">Update Profile</button>
    </form>
  </div>
</main>

        </section>
      </div>
    );
}

export default Admin_Profile