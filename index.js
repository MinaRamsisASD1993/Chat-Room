const express = require("express");
const socket = require("socket.io");
const app = express();

// Public Folder Middleware
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`App is now listening to port: ${port}`);
});

// Socket Setup
const io = socket(server);

io.on("connection", socket => {
  console.log("Web Socket Established between that browser and server");
  console.log(`Socket ID: ${socket.id}`);

  // Socket is now listenting to events from browsers connected to it
  socket.on("chat", data => {
    // Send this data to all connected browsers connected To Server .. (including typing user)
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    // Sending the typer name to all other clients (Broadcasting)
    socket.broadcast.emit("typing", data.handle);
  });
});
