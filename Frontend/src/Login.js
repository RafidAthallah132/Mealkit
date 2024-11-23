import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './auth.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage || '';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                if (data.role === 1) {
                    navigate('/admin-dashboard');
                } else {
                    localStorage.setItem('email', email);
                    navigate('/user-dashboard');
                }
                setError(''); // Clear error message
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
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
                <h2>Login</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <p>
    <Link to="/forgot-password">Forgot Password?</Link>
</p>


                    <button type="submit" className='proceed-button'>Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
