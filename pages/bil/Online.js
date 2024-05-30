import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Online() {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io('https://online.adsdep.com/');

        socket.on('connect', () => {
            console.log('connected to WebSocket server (Admin)');
        });

        socket.on('update', (users) => {
            console.log('Online users:', users);
            setOnlineUsers(users);
        });

        socket.on('disconnect', () => {
            console.log('disconnected from WebSocket server (Admin)');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
           
            <p>{onlineUsers.length}</p>
            <ul>
                {onlineUsers.map((ip, index) => (
                    <li key={index}>{ip}</li>
                ))}
            </ul>
        </div>
    );
}

