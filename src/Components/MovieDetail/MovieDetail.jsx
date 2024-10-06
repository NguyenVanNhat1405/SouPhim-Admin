import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import style from './MovieDetail.module.css'; // Import CSS

const MovieDetail = () => {
  const { movieId } = useParams(); // Lấy movieId từ URL
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/get/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.detail_container}>
      <button className={style.back_button} onClick={handleBack}>← Back</button>
      <h2 className={style.title}>{movie.title}</h2>
      <div className={style.detail}>
        <img className={style.poster} src={movie.poster} alt={movie.title} />
        <div className={style.info}>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
          <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
          <p><strong>Awards:</strong> {movie.award.join(', ')}</p>
          <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          {movie.seasons && <p><strong>Seasons:</strong> {movie.seasons}</p>}
          {movie.trailer && (
            <p>
              <strong>Trailer:</strong> <a href={movie.trailer} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
