import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// File Path Stuff
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);

// Serve the upload form
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});



// Handle file upload post request
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send('Error uploading file');

    const username = req.body.username;
    const uploadedFile = req.files['file'][0];

    console.log(`Username: ${username}`);
    console.log(`File path: ${uploadedFile.path}`);

    res.end('File and form data uploaded successfully!');
  });
});

// Your existing routes below
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/home.html');
});

app.get('/studentForm', (req, res) => {
  res.sendFile(__dirname + '/pages/student.html');
});

app.get('/adminForm', (req, res) => {
  res.sendFile(__dirname + '/pages/admin.html');
});

app.get('/profileForm', (req, res) => {
  res.sendFile(__dirname + '/pages/profile.html');
});

app.get('/getStudent', (req, res) => {
  var response = {
    studentId: req.query.studentId,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    section: req.query.section
  };

  console.log("Response is: ", response);
  res.end(`Recieved Data: ${JSON.stringify(response)}`);
});

app.get('/getAdmin', (req, res) => {
  var response = {
    adminId: req.query.adminId,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    department: req.query.department
  };

  console.log("Response is: ", response);
  res.end(`Recieved Data: ${JSON.stringify(response)}`);
});

app.get('/getProfile', (req, res) => {
  var response = {
    profileID: req.query.profileID,
    name: req.query.name,
    dateofbirth: req.query.dateofbirth,
  };

  console.log("Response is: ", response);
  res.end(`Recieved Data: ${JSON.stringify(response)}`);
});

const server = app.listen(5001, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
