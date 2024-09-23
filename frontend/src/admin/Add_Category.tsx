import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
import '../css/add_category.css'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Add_Category: React.FC = () => {
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState<boolean>(false);
  const [menuDropdownVisible, setMenuDropdownVisible] = useState<Record<string, boolean>>({});
  const [adminId, setAdminId] = useState<number | null>(null); // State to hold admin_id

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

  useEffect(() => {
    // You can fetch the admin_id here, either from a session, token, or API.
    // Example: Fetch admin_id from a stored session or API
    const fetchAdminId = () => {
      // Fetch or calculate the admin_id
      const storedAdminId = localStorage.getItem('admin_id'); // Assume you're storing admin_id in localStorage or session
      if (storedAdminId) {
        setAdminId(Number(storedAdminId)); // Set admin_id to state
      }
    };
    fetchAdminId();
  }, []);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      categoryName: ''
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Category Name is required'),
    }),
    onSubmit: (values) => {
      if (!adminId) {
        setSnackbarMessage('Admin ID is missing');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }
  
      fetch('http://localhost:8081/add_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_name: values.categoryName, admin_id: adminId }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSnackbarMessage('Category Successfully Created!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/manage_category');
        }, 2000);
      })
      .catch((error) => {
        setSnackbarMessage('Failed to create category');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        console.log(error);
      });
    }
  });
  

  const handleSnackbarClose = () => {
      setOpenSnackbar(false);
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
        <Sidebar />
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
            open={openSnackbar} 
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
              {snackbarMessage}
            </Alert>
          </Snackbar>
  
          <h1 className="title1" style={{marginBottom: '20px',}}>Add Category</h1>

          <div className="form-container1">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"  
                  placeholder="Enter Category Name"
                  className="text-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryName}  
                />
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <div className="error-message" style={{color: 'red', fontSize: '12px'}}>{formik.errors.categoryName}</div>
                ) : null}
              </div>

              <div className="form-group">
                <button type="submit" className="create-btn">Create</button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Add_Category;
