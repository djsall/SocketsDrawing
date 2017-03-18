var socket;

var brushSize = 6; //Do I really have to explain this?

var server_address = ""; //specify an ip-address or a domain name where the node server is running ( without the http:// prefix)
var server_port = ""; //specify the port you set in the server, make sure to be on lan or have port forwarding on that port in your router and/or firewall for that port to your machine

var primary_color = [255, 255, 255]; //R, G, B values of your drawing on your side
var secondary_color = [14, 146, 186]; //R, G, B values of your drawing on others side

function setup() {
  createCanvas(1280, 720);
  background(51);

  socket = io.connect("http://"+server_address+":"+server_port);
  socket.on('mouse', newDrawing);

  var reset = document.getElementById("reset"); //Get ze reset button
  reset.addEventListener('click', resetCanvas); //Bind ze event listener
}

function newDrawing(data) { //This gets triggered when the client recieves data
  noStroke();
  fill(secondary_color[0], secondary_color[1], secondary_color[2]); 
  ellipse(data.x, data.y, brushSize, brushSize);
}

function mouseDragged() { //P5's default mouse-dragged event
  var data = { //Create ze data
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data); //Send ze data

  noStroke();
  fill(primary_color[0], primary_color[1], primary_color[2]);
  ellipse(mouseX, mouseY, brushSize, brushSize); //Draw your mouse movement (while button 1 is held down)
}

function draw() {
}

function resetCanvas() { //Do I really have to explain this?
  background(51);
}
