import React from 'react';
import { Link } from 'react-router-dom';
import friends from '../images/friends.png';
import news from '../images/news.png';
import marketplace from '../images/marketplace.png';
import member_2 from '../images/member-2.png';
import '../css/settings.css'

const ProfileSettings = () => {
  return (
    <div className="container">
      <div className="sidebar-left">
        <div className="imp-links">
          <a href="/"><img src={news} alt="News" />Latest News</a>
          <a href="/friends"><img src={friends} alt="Fish find" />Friends</a>
          <Link to="/ecommerce" className="link">
            <img src={marketplace} alt="Fish Shopping" />
            Store
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="update-password-container">
          <h3>Update Password</h3>
          <form>

            <div className="form-group">
              <input type="password" placeholder="Current Password" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="New Password" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="change-password-btn">Change Password</button>
          </form>
        </div>
      </div>

      <div className="sidebar-right">
        <div className="sidebar-title">
          <h4>Friend Requests</h4>
          <a href="#">See All</a>
        </div>

        <div className="friend-request">
          <div className="left-request">
            <img src={member_2} alt="Profile Image" />
          </div>
          <div className="right-request">
            <h4>John Doe</h4>
            <p><i className="fa fa-user"></i>2 mutual friends</p>
            <button className="confirm-btn">Confirm</button>
            <button className="decline-btn">Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
