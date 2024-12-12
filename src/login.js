import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed with `npm install axios`
import './App.css';
import { FaUser, FaLock } from "react-icons/fa";
import API_URL from './apiconfig';

// Function to get the token from localStorage or use a default value
const getAuthToken = () => {
    return localStorage.getItem('authToken') || ''; // Default empty string if no token is found
};

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email: email,
                password: password
            });

            // Assuming the backend returns a token upon successful login
            if (response.data.token) {
                // Store token in localStorage
                localStorage.setItem('authToken', response.data.token);

                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            // Handle errors such as invalid credentials
            if (err.response && err.response.status === 422) {
                setError('The provided credentials are incorrect.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='login-page'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    {error && <p className="error-message">{error}</p>}

                    <div className="input-box">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forget">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forget password?</a>
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
