import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Home() {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io('https://online.adsdep.com/');

        socket.on('connect', () => {
            console.log('connected to WebSocket server');
        });

        socket.on('update', (users) => {
            console.log('Online users:', users);
            setOnlineUsers(users);
        });

        socket.on('disconnect', () => {
            console.log('disconnected from WebSocket server');
        });

        // ใช้ setInterval เพื่ออัปเดตข้อมูลทุกวินาที
        const intervalId = setInterval(() => {
            socket.emit('requestUpdate');
        }, 1000); // 1000 มิลลิวินาที (1 วินาที)

        return () => {
            clearInterval(intervalId);
            socket.disconnect();
        };
    }, []);

    return (
        <div>
           
            <h1> online {onlineUsers.length}</h1>
            <ul>
                {onlineUsers.map((ip, index) => (
                    <li key={index}>{ip}</li>
                ))}
            </ul>
        </div>
    );
}
