const fs = require('fs');
let activeSockets = [];
let express = require('express');
const https = require('https');
const portNumber =5000;
let app = express(); //make an insatnce of express
//let httpServer = require('http').createServer(app);  // create a server (using the Express framework object)


let key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
let cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
let options = {
   key: key,
   cert: cert
 };

let httpsServer  =  https.createServer(options, app);

// make server listen for incoming messages
httpsServer.listen(portNumber, function(){
  console.log('listening on port:: '+portNumber);
});

// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// serve anything from this dir ...
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/client_cam.html');
});


// declare io which mounts to our httpServer object (runs ontop ... )
let io = require('socket.io')(httpsServer);
// for the client...
app.use(express.static(__dirname + '/node_modules'));

// Listen for incoming connections from clients

io.on('connection', function (socket) {

  const existingSocket = activeSockets.find(
    existingSocket => existingSocket === socket.id
  );

  if (!existingSocket) {
    activeSockets.push(socket.id);

    socket.emit("update-user-list", {
      users: activeSockets.filter(
        existingSocket => existingSocket !== socket.id
      )
    });

    socket.broadcast.emit("update-user-list", {
      users: [socket.id]
    });
  }

  socket.on("call-user", data => {
    socket.to(data.to).emit("call-made", {
      offer: data.offer,
      socket: socket.id
    });
  });

  socket.on("make-answer", data => {
    socket.to(data.to).emit("answer-made", {
      socket: socket.id,
      answer: data.answer
    });
  });

  socket.on("reject-call", data => {
    socket.to(data.from).emit("call-rejected", {
      socket: socket.id
    });
  });

  socket.on("disconnect", () => {
    this.activeSockets = this.activeSockets.filter(
      existingSocket => existingSocket !== socket.id
    );
    socket.broadcast.emit("remove-user", {
      socketId: socket.id
    });
  });

});
