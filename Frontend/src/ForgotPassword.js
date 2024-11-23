import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Import your existing styles

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');  // Redirect to login when cancel is clicked
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/forgot-reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                setError('');
                setTimeout(() => {
                    navigate('/');
                }, 5000); // Redirect to login page after 2 seconds
            } else {
                setError(data.message || 'An error occurred');
                setSuccess('');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
            setSuccess('');
        }
    };

    return (
        <div className="auth-background">
            <div className="auth-title-container">
                <h1 className="auth-title">
                    <span className="auth-icon"></span>
                    <span className="auth-gradient-text">MealKit</span>
                </h1>
                <p className="auth-slogan">Delicious meals, delivered to your door</p>
            </div>
            <div className="auth-form">
                <h2>Forgot Password</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleForgotPassword}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                        <button type="submit" className="proceed-button">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default ForgotPassword;
