// Make Connection
const socket = io.connect("http://localhost:4000");

// DOM Variables
const handle = document.getElementById("handle");
const message = document.getElementById("message");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const sendBtn = document.getElementById("send");

sendBtn.addEventListener("click", () => {
  // emit ('eventName', object of actual Data to the socket)
  if (handle.value !== "" && message.value !== "") {
    socket.emit("chat", {
      handle: handle.value,
      message: message.value
    });
    handle.value = "";
    message.value = "";
  }
});

socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

// Event Listener onChange For message variable
message.addEventListener("keypress", () => {
  socket.emit("typing", {
    handle: handle.value
  });
});

socket.on("typing", handle => {
  feedback.innerHTML = `<p><strong>${handle} </strong>is now typing...</p>`;
});
