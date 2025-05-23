import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER (signup)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json("Please fill in all fields.");
        }

        // Check if the user already exists
        const checkQuery = "SELECT * FROM user WHERE user_email = ?";
        db.query(checkQuery, [email], async (err, data) => {
            if (err) return res.status(500).json("Database error.");
            if (data.length > 0) return res.status(400).json("User already exists!");

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create the new user with a default 'free' subscription
            const insertQuery = `
                INSERT INTO user (user_name, user_email, user_password, subscription_status)
                VALUES (?, ?, ?, 'free')
            `;
            db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                
                if (err) {
                    console.error("Detailed error:", err.message);
                    return res.status(500).json("Error creating user.");
                }

                res.status(201).json("User has been created successfully!");
            });
        });
    } catch (error) {
        console.error(error);
        res.status(501).json("Server error.");
    }
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const q = "SELECT * FROM user WHERE user_email = ?";
    db.query(q, [email], async (err, data) => {
        if (err) return res.status(500).json("Database error.");
        if (data.length === 0) return res.status(404).json("User not found!");

        const user = data[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.user_password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong password!");
        }

        // Generate JWT Token
        const token = jwt.sign(
            { 
                userId: user.user_ID, 
                userName: user.user_name, 
                userEmail: user.user_email,
                subscriptionStatus: user.subscription_status  // Include subscription status
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send the full user data, including subscription status
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user.user_ID,
                name: user.user_name,
                email: user.user_email,
                subscription_status: user.subscription_status
            },
        });
    });
});

// Get User Details
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const q = "SELECT * FROM user WHERE user_ID = ?";
        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json("Database error.");
            if (data.length === 0) return res.status(404).json("User not found!");
            res.json(data[0]);
        });
    } catch (error) {
        console.error("Failed to fetch user:", error.message);
        res.status(500).json("Failed to fetch user");
    }
});

// Update User Details
router.put("/updated/:userId", async (req, res) => {
    const { userId } = req.params;
    const { name, email, password, subscription } = req.body;

     try {
        // Hash the password if it was updated
        let hashedPassword = password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const q = `
            UPDATE user 
            SET user_name = ?, user_email = ?, user_password = ?, subscription_status = ? 
            WHERE user_ID = ?
        `;

        db.query(q, [name, email, hashedPassword, subscription, userId], (err, result) => {
            if (err) {
                console.error("Failed to update user:", err.message);
                return res.status(500).json("Failed to update user.");
            }

            if (result.affectedRows === 0) return res.status(404).json("User not found!");

            res.json("User updated successfully!");
        });
    } catch (error) {
        console.error("Failed to hash password:", error.message);
        res.status(500).json("Failed to update user.");
    }
});



export default router;
