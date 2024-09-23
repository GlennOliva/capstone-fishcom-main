import '../css/styles.css'; // Import your CSS for styling
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import logo from '../images/logo1.png'
const Navbar: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  useEffect(() => {


    // Handle hamburger menu
    const hamburger = document.querySelector(".hamburger") as HTMLDivElement | null;
    const navList = document.querySelector(".nav-list") as HTMLUListElement | null;

    if (hamburger && navList) {
      const handleHamburgerClick = () => {
        navList.classList.toggle("open");
      };
      hamburger.addEventListener("click", handleHamburgerClick);

      // Cleanup
      return () => {
        hamburger.removeEventListener("click", handleHamburgerClick);
      };
    }

    // Handle popup
    const popup = document.querySelector(".popup") as HTMLDivElement | null;
    const closePopup = document.querySelector(".popup-close") as HTMLButtonElement | null;

    if (popup && closePopup) {
      const handleClosePopupClick = () => {
        popup.classList.add("hide-popup");
      };

      closePopup.addEventListener("click", handleClosePopupClick);

      window.addEventListener("load", () => {
        setTimeout(() => {
          popup.classList.remove("hide-popup");
        }, 1000);
      });

      // Cleanup
      return () => {
        closePopup.removeEventListener("click", handleClosePopupClick);
      };
    }

  }, []);

  return (
    <header className="header" id="header">
      <div className="navigation">
        <div className="nav-center container1 d-flex">
          <img src={logo} className="logo" alt="logo" />

          <ul className="nav-list d-flex">
            <li className="nav-item">
              <Link to="/ecommerce" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className="nav-link">Shop</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Social</Link>
            </li>
            <li className="nav-item">
              <Link to="/fish_identify" className="nav-link">Fish Identification</Link>
            </li>

            <li className="nav-item">
              <Link to="/orders" className="nav-link">Orders</Link>
            </li>
          </ul>

          <div className="icons d-flex">
            <div className="icon">
              <i className="bx bx-search"></i>
            </div>
            <Link to="/cart" className="icon">
              <i className="bx bx-cart"></i>
              <span className="d-flex">0</span>
            </Link>
            <div className="icon user-icon" onClick={togglePopup}>
              <i className="bx bx-user"></i>
            </div>

            {isPopupVisible && (
              <div className="user-popup">
                <p>Welcome, Glenn</p>
                <Link to="/profile" className="popup-link">Profile</Link>
                <Link to="/login" className="popup-link">Logout</Link>
              </div>
            )}
          </div>

          <div className="hamburger">
            <i className="bx bx-menu-alt-left"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
