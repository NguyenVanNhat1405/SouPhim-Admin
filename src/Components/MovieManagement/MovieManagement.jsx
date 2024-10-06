import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './MovieManagement.module.css';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/movies/');
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/delete/${movieId}`);
      setMovies(movies.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    // Điều hướng tới trang chi tiết phim
    navigate(`/admin/movies/${movieId}`);
  };

  const sortMovies = (movies) => {
    return movies.sort((a, b) => {
      if (sortOrder === 'a-z') {
        return a.title.localeCompare(b.title); // Sắp xếp theo tên A-Z
      } else if (sortOrder === 'z-a') {
        return b.title.localeCompare(a.title); // Sắp xếp theo tên Z-A
      } else if (sortOrder === 'id') {
        // Chuyển đổi Movie ID sang số để sắp xếp đúng thứ tự
        const idA = parseInt(a.id.replace('tt', ''), 10);
        const idB = parseInt(b.id.replace('tt', ''), 10);
        return idA - idB; // Sắp xếp tăng dần theo Movie ID
      }
      return movies;
    });
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    movie.id.toLowerCase().includes(searchTerm.toLowerCase())
);


  const sortedMovies = sortMovies(filteredMovies);

  return (
    <div className={styles.movieManagement}>
      <h2>Quản lý phim</h2>
      
      {/* Input tìm kiếm */}
      <input 
        type="text" 
        placeholder="Tìm kiếm theo tên phim hoặc Movie ID..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className={styles.searchInput} 
      />

      {/* Nút chọn sắp xếp */}
      <div className={styles.sortButtons}>
        <button onClick={() => setSortOrder('a-z')} className={styles.sortButton}>Sắp xếp A-Z</button>
        <button onClick={() => setSortOrder('z-a')} className={styles.sortButton}>Sắp xếp Z-A</button>
        <button onClick={() => setSortOrder('id')} className={styles.sortButton}>Sắp xếp theo ID</button>
      </div>

      {sortedMovies.length > 0 ? (
        <table className={styles.movieTable}>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên phim</th>
              <th>Movie ID</th>
              <th>Thể loại</th>
              <th>Quốc gia</th>
              <th>Diễn viên</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {sortedMovies.map((movie) => (
              <React.Fragment key={movie._id}>
                <tr>
                  <td>
                    {/* Click vào hình ảnh để điều hướng */}
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className={styles.moviePoster} 
                      onClick={() => handleMovieClick(movie.id)} // Điều hướng khi click vào hình ảnh
                      style={{ cursor: 'pointer' }} 
                    />
                  </td>
                  <td>
                    {/* Click vào tên phim để điều hướng */}
                    <span 
                      onClick={() => handleMovieClick(movie.id)} // Điều hướng khi click vào tên phim
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                      {movie.title}
                    </span>
                  </td>
                  <td>{movie.id}</td>
                  <td>{movie.genres.join(', ')}</td>
                  <td>{movie.countries.join(', ')}</td>
                  <td>{movie.actors.join(', ')}</td>
                  <td>
                    <button onClick={() => handleDelete(movie.id)} className={styles.deleteButton}>
                      Xóa
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieManagement;
