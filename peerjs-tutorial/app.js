// initialize express
const express = require('express');
const ExpressPeerServer = require('peer').ExpressPeerServer;

const app = express();

app.get('/', (req, res, next) => res.send('Hello World'));

const server = app.listen(8000);

//create express peer server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log(client + " has connected to the PeerServer");
})

peerServer.on('disconnect', (client) => {
  console.log(client + " has disconnected from the PeerServer");
})


/*

// initialize express
var express = require('express');
var app = express();

//create express peer server
var ExpressPeerServer = require('peer').ExpressPeerServer;

var options = {
  debug: true,
  path: '/peerjs-tutorial'
}


// create an http server instance to listen to request
var server = require('http').createServer(app);
var peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

// peerjs is the path that the peerjs server will be connected to
app.use('/peerjs', peerServer);

// Now listen to your port
server.listen(8000);

*/
