import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", password: "", subscription: "free" });
    const navigate = useNavigate();

    // Load user data from localStorage and fetch from the server
    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);

            // Make sure the user object has a user_ID
            if (parsedUser.user_ID || parsedUser.id) {
                const userId = parsedUser.user_ID || parsedUser.id;
                fetchUser(userId);
            } else {
                console.error("User ID not found in localStorage.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Failed to parse user data:", error);
            navigate("/login");
        }
    } else {
        navigate("/login");
    }
}, [navigate]);

    // Fetch user data from the server
    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8800/api/users/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setUpdatedUser({
                    name: userData.user_name,
                    email: userData.user_email,
                    password: userData.user_password,
                    subscription: userData.subscription_status,
                });
            } else {
                console.error("Failed to fetch user data");
                navigate("/login");
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            navigate("/login");
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    // Save updated profile information
    const handleSave = async () => {
        try {
            if (!user || !user.user_ID) {
                console.error("User ID is missing.");
                alert("User ID is missing. Please log in again.");
                navigate("/login");
                return;
            }

            const response = await fetch(`http://localhost:8800/api/users/updated/${user.user_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    password: updatedUser.password,
                    subscription: updatedUser.subscription,
                }),
            });

            if (response.ok) {
                const updatedData = {
                    user_ID: user.user_ID,
                    user_name: updatedUser.name,
                    user_email: updatedUser.email,
                    user_password: updatedUser.password,
                    subscription_status: updatedUser.subscription,
                };

                setUser(updatedData);
                setEditing(false);
                localStorage.setItem("user", JSON.stringify(updatedData));
                alert("Profile updated successfully!");
            } else {
                const errorMessage = await response.text();
                console.error("Failed to update user:", errorMessage);
                alert("Failed to update user. Please try again.");
            }
        } catch (error) {
            console.error("Failed to update user:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    // Navigate to My Searches
    const handleMySearches = () => {
        navigate("/search_history");
    };

    return (
        <div className="profile-container">

            {user ? (
                <div className="profile-card">
                    <button onClick={() => navigate(-1)} className="back-button">◀ Back</button>
                    <img
                        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                        alt="Profile"
                        className="profile-image"
                    />
                    <h1 className="profile-title">PriceScout</h1>
                    <p className="profile-subtitle">Manage your account settings</p>

                    {editing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={updatedUser.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                name="password"
                                value={updatedUser.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                            />
                            <select name="subscription" value={updatedUser.subscription} onChange={handleInputChange}>
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                            <button onClick={handleSave} className="save-button">Save</button>
                        </>
                    ) : (
                        <>
                            <h2>{user.user_name}</h2>
                            <p>Email: {user.user_email}</p>
                            <p>Subscription: {user.subscription_status}</p>
                            <button onClick={() => setEditing(true)} className="edit-button">Edit</button>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                            <button onClick={handleMySearches} className="my-searches-button">My Searches</button>
                        </>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    
    );
}

export default Profile;
