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
app.put('/edit_profile/:id', upload.single('image'), (request, response) => {
    const id = request.params.id;
    const { first_name, last_name, email, password, birthdate, gender, bio, age, address } = request.body;
    const image = request.file ? request.file.filename : null;

    // Log the incoming request details for debugging
    console.log('Update Request Details:', {
        id,
        first_name,
        last_name,
        email,
        password,
        birthdate,
        gender,
        bio,
        age,
        address,
        image
    });

    const sql = `
        UPDATE tbl_user 
        SET 
          first_name = ?, 
          last_name = ?, 
          email = ?, 
          birthdate = ?, 
          gender = ?, 
          image = ?, 
          password = ?, 
          bio = ?, 
          age = ?, 
          address = ? 
        WHERE id = ?
    `;

    db.query(sql, [first_name, last_name, email, birthdate, gender, image, password, bio, age, address, id], (error, result) => {
        if (error) {
            // Log the error details
            console.error('Error updating user:', error.code, error.sqlMessage); // Log error code and message
            return response.status(500).json({ error: 'Error updating user' });
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            console.warn(`No user found with id: ${id}`); // Log a warning if no rows were updated
            return response.status(404).json({ message: 'No user found to update' });
        }

        response.json({ message: 'User Successfully Updated!' });
    });
});


app.get('/search_users', (req, res) => {
    const query = req.query.query;
  
    const sql = `
      SELECT * FROM tbl_user
      WHERE first_name LIKE ? OR last_name LIKE ? OR CONCAT(first_name, ' ', last_name) LIKE ?
    `;
    
    const searchPattern = `%${query}%`;
  
    db.query(sql, [searchPattern, searchPattern, searchPattern], (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Error fetching users' });
      }
      res.json(results);
    });
  });
  

app.post('/register_user', upload.single('image'), async (request, response) => {
    const { first_name, last_name, email, password, birthdate, gender, bio, age , address } = request.body;
    const image = request.file ? request.file.filename : null;

    try {
        // Directly use the plain password (not recommended for production)
        const sql = "INSERT INTO tbl_user (first_name, last_name, email, birthdate, gender, image, password, bio, age, address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, 'Active')";
        db.query(sql, [first_name, last_name, email, birthdate, gender, image, password, bio,age,address], (error, result) => {
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


app.post('/add_post', upload.single('image'), (request, response) => {
    const { user_id, post_description, status } = request.body; // Ensure user_id is being destructured
    const image = request.file ? request.file.filename : null; // Get the uploaded image file name
    
    const sql = "INSERT INTO tbl_post (user_id, post_description, image, created_at,  status) VALUES (?, ?, ?, NOW(), ?)";
    db.query(sql, [user_id, post_description, image, status], (error, result) => {
        if (error) {
            console.error('Database error:', error); // Log the error for debugging
            return response.status(500).send('Error creating post');
        }
        response.send('Post Successfully Created!');
    });
});


app.get('/fetch_post', (request, response) => {
    const sql = `
        SELECT 
            tbl_post.*, 
            original_user.first_name AS creator_first_name, 
            original_user.last_name AS creator_last_name, 
            original_user.image AS creator_image,
            shared_user.first_name AS sharer_first_name,
            shared_user.last_name AS sharer_last_name,
            shared_user.image AS sharer_image,
            tbl_share.id as share_id,
            tbl_share.share_description,
            tbl_share.created_at AS share_created_at
        FROM tbl_post
        JOIN tbl_user AS original_user 
            ON tbl_post.user_id = original_user.id
        LEFT JOIN tbl_share 
            ON tbl_post.id = tbl_share.post_id
        LEFT JOIN tbl_user AS shared_user 
            ON tbl_share.user_id = shared_user.id  -- Join for the user who shared the post
    `;

    db.query(sql, (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    });
});


app.get('/fetch_post_profile', (request, response) => {
    const userId = request.query.user_id; // Get the user_id from query parameters

    const sql = `
        SELECT 
            tbl_post.*, 
            original_user.first_name AS creator_first_name, 
            original_user.last_name AS creator_last_name, 
            original_user.image AS creator_image,
            shared_user.first_name AS sharer_first_name,
            shared_user.last_name AS sharer_last_name,
            shared_user.image AS sharer_image,
            tbl_share.id as share_id,
            tbl_share.share_description,
            tbl_share.created_at AS share_created_at
        FROM tbl_post
        JOIN tbl_user AS original_user 
            ON tbl_post.user_id = original_user.id
        LEFT JOIN tbl_share 
            ON tbl_post.id = tbl_share.post_id
        LEFT JOIN tbl_user AS shared_user 
            ON tbl_share.user_id = shared_user.id  -- Join for the user who shared the post
        WHERE tbl_post.user_id = ?  -- Filter posts by the user_id
        ORDER BY tbl_post.created_at DESC;  -- Optional: Order posts by creation date
    `;

    // Execute the SQL query
    db.query(sql, [userId], (error, data) => {
        if (error) {
            console.error('Error fetching posts:', error);
            return response.status(500).json({ error: 'Failed to fetch posts' });
        }
        
        // Return the data in JSON format
        return response.json(data);
    });
});






//react post
app.post('/react', (req, res) => {
    const { userId, postId, reactionType } = req.body;

    const query = `
      INSERT INTO tbl_reaction (user_id, post_id, reaction_type)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE reaction_type = ?;`;

    db.query(query, [userId, postId, reactionType, reactionType], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Reaction updated successfully' });
    });
});

app.post('/comment', (req, res) => {
    const { userId, postId, commentDescription } = req.body;
  
    // Check if all required fields are provided
    if (!userId || !postId || !commentDescription) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = `
      INSERT INTO tbl_comment (user_id, post_id, comment_description, created_at)
      VALUES (?, ?, ?, NOW())`;
  
    db.query(query, [userId, postId, commentDescription], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Assuming result.insertId is available to get the ID of the newly inserted comment
      res.status(201).json({
        message: 'Comment added successfully',
        commentId: result.insertId // Optionally return the new comment ID
      });
    });
  });


  app.get('/fetch_comment', (req, res) => {
    const postId = req.query.post_id; // Get the post_id from the query parameters

    // SQL query to fetch comments based on post_id and join with tbl_user
    const query = `
        SELECT 
            c.*, 
            u.image AS user_image, 
            u.first_name, 
            u.last_name 
        FROM 
            tbl_comment c 
        JOIN 
            tbl_user u ON c.user_id = u.id 
        WHERE 
            c.post_id = ?`; // Filter comments by post_id

    // Execute the query
    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log error for debugging
            return res.status(500).json({ error: 'Database error' }); // Send error response
        }

        // Send results back as JSON response
        res.status(200).json(results);
    });
});


app.get('/fetch_comment_count/:postId', (req, res) => {
    const postId = req.params.postId; // Get postId from the URL parameters
    const query = `SELECT COUNT(*) AS total FROM tbl_comment WHERE post_id = ?`; // Your SQL query

    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ total: results[0].total }); // Return the count
    });
});

app.get('/fetch_share_count/:postId', (req, res) => {
    const postId = req.params.postId; // Get postId from the URL parameters
    const query = `SELECT COUNT(*) AS total FROM tbl_share WHERE post_id = ?`; // Your SQL query

    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ total: results[0].total }); // Return the count
    });
});

app.post('/insert_reply', (req, res) => {
    const { post_id, user_id, reply_description, comment_id } = req.body;

    const query = `INSERT INTO tbl_reply (post_id, user_id, comment_id, reply_description, created_at) 
                   VALUES (?, ?, ?, ?, NOW())`; // Ensure all values are included

    db.query(query, [post_id, user_id, comment_id, reply_description], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Reply added successfully' }); // Send success response
    });
});


app.post('/share_post', (req, res) => {
    const { post_id, user_id, share_description, comment_id } = req.body;

    const query = `INSERT INTO tbl_share (post_id, user_id, share_description, created_at) 
                   VALUES (?, ?, ?, NOW())`; // Ensure all values are included

    db.query(query, [post_id, user_id,share_description], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Share post successfully' }); // Send success response
    });
});


app.get('/fetch_replies', (req, res) => {
    const { comment_id } = req.query;

    // SQL query to fetch replies associated with the comment_id
    const query = `SELECT r.id, r.reply_description, r.created_at, u.first_name, u.last_name, u.image AS user_image
                   FROM tbl_reply r
                   JOIN tbl_user u ON r.user_id = u.id
                   WHERE r.comment_id = ?`;

    db.query(query, [comment_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results); // Send fetched replies as the response
    });
});









app.get('/reactions/:postId', (req, res) => {
    const postId = req.params.postId; // This should be retrieving the postId from the URL parameters
    console.log('postId:', postId); // Log to verify it's received correctly

    const query = `SELECT COUNT(*) as total FROM tbl_reaction WHERE post_id = ?;`;
    
    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Query Results:', results); // Log results for debugging
        res.status(200).json(results[0]); // Return the total count
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



//counts of users, products , orders , categories
// Backend API to count users
app.get('/no_user', (request , response) => {
    const sql = "SELECT COUNT(*) AS user_count FROM tbl_user";
    db.query(sql , (error, data) => {
        if(error) return response.json(error);
        return response.json(data[0]);  // Return the count of users
    });
});

// Backend API to count products
app.get('/no_product', (request , response) => {
    const sql = "SELECT COUNT(*) AS product_count FROM tbl_product";
    db.query(sql , (error, data) => {
        if(error) return response.json(error);
        return response.json(data[0]);  // Return the count of products
    });
});

// Backend API to count orders
app.get('/no_order', (request , response) => {
    const sql = "SELECT COUNT(*) AS order_count FROM tbl_order";
    db.query(sql , (error, data) => {
        if(error) return response.json(error);
        return response.json(data[0]);  // Return the count of orders
    });
});

// Backend API to count categories
app.get('/no_category', (request , response) => {
    const sql = "SELECT COUNT(*) AS category_count FROM tbl_category";
    db.query(sql , (error, data) => {
        if(error) return response.json(error);
        return response.json(data[0]);  // Return the count of categories
    });
});

app.get('/no_products', (request, response) => {
    const sql = `
      SELECT c.category_name, COUNT(p.id) AS count
      FROM tbl_product p
      JOIN tbl_category c ON p.category_id = c.id
      GROUP BY c.category_name;
    `;
    db.query(sql, (error, data) => {
        if (error) return response.json(error);
        return response.json(data);  // Return the counts of each product category
    });
});


//update_profile of admin
app.put('/edit_adminprofile/:id', upload.single('image'), (request, response) => {
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








app.listen(8081, () => {
    console.log("Listening on port 8081");
});