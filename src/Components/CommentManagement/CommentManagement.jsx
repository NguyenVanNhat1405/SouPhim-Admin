import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import styles from './CommentManagement.module.css';

const CommentManagement = () => {
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); 

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/comments');
                setComments(response.data);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        // Lấy thông tin người dùng từ cookie
        const user = JSON.parse(Cookies.get('user') || '{}'); // Nếu cookie không tồn tại thì trả về {}
        setIsAdmin(user?.isAdmin || false);  // Kiểm tra quyền admin
        fetchComments();
    }, []);

    const filteredComments = comments.filter(comment =>
        comment.movieId.toLowerCase().includes(filter.toLowerCase())
    );

    const handleDelete = async (commentId) => {
    try {
        // Gọi API để xóa bình luận mà không cần token
        const response = await axios.delete(`http://localhost:5000/api/comments/admin/delete/${commentId}`);

        // Kiểm tra phản hồi từ API
        if (response.status === 200) {
            setComments(comments.filter(comment => comment._id !== commentId)); // Cập nhật danh sách bình luận
        } else {
            console.error('Failed to delete comment:', response.data);
        }
    } catch (error) {
        console.error('Failed to delete comment:', error);
    }
};

    
    
    

    return (
        <div className={styles.commentManagement}>
            <h2>Quản lý bình luận</h2>

            <input
                type="text"
                placeholder="Nhập ID phim để lọc..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={styles.filterInput}
            />

            {filteredComments.length > 0 ? (
                <table className={styles.commentTable}>
                    <thead>
                        <tr>
                            <th>ID Comment</th>
                            <th>Tên người dùng</th>
                            <th>Nội dung</th>
                            <th>ID Phim</th>
                            <th>Ngày bình luận</th>
                            {isAdmin && <th>Xóa</th>} {/* Chỉ hiển thị cột xóa nếu là admin */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.map((comment) => (
                            <tr key={comment._id}>
                                <td>{comment._id}</td>
                                <td>{comment.username}</td>
                                <td>{comment.content}</td>
                                <td>{comment.movieId}</td>
                                <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                                {isAdmin && ( // Chỉ hiển thị nút xóa nếu là admin
                                    <td>
                                        <button
                                            onClick={() => handleDelete(comment._id)}
                                            className={styles.deleteButton}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No comments found.</p>
            )}
        </div>
    );
};

export default CommentManagement;
