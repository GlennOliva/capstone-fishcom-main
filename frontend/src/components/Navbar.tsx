import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Assuming you have a CSS file named style.css for styling

// Importing images
import search from '../images/search.png';
import haha from '../images/haha.png';
import comments from '../images/comments.png';
import profilePic from '../images/profile-pic.png';
import member3 from '../images/member-3.png';
import member4 from '../images/member-4.png';
import member5 from '../images/member-5.png';
import settings from '../images/setting.png';
import likeBlue from '../images/like-blue.png';
import arrow from '../images/arrow.png';
import help from '../images/help.png';
import display from '../images/display.png';
import logout from '../images/logout.png';
import logo from '../images/fish2.png';
import feedback from '../images/feedback.png';

const Navbar = () => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('theme') === 'dark');

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

  return (
    <nav className='nav1'>
      <div className="navbar-left">
        <a href="#"><img src={logo} alt="Logo" className="logo" /></a>
        <ul>
          <div className="search-box">
            <img src={search} alt="Search" />
            <input type="text" placeholder="Search" />
          </div>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-notification" onClick={handleNotificationMenuToggle}>
          <i className="fa-solid fa-bell"></i>
          <span className="notification-count">3</span>
        </div>

        <div className="navbar-user-profile online" onClick={handleSettingsMenuToggle}>
          <img src={profilePic} alt="Profile" />
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
              <img src={profilePic} alt="Profile" />
              <div>
                <p>John Nicholson</p>
                <a href="/profile">See your profile</a>
              </div>
            </div>
            <hr />
            
       
            <div className="settings-links">
              <img src={settings} alt="Settings" className="settings-icon" />
              <a href="/profile_settings">Profile settings <img src={arrow} alt="Arrow" width="10px" /></a>
            </div>
            
            <div className="settings-links">
              <img src={logout} alt="Logout" className="settings-icon" />
              <a href="/login">Logout <img src={arrow} alt="Arrow" width="10px" /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
