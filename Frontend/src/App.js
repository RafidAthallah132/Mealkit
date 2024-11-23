import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './register';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Home from './Home';
import ForgotPassword from './ForgotPassword';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
