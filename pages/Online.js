import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AdminPage = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [userIPs, setUserIPs] = useState({});

  useEffect(() => {
    const socket = io();

    console.log('Socket connected:', socket.id);

    socket.emit('joinHome');
    console.log('joinHome event emitted');

    socket.on('updateUserCount', ({ onlineUsers, userIPs }) => {
      console.log('updateUserCount event received:', onlineUsers, userIPs);
      setOnlineUsers(onlineUsers);
      setUserIPs(userIPs);
    });

    return () => {
      socket.emit('leaveHome');
      console.log('leaveHome event emitted');
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Online: {onlineUsers}</h2>
      <ul>
        {Object.keys(userIPs).map((key) => (
          <li key={key}>IP: {userIPs[key]}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
