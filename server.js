const express = require('express');
const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  let onlineUsers = 0;
  let userIPs = {};

  io.on('connection', (socket) => {
    const userIP = socket.handshake.address;
    userIPs[socket.id] = userIP;

    socket.on('joinHome', () => {
      if (!socket.joinedHome) {
        socket.joinedHome = true;
        onlineUsers++;
        io.emit('updateUserCount', { onlineUsers, userIPs });
        console.log(`Connected: ${socket.id}, IP: ${userIP}, Online Users: ${onlineUsers}`);
      }
    });

    socket.on('leaveHome', () => {
      if (socket.joinedHome) {
        socket.joinedHome = false;
        onlineUsers--;
        io.emit('updateUserCount', { onlineUsers, userIPs });
        console.log(`Disconnected: ${socket.id}, Online Users: ${onlineUsers}`);
      }
    });

    socket.on('disconnect', () => {
      if (socket.joinedHome) {
        onlineUsers--;
        delete userIPs[socket.id];
        io.emit('updateUserCount', { onlineUsers, userIPs });
        console.log(`Disconnected: ${socket.id}, Online Users: ${onlineUsers}`);
      }
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
