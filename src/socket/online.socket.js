const { getListFiendOnline } = require("../controllers/socket.controller");

const onlineUsers = new Map();

module.exports = (io, socket) => {
  socket.on("login", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("get-friend-online", async (user_id) => {
    let listFriend = await getListFiendOnline(user_id);

    socket.emit("list_friend_online", [...listFriend]);
  });

  socket.on("disconnect", (reason) => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
};
