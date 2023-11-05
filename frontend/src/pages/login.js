import React, { useState } from 'react';
import '../css/login.css'; // Import the CSS file here

// You may need to adjust the path of the image
import backgroundImg from '../images/kiosk.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors({});
        let errors = {};
        
        if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email address.';
        }
        
        if (!password) {
            errors.password = 'Please enter your password.';
        }
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        // Send POST request to your backend server using fetch API
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                return response.json();
            }
            // If the server responds with a 4xx or 5xx error, throw an error
            return response.json().then(json => Promise.reject(json));
        })
        .then(data => {
            console.log('Login successful:', data);
            // Here you would handle login success, like storing the token
            localStorage.setItem('token', data.token);
        })
        .catch(error => {
            console.error('Login failed:', error);
            // Handle errors like invalid credentials
            setFormErrors({ general: "Invalid credentials" });
        });
    };
    

    const handleRegister = () => {
        console.log('Redirect to registration form');
    };

    return (
        <div className="login-container" style={{ backgroundImage: `../images/kiosk.png` }}>
            <div className="login-box">
                <div className="login-header"></div>
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-title">Login</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="login-input"
                    />
                    {formErrors.email && (
                        <p className="error-text">{formErrors.email}</p>
                    )}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                    />
                    {formErrors.password && (
                        <p className="error-text">{formErrors.password}</p>
                    )}
                    <button type="submit" className="login-btn">
                        Log In
                    </button>
                    <button type="button" onClick={handleRegister} className="login-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
