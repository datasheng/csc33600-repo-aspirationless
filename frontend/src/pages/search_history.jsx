
import "./search-history.css"; // Assuming you have a CSS file for styling
import ReactDOM from "react-dom/client";
import { useState } from 'react';
import axios from 'axios';

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
        <div className="main-container">
            <div className="searchhistory-card">
                <div className="H-searchtop">
                    <h2 className="history-title">Items History</h2>
                    <div className="searchbar-and-button">

                        <div className="H-searchbar"> 
                            <form className="history-searchbox" onSubmit={handleLogin}>
                                <input
                                    type="email"
                                    placeholder="enter item name"
                                    className="item-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </form>
                        </div>
                        
                        <div className="H-searchbutton">
                            <button type="submit" className="searchhistory-button">search</button>
                        </div>
                        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                    </div>
                </div>

                <div className="H-searchbody">
                    <div className="H-filterbody">

                    </div>
                    <div className="H-itemlog">

                    </div>
                </div>


                <div className="history-footer">
                    no history with this item <a href="/signup">Sign Up</a> 
                </div>
            </div>
        </div>
    );
}

export default Login;