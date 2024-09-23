const express = require('express');
const cors = require('cors');
const db = require('../backend/dbcon');  // Import the db connection
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { request } = require('http');
const app = express();

const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Uploads folder for storing images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.get('/', (request, response) => {
    return response.json("Starting the node server..");
});




app.get('/admin', (request , response) => {
    const sql = "SELECT * FROM tbl_admin";
    db.query(sql , (error, data) => {
        if(error) return response.json(error);
        return response.json(data);
    });
});


app.get('/admin/:id', (request, response) => {
    const id = request.params.id;
    console.log("id: " + id);
    const sql = "SELECT * FROM tbl_admin WHERE id = ?";
    db.query(sql, [id], (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});


app.put('/edit_admin/:id', upload.single('image'), (request, response) => {
    const id = request.params.id;
    const { first_name, last_name, email, password, store_name, status } = request.body;
    const image = request.file ? request.file.filename : null;

    const sql = 'UPDATE tbl_admin SET first_name = ?, last_name = ?, email = ?, password = ?, store_name = ?, status = ?, image = ? WHERE id = ?';

    db.query(sql, [first_name, last_name, email, password, store_name, status, image, id], (error, result) => {
        if (error) {
            return response.status(500).json({ error: 'Error updating admin' });
        }
        response.json({ message: 'Admin Successfully Updated!' });
    });
});



app.post('/add_admin', upload.single('image'), (request, response) => {
    const { first_name, last_name, email, password, store_name, status } = request.body;
    const image = request.file ? request.file.filename : null; // Get the uploaded image file name
    
    const sql = "INSERT INTO tbl_admin (first_name, last_name, email, image, password, store_name, status) VALUES (?, ?, ?, ?, ?, ?, 'Active')";
    db.query(sql, [first_name, last_name, email, image, password, store_name, status], (error, result) => {
        if (error) {
            return response.status(500).send('Error creating admin');
        }
        response.send('Admin Successfully Created!');
    });
});

app.delete('/admin/:id', (request, response) => {
    const id = request.params.id;
    const sql = 'DELETE FROM tbl_admin WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return response.status(500).send('Error creating admin');
        }
        response.send('Admin Successfully Deleted!');
    });
});

//users crud function

app.get('/user', (request , response) => {
    const sql = "SELECT * FROM tbl_user";
    db.query(sql , (error, data) => {
        if(error) return response.json(error);
        return response.json(data);
    });
});

app.get('/user/:id', (request, response) => {
    const id = request.params.id;
    console.log("id: " + id);
    const sql = "SELECT * FROM tbl_user WHERE id = ?";
    db.query(sql, [id], (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});


app.post('/register_user', upload.single('image'), async (request, response) => {
    const { first_name, last_name, email, password, birthdate, gender } = request.body;
    const image = request.file ? request.file.filename : null;

    try {
        // Directly use the plain password (not recommended for production)
        const sql = "INSERT INTO tbl_user (first_name, last_name, email, birthdate, gender, image, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')";
        db.query(sql, [first_name, last_name, email, birthdate, gender, image, password], (error, result) => {
            if (error) {
                console.error('Database error:', error);
                return response.status(500).json({ message: 'Error creating user' }); // Return JSON response
            }
            response.json({ message: 'User Successfully Created!' });
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return response.status(500).json({ message: 'Error creating user' }); // Return JSON response
    }
});



//post content
app.get('/post', (request, response) => {
    const sql = `
        SELECT p.*, u.first_name 
        FROM tbl_post p 
        JOIN tbl_user u ON p.user_id = u.id`; // Adjust 'user_id' and 'id' to match your actual column names

    db.query(sql, (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});

app.delete('/post/:id', (request, response) => {
    const id = request.params.id;
    const sql = 'DELETE FROM tbl_post WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return response.status(500).send('Error creating post');
        }
        response.send('Post Successfully Deleted!');
    });
});


//category function
// Add a new category
app.post('/add_category', (request, response) => {
    const { category_name, admin_id } = request.body;

    console.log('Received category_name:', category_name);
    console.log('Received admin_id:', admin_id);

    const sql = "INSERT INTO tbl_category (category_name, admin_id, status) VALUES (?, ?, 'Active')";
    db.query(sql, [category_name, admin_id], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).send('Error creating category');
        }
        response.json({ message: 'Category Successfully Created!' });
    });
});



app.get('/category', (request, response) => {
    const sql = `SELECT * FROM tbl_category`; 

    db.query(sql, (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});

app.delete('/category/:id', (request, response) => {
    const id = request.params.id;
    const sql = 'DELETE FROM tbl_category WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return response.status(500).send('Error creating post');
        }
        response.send('Category Successfully Deleted!');
    });
});

app.get('/category/:id', (request, response) => {
    const id = request.params.id;
    console.log("id: " + id);
    const sql = "SELECT * FROM tbl_category WHERE id = ?";
    db.query(sql, [id], (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});


app.put('/edit_category/:id', upload.none(), (request, response) => {
    const id = request.params.id;
    const { category_name, status } = request.body;

    const sql = 'UPDATE tbl_category SET category_name = ?, status = ? WHERE id = ?';

    db.query(sql, [category_name, status, id], (error, result) => {
        if (error) {
            return response.status(500).json({ error: 'Error updating category' });
        }
        response.json({ message: 'Category Successfully Updated!' });
    });
});


//products function
app.post('/add_product', upload.single('image'), (request, response) => {
    const { admin_id, category_id, product_name, product_price, product_quantity, product_description } = request.body;
    const image = request.file ? request.file.filename : null; // Get the filename from the uploaded file

    const sql = "INSERT INTO tbl_product (admin_id, category_id, image, product_name, product_price, product_quantity, product_description, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')";

    db.query(sql, [admin_id, category_id, image, product_name, product_price, product_quantity, product_description], (error, result) => {
        if (error) {
            console.error('Error executing query:', error); // Log the error details
            return response.status(500).send('Error creating product'); // Update the error message
        }
        response.json({ message: 'Product Successfully Created!' }); // Send a JSON response
    });
});


app.get('/product', (request, response) => {
    const sql = `
        SELECT p.*, c.category_name 
        FROM tbl_product p
        JOIN tbl_category c ON p.category_id = c.id
    `;

    db.query(sql, (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});


app.delete('/product/:id', (request, response) => {
    const id = request.params.id;
    const sql = 'DELETE FROM tbl_product WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return response.status(500).send('Error deleting product');
        }
        response.send('Product Successfully Deleted!');
    });
});

app.get('/product/:id', (request, response) => {
    const id = request.params.id;
    console.log("id: " + id);
    const sql = "SELECT * FROM tbl_product WHERE id = ?";
    db.query(sql, [id], (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});


app.put('/edit_product/:id', upload.single('image'), (request, response) => {
    const id = request.params.id;
    const { category_id, product_name, product_price, product_quantity, product_description } = request.body;
    const image = request.file ? request.file.filename : null;

    const sql = `
        UPDATE tbl_product 
        SET 
            category_id = ?, 
            product_name = ?, 
            product_price = ?, 
            product_quantity = ?, 
            product_description = ?, 
            image = ?
        WHERE id = ?
    `;

    db.query(sql, [category_id, product_name, product_price, product_quantity, product_description, image, id], (error, result) => {
        if (error) {
            console.error('Error updating product:', error); // Log the error details
            return response.status(500).json({ error: 'Error updating product' });
        }
        response.json({ message: 'Product Successfully Updated!' });
    });
});



//login logics

// Admin Login (without bcrypt)
// Admin Login (without bcrypt)
app.post('/admin/login', (request, response) => {
    const { email, password } = request.body; // Ensure this is declared first
    const sql = `SELECT * FROM tbl_admin WHERE email = ?`;

    db.query(sql, [email], (error, data) => {
        if (error) return response.status(500).json({ error: 'Database error' });

        // Check if admin exists
        if (data.length === 0) {
            return response.status(401).json({ error: 'Invalid email or password' });
        }

        const admin = data[0];

        // Compare plain-text passwords
        if (password !== admin.password) {
            return response.status(401).json({ error: 'Invalid email or password' });
        }

        // If successful, return admin data (without password)
        const { password: _, ...adminData } = admin; // Avoid conflict with variable name
        return response.json({ message: 'Login successful', admin: adminData });
    });
});






app.post('/user/login', (request, response) => {
    const { email, password } = request.body; // Ensure this is declared first
    const sql = `SELECT * FROM tbl_user WHERE email = ?`;

    db.query(sql, [email], (error, data) => {
        if (error) return response.status(500).json({ error: 'Database error' });

        // Check if user exists
        if (data.length === 0) {
            return response.status(401).json({ error: 'Invalid email or password' });
        }

        const user = data[0];

        // Compare plain-text passwords
        if (password !== user.password) {
            return response.status(401).json({ error: 'Invalid email or password' });
        }

        // If successful, return user data (without password)
        const { password: _, ...userData } = user; // Avoid conflict with variable name
        return response.json({ message: 'Login successful', user: userData });
    });
});









app.listen(8081, () => {
    console.log("Listening on port 8081");
});