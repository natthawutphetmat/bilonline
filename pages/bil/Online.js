
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Online = () => {
  const onlineUsersRef = useRef(0);
  const userIPsRef = useRef({});

  useEffect(() => {
    const socket = io('https://online.servicesadss.com/');

    socket.on('updateUserCount', ({ onlineUsers, userIPs }) => {
      onlineUsersRef.current = onlineUsers;
      userIPsRef.current = userIPs;

      // Force re-render
      forceUpdate();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const forceUpdate = useForceUpdate();

  const uniqueIPs = Array.from(new Set(Object.values(userIPsRef.current)));

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
      <h3> {uniqueIPs.length}</h3>
      <ul>
        {uniqueIPs.map((ip, index) => (
          <li key={index}>{ip}</li>
        ))}
      </ul>
    </div>
  );
};

const useForceUpdate = () => {
  const [, setTick] = useState(0);
  return () => setTick(tick => tick + 1);
};

export default Online;

