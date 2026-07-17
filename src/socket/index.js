module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);

    require("./chat.socket")(io, socket);

    require("./notification.socket")(io, socket);

    require("./online.socket")(io, socket);
  });
};
