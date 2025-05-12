import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if not logged in
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <div className="profile-card">
                        <img
                            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                            alt="Profile"
                            className="profile-image"
                        />
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;