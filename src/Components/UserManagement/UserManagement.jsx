import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []);

  // Function to delete user
  const handleDelete = async (userId) => {
    try {
      // Optimistically update the state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      
      await axios.delete(`http://localhost:5000/api/auth/delete/${userId}`);
    } catch (error) {
      console.error('Failed to delete user:', error);
      // Optionally, you could refetch users or show an error message here
    }
  };

  if (loading) {
    return <p>Loading users...</p>; // Show loading state
  }

  return (
    <div className={styles.userManagement}>
      <h2>Quản lý người dùng</h2>
      {users.length > 0 ? (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(user._id)} // Changed user.id to user._id
                    className={styles.deleteButton}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;
