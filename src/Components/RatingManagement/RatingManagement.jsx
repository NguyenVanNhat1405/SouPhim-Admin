import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RatingManagement.module.css';

const RatingManagement = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Fetch ratings từ API
    const fetchRatings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/ratings');
        setRatings(response.data);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  // Hàm để xóa rating
  const handleDelete = async (ratingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/ratings/admin/delete/${ratingId}`); 
      setRatings(ratings.filter(rating => rating._id !== ratingId)); // Cập nhật danh sách rating sau khi xóa
    } catch (error) {
      console.error('Failed to delete rating:', error);
    } 
};

  return (
    <div className={styles.ratingManagement}>
      <h2>Quản lý xếp hạng</h2>
      {ratings.length > 0 ? (
        <table className={styles.ratingTable}>
          <thead>
            <tr>
                <th>ID Rating</th>
              <th>User</th>
              <th>Movie</th>
              <th>Rating</th>
              <th>Ngày tạo</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <React.Fragment key={rating._id}>
                <tr >
                <td>{rating._id}</td>
                <td>{rating.username}</td>
                <td>{rating.name}</td>
                <td>{rating.rating} / 10</td>
                <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(rating._id)} className={styles.deleteButton}>
                    Xóa
                  </button>
                </td>
              </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No ratings found.</p>
      )}
    </div>
  );
};

export default RatingManagement;
