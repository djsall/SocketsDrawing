var port = 81; //the port specified here needs to match with the port in sketch.js 

var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(port);

app.use(express.static("public"));

console.log("Starting socket Node server...");
console.log("Using port: " + port);

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("New client connected: " + socket.id);

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
  }


}