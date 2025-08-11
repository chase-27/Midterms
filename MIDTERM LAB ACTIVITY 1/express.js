//const express = reqiure('express');
import express from 'express'; //Same thing
const __dirname = import.meta.dirname;

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});

app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
});

app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
});

app.get('/user', (req, res) => {
    const userId = req.query.id;
    const userName = req.query.name;
    if ( userId && userName) {
        res.send(`<html><body><h1>User ${userName}'s Id is: ${userId}</h1></body></html>`)
    } else res.status(400).send('User ID is required');
});

app.get('/getUser', (req, res) => {
    var response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
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