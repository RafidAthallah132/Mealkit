import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './auth.css'; // Adjust path if needed (if using a different name)


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
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const { role, message } = response.data;

            if (message === 'Login successful') {
                if (role === 1) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/user-dashboard');
                } 
                setError(''); // Clear error message
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

// aa

    return (
        <div className="auth-background">
            <div className="auth-form">
        
            <div className="login-container">
            <h2>Login</h2>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
        </div>
    );
};

        
export default Login;
