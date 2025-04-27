import { useState } from 'react';
import axios from 'axios';
import "./login-signup.css"; // Assuming you have a CSS file for styling

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:8800/api/users/login", { email, password });
            console.log(res.data);

            alert("Login successful!");

            // Save user info in localStorage (optional)
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Redirect to home page or dashboard (optional)
            // window.location.href = "/";

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
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to your account</p>
                <form className="login-form" onSubmit={handleLogin}>
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
                    <button type="submit" className="login-button">Login</button>
                </form>
                {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                <div className="login-footer">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;