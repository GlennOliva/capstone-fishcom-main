import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Assuming you have a CSS file named style.css for styling

// Importing images
import search from '../images/search.png';
import haha from '../images/haha.png';
import comments from '../images/comments.png';

import member3 from '../images/member-3.png';
import member4 from '../images/member-4.png';
import member5 from '../images/member-5.png';
import settings from '../images/setting.png';
import likeBlue from '../images/like-blue.png';
import arrow from '../images/arrow.png';

import logout from '../images/logout.png';
import logo from '../images/fish2.png';

import { Link,  useNavigate } from 'react-router-dom';
import Search from './Search';


const Navbar = () => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('theme') === 'dark');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

  const history = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    
    // Navigate to the login page
    history('/login');
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  const handleSettingsMenuToggle = () => {
    setSettingsMenuOpen(prev => !prev);
    if (notificationMenuOpen) setNotificationMenuOpen(false);
  };
  
  const handleNotificationMenuToggle = () => {
    setNotificationMenuOpen(prev => {
      console.log('Notification Menu Toggle:', !prev);
      return !prev;
    });
    if (settingsMenuOpen) setSettingsMenuOpen(false);
  };

  const handleDarkThemeToggle = () => {
    setDarkTheme(prev => !prev);
  };

  const [userProfile, setUserProfile] = useState<{ image: string; first_name: string; last_name: string; id:number; } | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id'); // Retrieve the admin ID from local storage

    if (userId) {
      fetch(`http://localhost:8081/user/${userId}`) // Adjusted endpoint to fetch by ID
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => setUserProfile(data[0] || null)) // Assuming the response is an array
        .catch(err => console.log(err));
    } else {
      console.log("User ID not found in local storage");
    }
  }, []);

 


  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev); // Toggle sidebar visibility
  };

  return (
    <nav className='nav1'>
      <div className="navbar-left">
        <a href="#"><img src={logo} alt="Logo" className="logo" /></a>
        {/* <div className="hamburger" style={{marginRight: '10%'}} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div> */}
        <ul>
         <Search/>
        </ul>
      </div>
      <div className="navbar-right">
   

        <div className="navbar-notification" onClick={handleNotificationMenuToggle}>
          <i className="fa-solid fa-bell"></i>
          <span className="notification-count">3</span>
        </div>

        <div className="navbar-user-profile online" onClick={handleSettingsMenuToggle}>
          {userProfile?.image ? (
            <img
              src={`http://localhost:8081/uploads/${userProfile.image}`} // Use dynamic image
              alt="Profile"
            />
          ) : (
            <img
              src="/path/to/default/profile/image.png" // Fallback image if userProfile.image is not available
              alt="Default Profile"
            />
          )}
        </div>
      </div>

      {notificationMenuOpen && (
        <div className="notification-menu">
          <div className="notification-item">
            <img src={member3} alt="User Profile" className="notification-profile-pic" />
            <div className="notification-content">
              <img src={haha} alt="Reaction" className="notification-reaction" />
              <p><strong>Glenn</strong> reacted to your shared post! <span className="notification-time">2 mins ago</span></p>
            </div>
          </div>
          <div className="notification-item">
            <img src={member4} alt="User Profile" className="notification-profile-pic" />
            <div className="notification-content">
              <img src={likeBlue} alt="Reaction" className="notification-reaction" />
              <p><strong>John</strong> liked your post. <span className="notification-time">10 mins ago</span></p>
            </div>
          </div>
          <div className="notification-item">
            <img src={member5} alt="User Profile" className="notification-profile-pic" />
            <div className="notification-content">
              <img src={comments} alt="Reaction" className="notification-reaction" />
              <p><strong>Mary</strong> commented on your photo. <span className="notification-time">30 mins ago</span></p>
            </div>
          </div>
          <a href="#" className="see-all">See All Notifications</a>
        </div>
      )}

      {settingsMenuOpen && (
        <div className="setting-menu setting-menu-height">
          <div className="setting-menu-inner">
            <div className="user-profile">
              {userProfile?.image ? (
                <img
                  src={`http://localhost:8081/uploads/${userProfile.image}`} // Use dynamic image
                  alt="Profile"
                />
              ) : (
                <img
                  src="/path/to/default/profile/image.png" // Fallback image if userProfile.image is not available
                  alt="Default Profile"
                />
              )}
              <div>
                <p>Hi: {userProfile?.first_name}</p>
                <a href="/profile">See your profile</a>
              </div>
            </div>
            <hr />
            <div className="settings-links">
              <img src={settings} alt="Settings" className="settings-icon" />
              <Link to={`/profile_settings/${userProfile?.id}`} style={{ textDecoration: 'none' }}>
    Profile settings 
</Link>

            </div>
            <div className="settings-links" onClick={handleLogout} style={{ cursor: 'pointer' }}>
      <img src={logout} alt="Logout" className="settings-icon" />
      Logout 
    </div>
          </div>
        </div>
      )}



    </nav>
  );
};

export default Navbar;
