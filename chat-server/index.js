const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", function(client) {
  // JOINED
  client.on("JOINED", message => {
    console.log("-- JOINED");
    let room = message["room"];
    console.log(room, message);
    client.join(room);
  });

  // LEFT
  client.on("LEFT", message => {
    console.log("-- LEFT");
    let room = message["room"];
    console.log(room, message);
    client.leave(room);
  });

  // SEND_MESSAGE
  client.on("SEND_MESSAGE", message => {
    console.log("-- SEND_MSG");

    let room = message["conversacion"];
    console.log(room, message);

    let new_msg = {
      id: message["id"],
      usuario: message["user"],
      texto: message["texto"],
      conversacion: message["conversacion"],
      fecha: message["fecha"]
    };

    io.to(room).emit("MESSAGE", new_msg);
  });

  // DISCONNECT
  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

server.listen(3000, function(err) {
  if (err) throw err;
  console.log("listening on port 3000");
});
