let onlineUsers = [];

export const newConnectionHandler = (newClient) => {
  console.log("New Connection:", newClient.id);

  newClient.emit("welcome", { message: `Hello ${newClient.id}` });

  newClient.on("setUsername", (payload) => {
    console.log(payload);

    onlineUsers.push({ username: payload.username, socketId: newClient.id });

    newClient.emit("loggedIn", onlineUsers);

    newClient.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });

  newClient.on("sendMessage", (message) => {
    console.log("New message:", message);
    newClient.broadcast.emit("newMessage", message);
  });


  newClient.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== newClient.id);
    newClient.broadcast.emit("updatedOnlineUsersList", onlineUsers);
  });
};
