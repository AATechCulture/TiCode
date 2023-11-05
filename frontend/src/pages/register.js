import React, { useState } from 'react';
import '../css/register.css'; // Make sure to import the correct CSS file

const Register = ({ history }) => { // if you're using react-router-dom for navigation
    const [username, setUsername] = useState("");
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
    
        if (!username) {
            errors.username = 'Please enter a username.';
        }
        if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!password) {
            errors.password = 'Please enter a password.';
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        // Send POST request to your backend server using fetch API
        fetch('http://localhost:3001/register', { // Replace with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            // If the server responds with an error, reject the promise with the error message
            return response.json().then(json => Promise.reject(json));
        })
        .then(data => {
            console.log('Registration successful:', data);
            // Here you would handle registration success, e.g., redirect to login page
            // history.push('/login'); // Uncomment this line if you're using react-router-dom for navigation
        })
        .catch(error => {
            console.error('Registration failed:', error);
            // Here you can handle errors and update formErrors state
            setFormErrors({ general: error.message || "An error occurred during registration." });
        });
    };
    

    const handleLoginRedirect = () => {
        // history.push('/login'); // use this if you're using react-router-dom for navigation
        console.log('Redirect to login');
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header"></div>
                <form onSubmit={handleSubmit} className="register-form">
                    <h2 className="register-title">Register</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="register-input"
                    />
                    {formErrors.username && (
                        <p className="error-text">{formErrors.username}</p>
                    )}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="register-input"
                    />
                    {formErrors.email && (
                        <p className="error-text">{formErrors.email}</p>
                    )}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="register-input"
                    />
                    {formErrors.password && (
                        <p className="error-text">{formErrors.password}</p>
                    )}
                    <button type="submit" className="register-btn">
                        Register
                    </button>
                    <button type="button" onClick={handleLoginRedirect} className="register-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
