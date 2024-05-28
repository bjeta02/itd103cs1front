import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteUser({ id, onDelete }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get/${id}`);
        const userData = response.data;
        setName(userData.name);
        setUsername(userData.username);
        setPassword(userData.password);
        setEmail(userData.email);
        setAge(userData.age);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {/* Render delete form here with name, username, password, email, and age */}
    </div>
  );
}

export default DeleteUser;
