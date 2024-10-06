import React, { useState } from 'react';
import styles from './AddMovie.module.css';

const AddMovie = () => {
  const [movieId, setMovieId] = useState('');
  const [movie, setMovie] = useState(null); // Để lưu trữ dữ liệu phim sau khi lấy
  const [error, setError] = useState(''); // Để hiển thị lỗi nếu có
  const [addOption, setAddOption] = useState('new'); // Trạng thái để lưu loại phim được chọn

  const handleInputChange = (e) => {
    setMovieId(e.target.value);
  };

  const handleOptionChange = (e) => {
    setAddOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Xác định URL API dựa trên lựa chọn của người dùng
      let apiUrl = `http://localhost:5000/api/new/${movieId}`;
      if (addOption === 'popular') {
        apiUrl = `http://localhost:5000/api/popular/${movieId}`;
      } else if (addOption === 'regular') {
        apiUrl = `http://localhost:5000/api/movies/add/${movieId}`;
      }

      // Gửi yêu cầu đến backend để lấy thông tin phim
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setMovie(data); // Lưu trữ dữ liệu phim nhận được
        setError(''); // Xóa lỗi nếu có
      } else {
        setMovie(null); // Xóa dữ liệu phim trước đó nếu có lỗi
        setError('Movie not found or failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
      setMovie(null);
      setError('Failed to fetch movie data');
    }
  };

  // Hàm để xác định tiêu đề dựa trên lựa chọn
  const getTitle = () => {
    switch (addOption) {
      case 'new':
        return 'Thêm phim mới';
      case 'popular':
        return 'Thêm phim phổ biến';
      case 'regular':
        return 'Thêm phim thông thường';
      default:
        return 'Thêm phim';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addMovieForm}>
        <h1>{getTitle()}</h1>
        <form onSubmit={handleSubmit}>
          {/* Input Movie ID */}
          <input
            type="text"
            placeholder="Enter Movie ID"
            value={movieId}
            onChange={handleInputChange}
            required
          />
          
          {/* Dropdown để chọn loại phim */}
          <select value={addOption} onChange={handleOptionChange} className={styles.selectOption}>
            <option value="new">Phim mới</option>
            <option value="popular">Phim phổ biến</option>
            <option value="regular">Phim thông thường</option>
          </select>

          <button type="submit">Thêm</button>
        </form>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Hiển thị dữ liệu phim sau khi lấy */}
        {movie && (
          <div className={styles.movieDetails}>
            <h2>{movie.title}</h2>
            <p><strong>Ngày phát hành:</strong> {movie.release_date}</p>
            <p><strong>Mô tả:</strong> {movie.overview}</p>
            <p><strong>Thể loại:</strong> {movie.genres.join(', ')}</p>
            <p><strong>Quốc gia:</strong> {movie.countries.join(', ')}</p>
            <p><strong>Đạo diễn:</strong> {movie.director}</p>
            <p><strong>Thời lượng:</strong> {movie.runtime}</p>
            <p><strong>Diễn viên:</strong> {movie.actors.join(', ')}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

            {/* Link trailer nếu có */}
            {movie.trailer && (
              <p><strong>Trailer:</strong> <a href={movie.trailer} target="_blank" rel="noopener noreferrer">Watch Trailer</a></p>
            )}

            {/* Poster phim */}
            <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMovie;
