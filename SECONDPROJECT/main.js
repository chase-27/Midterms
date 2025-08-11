//const express = reqiure('express');
import express from 'express'; //Same thing
const __dirname = import.meta.dirname;

const app = express();

//home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});
//student form
app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
});
//admin form
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
});
//profile form
app.get('/profileForm', (req, res) => {
    res.sendFile(__dirname + '/pages/profile.html');
});


//API Student
app.get('/getStudent', (req, res) => {
    var response = {
        studentId: req.query.studentId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section
    }

    console.log("Response is: ", response);
    res.end(`Recieved Data: ${JSON.stringify(response)}`);
});

//API Admin
app.get('/getAdmin', (req, res) => {
    var response = {
        adminId: req.query.adminId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department
    }

    console.log("Response is: ", response);
    res.end(`Recieved Data: ${JSON.stringify(response)}`);
});

//API Profile
app.get('/getProfile', (req, res) => {
    var response = {
        profileID: req.query.profileID,
        name: req.query.name,
        dateofbirth: req.query.dateofbirth,
    }

    console.log("Response is: ", response);
    res.end(`Recieved Data: ${JSON.stringify(response)}`);
});

const server = app.listen(5000, () =>{
    const host = server.address().address;
    const port = server.address().port;
    // console.log ("Server running at http://%s:%s", host, port);
    // console.log ("Server running at http://"+" host"+" port");
    console.log (`Server running at http://${host}:${port}`);
})