import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Admin.module.css';
import rating from '../../assets/rating.png';
import movie from '../../assets/movie.png';
import comment from '../../assets/comment.png';
import user from '../../assets/user.png';
import add from '../../assets/add.png';
const AdminDashboard = () => {
    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <h1>Admin Dashboard</h1>
                <NavLink to="/admin/users" style={{ textDecoration: "none" }}>
                    <div className={styles.item}>
                        <img src={user} alt="user icon" />
                        <p>Quản lý người dùng</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/comments" style={{ textDecoration: "none" }}>
                    <div className={styles.item}>
                        <img src={comment} alt="comment icon" />
                        <p>Quản lý bình luận</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/movies" style={{ textDecoration: "none" }}>
                    <div className={styles.item}>
                        <img src={movie} alt="movie icon" />
                        <p>Quản lý phim</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/ratings" style={{ textDecoration: "none" }}>
                    <div className={styles.item}>
                        <img src={rating} alt="rating icon" />
                        <p>Quản lý xếp hạng</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/add" style={{ textDecoration: "none" }}>
                    <div className={styles.item}>
                        <img src={add} alt="movie icon" />
                        <p>Thêm phim</p>
                    </div>
                </NavLink>
            </div>

            {/* Nội dung trang */}
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
