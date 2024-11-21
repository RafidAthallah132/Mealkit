import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', { username, email, password });
            setSuccess(response.data.message);
            setError('');
            
            // Redirect to login with success message in state
            navigate('/', { state: { successMessage: 'Account created successfully! Please log in.' } });
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred');
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
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>

            <p>Already have an account? <Link to="/">Login here</Link></p>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        </div>
        </div>
    );
};

export default Register;
