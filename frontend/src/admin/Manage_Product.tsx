import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
// import '../css/admin.css';
 import '../css/manage_admin.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Manage_Product: React.FC = () => {
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
    fetch("http://localhost:8081/product")
    .then((res) => res.json())
    .then((data) => setData(data))
    .then((err) => console.log(err));
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


  function handleDeleteItem(id: string) {
    if (window.confirm("Are you sure you want to delete this product?")) {
        // Show success Snackbar
        setSnackbarMessage('Product deleted Successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Delay the deletion
        setTimeout(() => {
            axios.delete(`http://localhost:8081/product/${id}`)
                .then((response) => {
                    console.log("response: " + response.data);
                    window.location.reload(); // Reload the page after deletion
                })
                .catch((error) => {
                    console.error("There was an error deleting the Product!", error);

                    // Show error Snackbar if deletion fails
                    setSnackbarMessage('Error deleting product!');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        }, 2000); // Delay in milliseconds (3000ms = 3 seconds)
    }
}


const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
      return;
  }
  setSnackbarOpen(false);
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

        <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust position as needed
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


        <h1 className="title1" style={{marginBottom: '20px',}}>Manage Products</h1>
        <div className="action-btn" >
                 

        <Link 
  to="/add_product" 
  className="create-btn" 
  style={{textDecoration: 'none', backgroundColor: '#28a745', fontSize: '14px' ,}}
>
  <i className="bx bx-plus-circle"></i>Create
</Link>

        <div className="container1" style={{marginBottom: '20px',}}>
             
         
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Quantity</th>
                            <th>Product Price</th>
                            <th>Product Category</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((data, key) => (
                      <tr key={key}>
                        <td>{data['id']}</td>
                        <td>{data['product_name']}</td>
                        <td>{data['product_description']}</td>
                        <td>{data['product_quantity']}</td>
                        <td>{data['product_price']}</td>
                        <td>{data['category_name']}</td>
                        <td>
                          <img 
                            src={`http://localhost:8081/uploads/${data['image']}`} 
                            alt="Admin" 
                            className="admin-image"
                            style={{ width: '80px', height: 'auto' }}
                          />
                        </td>
                        <td>{data['status']}</td>
                        <td style={{ width: '15%' }}>
                          <Link 
                            to={`/edit_product/${data['id']}`}
                            className="edit-btn" 
                            style={{ textDecoration: 'none' }}
                          >
                            <i className="bx bx-edit"></i>Edit
                          </Link>

                          <a 
    href="#" // Change to "#" to prevent navigation
    className='delete-btn' 
    style={{ textDecoration: 'none' }} 
    onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        handleDeleteItem(data['id']);
    }}
>
    <i className="bx bx-trash"></i>Delete
</a>
                        </td>
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

export default Manage_Product;
