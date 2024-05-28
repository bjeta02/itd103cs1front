import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteUser from './DeleteUser';

function Users() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
      .then(() => {
        console.log('User deleted successfully');
        // Refresh data after deletion
        axios.get('http://localhost:3001/')
          .then(response => {
            console.log(response);
            setData(response.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  // Filter users based on search query
  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="vh-100" style={{ backgroundColor: '#cbce91', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="w-50 bg-white rounded p-3" style={{ maxHeight: '80vh', overflowY: 'scroll', borderRadius: '15px' }}>
        <div className="d-flex mb-3">
          <input type="text" className="form-control me-2" placeholder="Search..." style={{ width: '50%' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Link to="/create" className="btn btn-success btn-lg" style={{ backgroundColor: '#5a580a', color: '#fff', fontWeight: 'bold', marginLeft: 'auto', padding: '10px 20px', fontSize: '18px', borderRadius: '10px' }}>
            Add User
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-sm" style={{ backgroundColor: '#5a580a', color: '#fff', marginRight: '5px' }}>Update</Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm" style={{ backgroundColor: '#5a580a', color: '#fff' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
