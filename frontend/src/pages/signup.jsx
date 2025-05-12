import { useState } from 'react';
import axios from 'axios';
import "./login-signup.css";

function Signup() {
    const [username, setUserFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await axios.post("http://localhost:8800/api/users/register", {
                username,
                email,
                password
            });
            console.log(res.data);

            setSuccess("Account created successfully!");
            setUserFullname("");
            setEmail("");
            setPassword("");

            // After 2 seconds, redirect to login page
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);

        } catch (err) {
            console.error(err);
            const backendMessage = err.response?.data;
            if (typeof backendMessage === 'string') {
                setError(backendMessage);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Create Account</h2>
                <p className="login-subtitle">Sign up to start comparing prices!</p>
                <form className="login-form" onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUserFullname(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Sign Up</button>
                </form>
                {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
                <div className="login-footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;