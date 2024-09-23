import React, { useState, useEffect } from 'react';
import logo from '../images/logo1.png';
// import '../css/admin.css';
 import '../css/add_category.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Edit_Category: React.FC = () => {
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


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});


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


  useEffect(() => {
      fetch(`http://localhost:8081/category/${id}`)
          .then((res) => res.json())
          .then((data) => {
              console.log("data: ", data);
              if (Array.isArray(data) && data.length > 0) {
                  const categoryData = data[0];
                  setCategory(categoryData);
                  formik.setValues({
                      category_name: categoryData.category_name,
                      status: categoryData.status
                  });
              } else {
                  console.error("No category data found");
              }
          })
          .catch((err) => console.log(err));
  }, [id]);

  const formik = useFormik({
      initialValues: {
          category_name: '',
          status: ''
      },
      validationSchema: Yup.object({
          category_name: Yup.string().required('Category Name is required'),
          status: Yup.string().required('Status is required'),
      }),
      onSubmit: (values) => {
          const formData = new FormData();
          formData.append('category_name', values.category_name);
          formData.append('status', values.status);

          fetch(`http://localhost:8081/edit_category/${id}`, {
              method: 'PUT',
              body: formData,
          })
              .then((res) => res.json())
              .then((data) => {
                  console.log(data);
                  setSnackbarMessage('Category details updated successfully.');
                  setSnackbarSeverity('success');
                  setOpenSnackbar(true);

                  setTimeout(() => {
                      navigate('/manage_category');
                  }, 2000);
              })
              .catch((err) => {
                  console.error(err);
                  setSnackbarMessage('Error updating category details.');
                  setSnackbarSeverity('error');
                  setOpenSnackbar(true);
              });
      }
  });

  const handleSnackbarClose = () => {
      setOpenSnackbar(false);
  };

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
        <h1 className="title1" style={{marginBottom: '20px',}}>Edit Category</h1>

        <Snackbar 
    open={openSnackbar} 
    autoHideDuration={2000}
    onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning
>
<Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
                    {snackbarMessage}
                </Alert>
</Snackbar>



        <div className="form-container1"> 
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="category_name">Category Name</label>
                        <input
                            type="text"
                            id="category_name"
                            name="category_name"
                            placeholder="Enter Category Name"
                            className="input-field"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category_name}
                        />
                        {formik.touched.category_name && formik.errors.category_name ? (
                            <div className="error-message">{formik.errors.category_name}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            placeholder="Enter Status"
                            className="text-input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                        />
                        {formik.touched.status && formik.errors.status ? (
                            <div className="error-message">{formik.errors.status}</div>
                        ) : null}
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

export default Edit_Category;
