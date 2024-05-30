// pages/admin/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user', 'admin');
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
   
      <form onSubmit={handleLogin} className='login' >
        <h2>Admin Login</h2>
       
        
          
        <div class="mb-3">
    <label for="exampleInputusername" class="form-label">username</label>
           <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='form-control'
            />
   
  </div>
  <div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Password</label>
             <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='form-control'
             />
      
   
  </div>
        <button type="submit" className='btn btn-success' >Login</button>
      </form>
  
  );
}
