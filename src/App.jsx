import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Pages/Admin/Admin';
import UserManagement from './Components/UserManagement/UserManagement';
import CommentManagement from './Components/CommentManagement/CommentManagement';
import MovieManagement from './Components/MovieManagement/MovieManagement';
import RatingManagement from './Components/RatingManagement/RatingManagement';
import AddMovie from './Components/AddMovie/AddMovie';
import MovieDetail from './Components/MovieDetail/MovieDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Định tuyến trang admin */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="comments" element={<CommentManagement />} />
          <Route path="movies" element={<MovieManagement />} />
          <Route path="ratings" element={<RatingManagement />} />
          <Route path="add" element={<AddMovie />} />
          <Route path="movies/:movieId" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
