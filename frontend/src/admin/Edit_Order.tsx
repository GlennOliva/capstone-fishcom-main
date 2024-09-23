import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
// import '../css/admin.css';
 import '../css/edit_admin.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Edit_Order: React.FC = () => {
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
        <h1 className="title1" style={{marginBottom: '20px',}}>Edit Order</h1>


        <div className="form-container1"> 
    <form action="your_action_url" method="POST" encType="multipart/form-data">
       
        
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="product_name">First Name</label>
                <input type="text" id="product_name" name="first_name" placeholder="Enter First Name" className="input-field" />
            </div>
            <div className="form-group">
                <label htmlFor="product_description">Last Name</label>
                <input type="text" id="product_description" name="last_name" placeholder="Enter Last Name" className="input-field" />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="product_quantity">Product Name</label>
                <input type="text" id="product_quantity" name="product_name" placeholder="Enter Product Name" className="input-field" />
            </div>
            <div className="form-group">
                <label htmlFor="price">Product Price</label>
                <input type="number" id="price" name="price" placeholder="Enter Product Price" step="0.01" className="input-field" />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="product_quantity">Product Quantity</label>
                <input type="text" id="product_quantity" name="product_quantity" placeholder="Enter Product Quantity" className="input-field" />
            </div>
            <div className="form-group">
                <label htmlFor="category">Payment Method</label>
                <select id="category" name="category" className="input-field">
                    <option value="">Select Payment Method</option>
                    <option value="electronics">Paypal</option>
                    <option value="fashion">Cod</option>
                    <option value="home_appliances">Gcash</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
        </div>

        <div className="form-row">
        <div className="form-group">
                <label htmlFor="product_quantity">Total Price</label>
                <input type="text" id="product_quantity" name="total_price" placeholder="Enter Total Price" className="input-field" />
            </div>

            <div className="form-group">
                <label htmlFor="category">Order Status</label>
                <select id="category" name="category" className="input-field">
                    <option value="">Select Order Statuts</option>
                    <option value="electronics">Pending</option>
                    <option value="electronics">On delivery</option>
                    <option value="electronics">Cancelled</option>
                    <option value="electronics">Delivered</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
        </div>

        <div className="form-group">
            <button type="submit" className="create-btn">Edit</button>
        </div>
    </form>
</div>


          
        </main>
      </section>
    </div>
  );
}

export default Edit_Order;
