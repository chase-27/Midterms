import express from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// File Path Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads + pages)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage }).fields([{ name: 'file', maxCount: 1 }]);

// File upload handler
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send('Error uploading file');

    const username = req.body.username;
    const uploadedFile = req.files?.['file']?.[0];

    if (!uploadedFile) {
      return res.status(400).send('No file uploaded');
    }

    console.log(`Username: ${username}`);
    console.log(`File path: ${uploadedFile.path}`);

    res.end('File and form data uploaded successfully!');
  });
});

// POST form page
app.get('/postForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'postform.html'));
});
// Upload form
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});
// Other Form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/studentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'student.html'));
});

app.get('/adminForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

app.get('/profileForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'profile.html'));
});

// Get methods
app.get('/getStudent', (req, res) => {
  const response = {
    studentId: req.query.studentId,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    section: req.query.section
  };
  console.log("Response is:", response);
  res.end(`Received Data: ${JSON.stringify(response)}`);
});

app.get('/getAdmin', (req, res) => {
  const response = {
    adminId: req.query.adminId,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    department: req.query.department
  };
  console.log("Response is:", response);
  res.end(`Received Data: ${JSON.stringify(response)}`);
});

app.get('/getProfile', (req, res) => {
  const response = {
    profileID: req.query.profileID,
    name: req.query.name,
    dateofbirth: req.query.dateofbirth
  };
  console.log("Response is:", response);
  res.end(`Received Data: ${JSON.stringify(response)}`);
});

// Handle POST form submission
app.post('/submitPostForm', (req, res) => {
  const response = {
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    hobbies: req.body.hobbies, 
    country: req.body.country
  };
  console.log("POST Form Response:", response);
  res.end(`Form submitted successfully! Data: ${JSON.stringify(response)}`);
});

// Start server
const server = app.listen(5001, () => {
  console.log(`Server running at http://localhost:5001`);
});
