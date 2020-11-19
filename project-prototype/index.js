// initialize express
const express = require('express');
const ExpressPeerServer = require('peer').ExpressPeerServer;

const app = express();


// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// serve anything from this dir ...
app.use(express.static('public'));


//app.get('/', (req, res, next) => res.send('Hello World'));

const server = app.listen(8000);

//create express peer server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

app.use('/peerjs', peerServer);
