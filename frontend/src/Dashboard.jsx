import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [message, setMessage] = useState('');

  const getProtectedMessage = async (role) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:3000/api/protected/${role}`, {
      headers: { Authorization: token },
    });
    setMessage(res.data.message);
  };

  return (
    <div>
      <button onClick={() => getProtectedMessage('teacher')}>Teacher Area</button>
      <button onClick={() => getProtectedMessage('student')}>Student Area</button>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
